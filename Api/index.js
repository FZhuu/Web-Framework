import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import session from 'express-session'
import {Usuario,Estabelecimento,FotosEstabelecimento,Oferta,Servico,Avaliacao} from './DB/tabelaDB.js';
import sequelize from './DB/declararDB.js';
import bcrypt from 'bcrypt';
import multer from 'multer';

const app = express();
const PORT = 8080;
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024},
    fileFilter: (req,file,cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Apenas imagens são permitidas.'), false);
        }
        cb(null,true);
    }
})

const generateToken = (id,email) => {
    return jwt.sign({ id: id , email: email, permissoes: ['USUARIOS,ESTABELECIMENTOS']}, 'localtop', { expiresIn: '1h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, 'localtop');
}

const sessionMaxAge = 99 * 60 * 1000;

app.use(session({
    secret: 'localtop',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: sessionMaxAge,
        httpOnly: true,
        secure: false,
    }
}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;  // pega do header correto
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decoded = verifyToken(token);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
}

app.get('/api/listarUsuarios',authenticate, async (req,res) => {
    const usuarios = await Usuario.findAll();
    usuarios ? res.json(usuarios) : res.status(400).json({mensagem: 'nenhum usuário encontrado'}).end();
})
app.get('/api/usuario/:id',authenticate, async (req,res) => {
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario)  res.json(usuario);
    else {res.status(404).json('Usuário inexistente')}
})
app.post('/api/login', async (req,res) => {
        const {Email,Senha} = req.body;
        if (!Email || !Senha) {
            return res.status(400).json({mensagem: 'email e senha são obrigatórios'}).end();
        }
        try {

            const usuario = await Usuario.findOne({where: {Email: Email}});
            if (!usuario) {
                return res.status(401).json({mensagem: 'Email ou senha incorreto.'}).end();
            }
            const senhaCorreta = await bcrypt.compare(Senha, usuario.Senha);
            if (!senhaCorreta) {
                return res.status(401).json({mensagem: 'Email ou senha incorreto.'}).end();
            }
            const token = await generateToken(usuario.ID_usuario,usuario.Email);
            res.json({token: token,IdUsuario: usuario.ID_usuario,Email: usuario.Email,ADM:usuario.ADM});
        } catch (error) {
            console.log(error);
            res.status(400).json({mensagem: `Erro ao fazer login: ${error}`}).end();
        }
    })
app.post('/api/signup',async (req,res) => {
        const {Nome, Email, CPF, Senha, DataNascimento} = req.body;
        const usuario_email = await Usuario.findOne({where: {Email: Email}});
        const usuario_cpf = await Usuario.findOne({where: {CPF: CPF}});

        usuario_email ? res.status(400).json({mensagem: 'email já cadastrado'}).end() : null;
        usuario_cpf ? res.status(400).json({mensagem: 'CPF já cadastrado'}).end() : null;

        try {
            const hashedSenha = await bcrypt.hash(Senha, 10);
            await Usuario.create({
                Nome: Nome,
                Email: Email,
                CPF: CPF,
                ADM:false,
                Senha: hashedSenha,
                DataNasc: DataNascimento
            })

            res.status(200).json({mensagem: 'Usuário cadastrado com sucesso!'}).end();
        } catch (error) {
            console.log(error);
            res.status(500).json({mensagem: `Erro ao cadastrar usuário: ${error}`}).end();
        }
    })
app.put('/api/usuario/:id',authenticate,upload.single('file'), async (req,res) => {
        const { id } = req.params;
        const { nome,ADM, dataNascimento, email, cpf, senha } = req.body;
        console.log(req.body)
        const usuario = await Usuario.findByPk(id);

        if (usuario.Email !== email) {
            const usuario_email = await Usuario.findOne({ where: { email: email } });
            if (usuario_email) {
                return res.status(400).json({mensagem:"Email ja cadastrado."});
            }
        }
        if ( usuario.CPF !== cpf) {
            const usuario_cpf = await Usuario.findOne({ where: { cpf: cpf } });
            if (usuario_cpf) {
                return res.status(400).json({mensagem:"CPF ja cadastrado."});
            }
        }
        return usuario ? res.json(await usuario.update({
            Nome: nome !== usuario.Nome ? nome : usuario.Nome,
            ADM: ADM,
            CPF: cpf !== usuario.CPF ? cpf : usuario.CPF,
            DataNasc: dataNascimento !== usuario.DataNasc ? dataNascimento : usuario.DataNasc,
            Senha: senha ? await bcrypt.hash(senha, 10) : usuario.Senha,
            Email: email !== usuario.Email ? email : usuario.Email,
            Foto: req.file ? req.file.buffer : usuario.Foto,
            TipoFoto:req.file ? req.file.mimetype : usuario.TipoFoto
        })) : res.status(404).end()
    })
app.get('/api/usuario/foto/:id',authenticate, async (req, res) => {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario não encontrada');
        }
        if (!usuario.Foto) {
            return res.status(204).send(null);
        }
        res.set('Content-Type', usuario.TipoFoto || 'image/png');
        res.send(usuario.Foto); // envia o blob diretamente
    })
app.put('/api/usuario/novasenha/:id', async (req,res) => {
        const { id } = req.params;
        const { SenhaAtual, SenhaNova} = req.body;
        const usuario = await Usuario.findByPk(id);
        const senhaCorreta = await bcrypt.compare(SenhaAtual, usuario.Senha);
        const senhaNovaCorreta = await bcrypt.compare(SenhaNova, usuario.Senha);
        if (!senhaCorreta) {
            return res.status(401).json({mensagem: 'Senha atual incorreta.'}).end();
        }
        if (senhaNovaCorreta) {
            return res.status(401).json({ mensagem: "Nova senha não pode ser igual a senha atual." });
        }
        return usuario ? res.json(await usuario.update({Senha: await bcrypt.hash(SenhaNova, 10) })) : res.status(404).end();
})
app.post('/api/CriarEstabelecimento', authenticate, async (req, res) => {
    const {
        Nome, Email, Telefone, CNPJ, CEP,
        Estado, Cidade, Bairro, Endereco,
        Numero, Complemento, servico, id_usuario
    } = req.body;

    try {
        const verificarcnpj = await Estabelecimento.findOne({ where: { Cnpj: CNPJ } });
        if (verificarcnpj) {
            return res.status(400).json({ mensagem: "CNPJ já cadastrado" });
        }

        let servicos = await Servico.findOne({ where: { Nome: servico } });
        let ServicoCriado;

        if (!servicos) {
            ServicoCriado = await Servico.create({ Nome: servico });
        }

        const newEstabelecimento = await Estabelecimento.create({
            Nome,
            Email,
            Telefone,
            Cnpj: CNPJ,
            CEP,
            UF: Estado,
            Cidade,
            Bairro,
            Logradouro: Endereco,
            Numero: Numero || null,
            Complemento: Complemento || null,
            ID_usuario: id_usuario,
            ID_servico: servicos ? servicos.ID_servico : ServicoCriado.ID_servico
        });

        return res.status(200).json({
            mensagem: "Estabelecimento criado com sucesso",
            estabelecimento: newEstabelecimento
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: `Erro ao cadastrar estabelecimento: ${error}` });
    }
});

app.post('/api/CriarFotoEstabelecimento',upload.single('file'),async (req,res) => {
    const { CNPJ } = req.body;
    const lojas = await Estabelecimento.findOne({ where: { Cnpj: CNPJ } });
   console.log()
    if (!lojas) {
        return res.status(404).json({ mensagem: "Estabelecimento não encontrado para o CNPJ fornecido." });
    }

    try {
        await FotosEstabelecimento.create({
            Foto: req.file.buffer,
            TipoFoto: req.file.mimetype,
            ID_estabelecimento: lojas.ID_estabelecimento
        });

        res.status(200).json({ mensagem: "Foto do estabelecimento cadastrada com sucesso." });

    } catch (error) {
        console.error("Erro ao cadastrar foto do estabelecimento:", error);
        res.status(500).json({ mensagem: `Erro ao cadastrar foto do estabelecimento: ${error}` });
    }
})
app.get('/api/estabelecimentos', async (req, res) => {
    const estabelecimentos = await Estabelecimento.findAll();
    estabelecimentos ? res.status(200).json(estabelecimentos) : res.status(404).end();
})

sequelize.sync().then(() => {
    app.listen(PORT, function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });
});