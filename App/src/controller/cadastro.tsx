import React, {useState} from 'react';
import { UserModel } from '../Model/UserModel';
import '../styles/cadastro.css';
import BackArrow from '../imgs/Back-arrow.svg';
import OlhoAberto from '../imgs/olho-aberto.svg';
import OlhoFechado from '../imgs/olho-fechado.svg';
import ImagemFundo from '../imgs/Fundo-crud.jpg';
import Logo from '../imgs/logo/SVG Variações/Branco/Vertical Branco.svg';
// import { InputMask } from 'primereact/inputmask';
import { cpfMask } from './cpfmask';
import Swal from 'sweetalert2';

const Cadastro: React.FC = () => {
        const [nomeFocus, setNomeFocus] = useState(false);
        const [emailFocus, setEmailFocus] = useState(false);
        const [dtnascFocus, setDtnascFocus] = useState(false);
        const [cpfFocus, setCPFFocus] = useState(false);
        const [senhaFocus, setSenhaFocus] = useState(false);
        const [checksenhaFocus, setCheckSenhaFocus] = useState(false);
        const [erroCPF, setErroCPF] = useState(false);
        const [nome, setNome] = useState('');
        const [email, setEmail] = useState('');
        const [dtnasc, setDataNasc] = useState('');
        const [cpf, setCPF] = useState('');
        const [senha, setSenha] = useState('');
        const [checksenha, setCheckSenha] = useState('');
        const nomeRef = React.useRef<HTMLInputElement>(null);
        const emailRef = React.useRef<HTMLInputElement>(null);
        const dtnascRef = React.useRef<HTMLInputElement>(null);
        const cpfRef = React.useRef<HTMLInputElement>(null);
        const senhaRef = React.useRef<HTMLInputElement>(null);
        const checksenhaRef = React.useRef<HTMLInputElement>(null);
        const [mostrarSenha, setMostrarSenha] = useState(false);
    
        const alternarVisibilidadeSenha = () => {
            setMostrarSenha(prev => !prev);
        };

        // const mudarCor = () => {
        //     const input: HTMLInputElement | null = cpfRef.current?.getInput?.();
        //     if (input) {
        //         input.style.outline = '1px solid rgb(202, 50, 121)';
        //     }
        // }

        function aplicarmask(input: string) {
            input = input.replace(/\D/g, "")
            if (input.length === 11) {
                const cpfmasked = cpfMask(input)
                return setCPF(cpfmasked)
            }
            setCPF(input)
        }

        function validaCPF(cpf: string):boolean {
            cpf = cpf.replace(/\D/g, '');
        
            if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
            const calcDig = (factor:number, max:number) => {
                let total = 0;
                for (let i = 0; i < max; i++) {
                    total += parseInt(cpf[i]) * (factor--);
                }
                let resto = (total * 10) % 11;
                return resto === 10 ? 0 : resto;
            };
        
            const dig1 = calcDig(10, 9);
            const dig2 = calcDig(11, 10);
        
            return dig1 === parseInt(cpf[9]) && dig2 === parseInt(cpf[10]);
        }

        function msgValidaCPF() {
            const isValido = validaCPF(cpf);
        
            if (!isValido) {
                Swal.fire(
                    'CPF Inválido',
                    '',
                    'error'
                );
                setErroCPF(true);
                if (cpfRef.current) {
                    cpfRef.current.style.outline = '1px solid rgb(202, 50, 121)';
                }
                return false;
            }
            setErroCPF(false);
            return true;
        }

    return (
        <div className='fundo'>
            <div className="CardCadastro">
                <aside>
                    <img src={ImagemFundo} className="backgroundImg"></img>
                    <a href="/" id="voltar" className="voltar"><img src={BackArrow} alt="Voltar" className="imgVoltar"/></a>
                    <img src={Logo} alt="Logo LocalTop" className="logo"/>
                </aside>
                <div className="InputSide">
                    <a href="/" id="voltar" className="voltar-mobile"><img src={BackArrow} alt="Voltar" className="imgVoltar"/></a>
                    <h1>CADASTRO</h1>
                    <form className="FormCadastro" id="FormCadastro" method="post">
                        <div className="DivNome">
                            <label>Nome completo:</label>
                            <input type="text" id="nome" alt="Nome completo" placeholder="Digite seu nome completo*" name="nome" onChange={(e) => {setNomeFocus(true);setNome(e.target.value)}} style={nomeFocus ? { outline: '1px solid #3E996F' } : {}} ref={nomeRef}/>
                        </div>
                        <div className="DivEmail">
                            <label>Email:</label>
                            <input type="email" id="email" placeholder="Digite seu email*" name="email" onChange={(e) => {setEmailFocus(true);setEmail(e.target.value)}} style={emailFocus ? { outline: '1px solid #3E996F' } : {}} ref={emailRef}/>
                        </div>
                        <div className="DivDtNascCPF">
                            <div className="DivDatanasc">
                                <label>Data de Nascimento:</label>
                                <input type="date" id="datanasc" name="datanasc" onChange={(e) => {setDtnascFocus(true);setDataNasc(e.target.value)}} style={dtnascFocus ? { outline: '1px solid #3E996F' } : {}} ref={dtnascRef}/>
                            </div>
                            <div className="DivCPF">
                                <label>CPF:</label>
                                    <input type="text" id="cpf"  value={cpf} maxLength={14} placeholder="000.000.000-00" title="" onChange={(e) => {aplicarmask(e.target.value);setCPFFocus(true);}} style={cpfFocus ? { outline: '1px solid #3E996F' } : {}} ref={cpfRef} name="cpf"/>
                            </div>
                        </div>
                        <div className="DivSenha">
                            <label>Senha:</label>
                            <input type={mostrarSenha ? 'text' : 'password'} id="senha" name="senha" onChange={(e) => {setSenhaFocus(true);setSenha(e.target.value)}} style={senhaFocus ? { outline: '1px solid #3E996F' } : {}} ref={senhaRef}/>
                                <div className="DivOlho"onClick={alternarVisibilidadeSenha}>
                                    <img src={mostrarSenha ? OlhoFechado : OlhoAberto} alt="Olho fechado" id="olho" className="imgOlho"/>
                                </div>
                        </div>
                        <div className="DivChecksenha">
                            <label>Confirmar Senha:</label>
                            <input type={mostrarSenha ? 'text' : 'password'} id="confirmarsenha" onChange={(e) => {setCheckSenhaFocus(true);setCheckSenha(e.target.value)}} style={checksenhaFocus ? { outline: '1px solid #3E996F' } : {}} ref={checksenhaRef}/>
                        </div>
                        <p className="senhaCondicao">
                            Senha deve conter: <br/>
                            - 8 ou mais caracteres <br/>
                            - 1 letra maiuscula <br/>
                            - 1 número <br/>
                            - 1 caractere especial
                        </p>
                        <button type="button" className="cadastrar" onClick={msgValidaCPF}>Cadastrar</button>
                        <a href="/login" className="login-a">Já possui uma conta? Faça login</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;