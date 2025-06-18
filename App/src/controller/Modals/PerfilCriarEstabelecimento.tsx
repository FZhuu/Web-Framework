import React, {useEffect, useState} from "react";
import SetaAnterior from '../../imgs/SVGs/AnteriorSeta.svg';
import SetaProxima from '../../imgs/SVGs/ProximaSeta.svg';
import Pesquisar from '../../imgs/SVGs/pesquisar.svg'
import Delete from '../../imgs/SVGs/delete.svg';
import styles from '../../styles/Perfil.module.css';
import Swal from "sweetalert2";
import {replace} from "react-router-dom";

const CriarEstabelecimento: React.FC = () => {
    const [selectOutro,setSelectOutro] = useState(false)
    const [imagens, setImagens] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [imagemAtual, setImagemAtual] = useState(0);
    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [telefone, SetTelefone] = useState<string>('')
    const [cnpj, SetCNPJ] = useState<string>('')
    const [cep, SetCEP] = useState<string>('')
    const [estado, SetEstado] = useState<string>('')
    const [cidade, SetCidade] = useState<string>('')
    const [bairro, SetBairro] = useState<string>('')
    const [endereco, SetEndereco] = useState<string>('')
    const [numero,setNumero] = useState<string>('')
    const [complemento,setComplemento] = useState<string>('')
    const [servico,setServico] = useState<string>('')
    const [servicoOutro,setServicoOutro] = useState<string>('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const arquivos = event.target.files;
        if (!arquivos) return;

        const novosArquivos = Array.from(arquivos);

        // Verifica se o total ultrapassará 5
        if (imagens.length + novosArquivos.length > 5) {
            Swal.fire({
                icon: 'warning',
                title: 'Limite de imagens atingido',
                text: 'Você pode adicionar no máximo 5 imagens.',
                confirmButtonColor: '#3E996F'
            });
            return;
        }

        const novasURLs = novosArquivos.map((arquivo) => URL.createObjectURL(arquivo));

        setImagens((prev) => [...prev, ...novosArquivos]);
        setPreviews((prev) => [...prev, ...novasURLs]);

        if (previews.length === 0) setImagemAtual(0);
    };

    useEffect(() => {
        if (previews.length > 0) {
            if (imagemAtual >= previews.length) {
                setImagemAtual(previews.length - 1);
            }
        } else {
            setImagemAtual(0);
        }
    }, [previews]);

    function validarEmail() {
        const regex = /^[A-Za-z0-9._!#$%&*+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!regex.test(email)) {
            console.log(email);
            Swal.fire({
                title:'Email Inválido',
                text:'Por favor, insira um email válido.',
                icon:'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            });
            return false;
        }
        return true;
    }
    function MascaraTelefone(input: string): string {
        input = input.replace(/\D/g, ""); // Remove tudo que não for número
        if (input.length <= 10) {
            return input.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
        }
        return input.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    }
    function MascaraCnpj(input: string): string {
        input = input.replace(/\D/g, "");
        return input.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})$/, "$1.$2.$3/$4-$5");
    }
    function MascaraCEP(input: string): string {
        input = input.replace(/\D/g, "");
        return input.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
    }
    async function buscarCEP() {
        if (cep.length < 8) {
            Swal.fire({
                title:'CEP Inválido',
                text:'CEP não encontrado',
                icon:'error'
            })
            return
        }
        const Cep = cep.replace(/\D/g, '');

        const resposta = await fetch(`https://viacep.com.br/ws/${Cep}/json/`);
        const dados = await resposta.json();
        if (dados.erro) {
            Swal.fire({
                title:'CEP Inválido',
                text:'CEP não encontrado',
                icon:'error'
            })
            return;
        }
        console.log(await dados)
        SetEstado(dados.uf);
        SetCidade(dados.localidade);
        SetBairro(dados.bairro);
        SetEndereco(dados.logradouro);
    }
    function verificarNome() {
        const regex = /^[A-Za-zÀ-ÿ-'.,]+(?:\s+[A-Za-zÀ-ÿ-'.,]+)*$/;
        if (nome.length <= 3) {
            Swal.fire({
                title:'Nome Inválido',
                text:'tamanho do nome inválido, digite um nome maior que 3 caracteres',
                icon:'error'
            })
            return false
        }
        if (!regex.test(nome)) {
            Swal.fire({
                title:'Nome inválido',
                text: 'Insira apenas caracteres permitidos: letras Maúsculas,minúsculas, espaço, acentos, pontuação, -, \'',
                icon:'error'
            })
            return false
        }
        return true;
    }
    function VerificarCNPJ(cnpj: string) {
        cnpj = cnpj.replace(/\D+/g,'');

        if (cnpj.length !== 14) return false;

        if (/^(\d)\1+$/.test(cnpj)) return false; // Rejeita todos iguais

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho += 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        return resultado === parseInt(digitos.charAt(1));
    }
    function msgCNPJ() {
        if (!VerificarCNPJ(cnpj)) {
            Swal.fire({
                title:'CNPJ Inválido',
                text:'CNPJ não encontrado',
                icon:'error'
            })

            return false
        }
        return true
    }

    async function criarEstabelecimento() {
        if (!verificarNome() || !validarEmail() || !msgCNPJ()) return;
        if (telefone.length < 10 || cep.length < 8) {
            Swal.fire({
                title: 'Preencha todos os campos',
                icon: 'error'
            })
            return;
        }
        const response = await fetch('http://localhost:8080/api/CriarEstabelecimento', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('token')},
            body: JSON.stringify({
                Nome: nome,
                Email: email,
                Telefone: telefone,
                CNPJ: cnpj,
                CEP: cep,
                Estado: estado,
                Cidade: cidade,
                Bairro: bairro,
                Endereco: endereco,
                Numero: numero,
                Complemento: complemento,
                servico: servico === '_' ? servicoOutro : servico,
                id_usuario: localStorage.getItem('ID')
            })
        })
        if (response.ok) {
            console.log('entrou')
            for(const img of imagens) {
                const formData = new FormData();
                formData.append('file', img);
                formData.append('CNPJ', cnpj)
                const responseImg = await fetch('http://localhost:8080/api/CriarFotoEstabelecimento', {
                    method: 'POST',
                    body: formData
                })
                if (!responseImg.ok) {
                    const erro = await responseImg.json()
                    await Swal.fire({
                        title: 'Erro ao adicionar fotos',
                        text: `${erro.mensagem}`,
                        icon: 'error'
                    });
                    return;
                }
            }
            Swal.fire({
                title: 'LocalTop criado com sucesso',
                icon: 'success'
            })
        } else {
            const erro = await response.json()
            Swal.fire({
                title: 'Erro ao criar LocalTop',
                text: `${erro.mensagem}`,
                icon: 'error'
            })
        }
    }
    return (
        <>
            <h1>Adicionar LocalTop</h1>
            <p>Crie um perfil para o seu negócio</p>
            <hr/>
            <form style={{gap: '1rem'}}>
                <div className={styles.NomeEmailFotoEstabe}>
                    <div className={styles.NomeEmailEstabele}>
                        <div className={styles.nomeEstabele}>
                            <label htmlFor="nomeEstabele">*Nome do Estabelecimento</label>
                            <input type="text" id="nomeEstabele" value={nome} onChange={(e)=> setNome(e.target.value)} name="nome"/>
                        </div>
                        <div className={styles.emailEstabele}>
                            <label htmlFor="email">*Email</label>
                            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email"/>
                        </div>
                        <div className={styles.TelefoneCnpj}>
                            <div className={styles.telefone}>
                                <label htmlFor="telefone">*Telefone</label>
                                <input type="text" id="telefone" name="telefone" maxLength={15} value={telefone}
                                       onChange={(e) => SetTelefone(MascaraTelefone(e.target.value))}
                                />
                            </div>
                            <div className={styles.cnpj}>
                                <label htmlFor="cnpj">*CNPJ</label>
                                <input type="text" id="cnpj" name="cnpj" value={cnpj} maxLength={18} onChange={(e)=>SetCNPJ(MascaraCnpj(e.target.value))} />
                            </div>
                            <div className={styles.cep}>
                                <label htmlFor="cep">*CEP</label>
                                <div
                                    style={{display: 'flex', flexDirection: 'row',justifyContent: 'end',alignItems: 'center'}}>
                                    <input type="text" id="cep" name="cep" value={cep} maxLength={9} onChange={(e) => SetCEP(MascaraCEP(e.target.value))}/>
                                    <button type="button"
                                            style={{position: 'absolute',border: 'none',backgroundColor: 'transparent',width: '2rem',height: '2rem'}}
                                            onClick={buscarCEP}><img
                                        src={Pesquisar} style={{height: '100%', width: '100%'}} alt={'Pesquisar CEP'}/></button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.Endereco}>
                            <div className={styles.BairroCidadeEstado}>
                                <div className={styles.estado}>
                                    <label htmlFor="estado">*Estado</label>
                                    <input type="text" id="estado" name="estado" value={estado} disabled/>
                                </div>
                                <div className={styles.cidade}>
                                    <label htmlFor="cidade">*Cidade</label>
                                    <input type="text" id="cidade" name="cidade" value={cidade} disabled/>
                                </div>
                                <div className={styles.bairro}>
                                    <label htmlFor="bairro">*Bairro</label>
                                    <input type="text" id="bairro" name="bairro" value={bairro} disabled/>
                                </div>
                            </div>
                            <div className={styles.RuaNumero}>
                                <div className={styles.rua}>
                                    <label htmlFor="endereco">*Endereco</label>
                                    <input type="text" id="endereco" name="rua" value={endereco} disabled/>
                                </div>
                                <div className={styles.numero}>
                                    <label htmlFor="numero">Número</label>
                                    <input type="text" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} name="numero"/>
                                </div>
                            </div>
                            <div className={styles.complemento}>
                                <label htmlFor="complemento">Complemento</label>
                                <input type="text" id="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} name="complemento"/>
                            </div>
                            <div className={styles.servicos}>
                                <div className={styles.SelectServico}>
                                    <label htmlFor="servico">*Serviço</label>
                                    <select name="servico" id="servico" className={styles.select} onChange={(e)=>{ e.target.value === "_" ? setSelectOutro(true): setSelectOutro(false);
                                    setServico(e.target.value)}}>
                                        <option value="0">Selecione</option>
                                        <option value="1">Pizzaria</option>
                                        <option value="2">Restaurante</option>
                                        <option value="3">Bebida</option>
                                        <option value="4">Lanchonete</option>
                                        <option value="_">Outros</option>
                                    </select>
                                </div>
                                {selectOutro && <input type="text" id="servicoInput" value={servicoOutro} onChange={(e)=> setServicoOutro(e.target.value)} name="servicoOutro"/>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.InputFotoEstabele}>
                        <div id="Estabelecimentoimg" className={styles.Estabelecimentoimg}>
                            <img
                                className={styles.newImgEsta}
                                src={previews[imagemAtual] || 'https://placehold.co/300x400?text=Adicione+suas+fotos'}
                                alt="imagem do estabelecimento"
                            />
                            <button type={'button'} className={styles.prevImg} onClick={() => {setImagemAtual((prev) => (prev > 0 ? prev - 1 : previews.length - 1));}}>
                                <img src={SetaAnterior} alt="anterior" />
                            </button>
                            <button type={"button"} className={styles.nextImg} onClick={() => {setImagemAtual((prev) => (prev < previews.length - 1 ? prev + 1 : 0));}}>
                                <img src={SetaProxima} alt="próxima" />
                            </button>
                        </div>
                        <div className={styles.IdentifierDelete}>
                            <div className={styles.spans} id="spans">
                                {previews.length > 0 ? (
                                    previews.map((img, index) => (
                                        <span
                                            key={index}
                                            onClick={() => setImagemAtual(index)}
                                            style={{
                                                backgroundColor: imagemAtual === index ? '#3E996F' : 'transparent',
                                                cursor: 'pointer',
                                            }}
                                        ></span>
                                    ))
                                ) : (
                                    <p>Nenhuma imagem adicionada</p>
                                )}
                            </div>
                            <button
                                type="button"
                                className={styles.deleteImg}
                                onClick={() => {
                                    const novasImgs = imagens.filter((_, i) => i !== imagemAtual);
                                    const novasPrevs = previews.filter((_, i) => i !== imagemAtual);
                                    setImagens(novasImgs);
                                    setPreviews(novasPrevs);
                                    setImagemAtual((prev) =>
                                        prev > 0 ? prev - 1 : 0
                                    );
                                }}
                            >
                                <img src={Delete} alt="excluir imagem" />
                            </button>
                        </div>
                        <label htmlFor="fileEstabele">
                            Adicionar Foto
                        </label>
                        <input type="file" id="fileEstabele" name="file" accept="image/*" onChange={handleFileChange}
                               style={{display: 'none'}} multiple/>
                    </div>
                </div>
                <div id="btns" className={styles.btnEstabelecimento}>
                    <button type="button" className={styles.criarEstabelecimento} onClick={() => criarEstabelecimento()}>Criar</button>
                </div>
            </form>
        </>
    )
}

export default CriarEstabelecimento;