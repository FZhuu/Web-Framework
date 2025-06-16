import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import session from 'express-session'
import {Usuario} from './DB/tabelaDB.js';
import sequelize from './DB/declararDB.js';
import bcrypt from 'bcrypt';
import multer from 'multer';

const app = express();
const PORT = 8080;

app.use(express.json());

const upload = multer(multer({
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null,'imagens')
      },
      filename: function (req,file,cb) {
          cb(null,file.fieldname + '-' + Date.now())
      }
  })
}))

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
    //captura o token que vem no header
    const token = req.headers.authorization?.split(' ')[1];

    //valida se o token existe
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        //verica se o token foi gerado por este servidor
        //validando a palavra chave
        const decoded = verifyToken(token);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
}

app.get('/gerarToken', async (req, res) => {
    const token = await generateToken(1,'adm@gmail.com')
    console.log(token);
});

app.get('/teste',authenticate, (req, res) => {
    res.json(req.headers.authorization)
});

app
.get('/api/usuarios', async (req,res) => {
    const usuarios = await Usuario.findAll();
    usuarios ? res.json(usuarios) : res.status(400).json({mensagem: 'nenhum usuário encontrado'}).end();
})
    // .get('/api/usuarios/:id', async (req,res) => {
    //
    // })
    .post('/api/login', async (req,res) => {
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
            res.json(usuario);
        } catch (error) {
            console.log(error);
            res.status(400).json({mensagem: `Erro ao fazer login: ${error}`}).end();
        }
    })
    .post('/api/signup',async (req,res) => {
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
                Senha: hashedSenha,
                DataNasc: DataNascimento
            })

            res.status(200).json({mensagem: 'Usuário cadastrado com sucesso!'}).end();
        } catch (error) {
            console.log(error);
            res.status(500).json({mensagem: `Erro ao cadastrar usuário: ${error}`}).end();
        }
    })

sequelize.sync().then(() => {
    app.listen(PORT, function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });
});