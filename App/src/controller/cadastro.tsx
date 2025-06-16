import React, {useState} from 'react';
import styles from '../styles/cadastro.module.css';
import BackArrow from '../imgs/SVGs/Back-arrow.svg';
import OlhoAberto from '../imgs/SVGs/olho-aberto.svg';
import OlhoFechado from '../imgs/SVGs/olho-fechado.svg';
import ImagemFundo from '../imgs/Fundo-crud.jpg';
import Logo from '../imgs/logo/SVG Variações/Branco/Vertical Branco.svg';
import { cpfMask } from './cpfmask';
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";

const Cadastro: React.FC = () => {
    const navigate =  useNavigate()
    const [nomeFocus, setNomeFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [dtnascFocus, setDtnascFocus] = useState(false);
    const [cpfFocus, setCPFFocus] = useState(false);
    const [senhaFocus, setSenhaFocus] = useState(false);
    const [checksenhaFocus, setCheckSenhaFocus] = useState(false);
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

    function getTodayDateString() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // mês de 1 a 12
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    function MinDate() {
        const today = new Date();
        const yyyy = today.getFullYear() - 100;
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // mês de 1 a 12
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    function MascaraCPF(input: string) {
        input = input.replace(/\D/g, "")
        if (input.length === 11) {
            const cpfmasked = cpfMask(input)
            return setCPF(cpfmasked)
        }
        setCPF(input)
    }

    function validaCPF():boolean {
        let cpfRep = cpf.replace(/\D/g, '');

        if (cpfRep.length !== 11 || /^(\d)\1{10}$/.test(cpfRep)) return false;

        const calcDig = (factor:number, max:number) => {
            let total = 0;
            for (let i = 0; i < max; i++) {
                total += parseInt(cpfRep[i]) * (factor--);
            }
            let resto = (total * 10) % 11;
            return resto === 10 ? 0 : resto;
        };

        const dig1 = calcDig(10, 9);
        const dig2 = calcDig(11, 10);

        return dig1 === parseInt(cpfRep[9]) && dig2 === parseInt(cpfRep[10]);
    }

    function msgValidaCPF() {
        const isValido = validaCPF();

        if (!isValido) {
            Swal.fire({
                title:'CPF Inválido',
                icon:'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            });
            if (cpfRef.current) {
                cpfRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        return true;
    }

    function validarNome() {
        const regex = /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/

        if (nome.length < 8 || !regex.test(nome)) {
            Swal.fire({
                title:'Nome Inválido',
                text:'Por favor, insira um nome completo.',
                icon:'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            });
            if (nomeRef.current) {
                nomeRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        return true;
    }

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

            if (emailRef.current) {
                emailRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }

            return false;
        }
        return true;
    }

    function validarDataNasc() {
        const today = new Date();
        const DtNasc = new Date(dtnasc);

        let idade:number = today.getFullYear() - DtNasc.getFullYear();
        let m:number = today.getMonth() - DtNasc.getMonth();
        let d:number = today.getDate() - DtNasc.getDate();

        if (isNaN(DtNasc.getTime())) {
            Swal.fire({
                title: 'Data inválida',
                text: 'Insira uma data válida',
                icon: 'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            });
            if (dtnascRef.current) {
                dtnascRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        if (m<0 || (m === 0 && d < 0)) {
            idade--;
        }
        if (idade < 18) {
            if (idade < 0) {
                Swal.fire({
                    title: 'Data inválida',
                    text: 'Insira uma data válida',
                    icon: 'error'
                })
                if (dtnascRef.current) {
                    dtnascRef.current.style.outline = '1px solid rgb(202, 50, 121)';
                }
                return false;
            }
            Swal.fire({
                title: 'Menor de idade',
                text: 'Apenas maiores de idade podem se cadastrar',
                icon: 'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            })
            if (dtnascRef.current) {
                dtnascRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        return true;
    }

    function validarSenha() {
        let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{8,}$/;
        if (senha.length < 8 ) {
            Swal.fire({
                title:'Senha fraca',
                text:'A senha deve ter pelo menos 8 caracteres',
                icon:'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            })
            if (senhaRef.current) {
                senhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }if (checksenhaRef.current) {
                checksenhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        if (!regex.test(senha)) {
            Swal.fire({
                title:'Senha fraca',
                text: 'A senha deve ter pelo menos uma letra maiúscula, uma letra minúscula. um número e um caracter especial',
                icon: 'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            })
            if (senhaRef.current) {
                senhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }if (checksenhaRef.current) {
                checksenhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        if (senha !== checksenha) {
            Swal.fire({
                title: 'Senhas diferentes',
                text: 'o campo de senha e comfirmação de senha devem ser iguais',
                icon: 'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            })
            if (senhaRef.current) {
                senhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }if (checksenhaRef.current) {
                checksenhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        return true;
    }

    async function validarCampos() {
        if (!validarNome()) return;
        if (!validarEmail()) return;
        if (!validarDataNasc()) return;
        if (!msgValidaCPF()) return;
        if (!validarSenha()) return;

        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Nome: nome,
                    Email: email,
                    DataNascimento: dtnasc,
                    CPF: cpf,
                    Senha: senha
                })
            })
            if (response.ok) {
                const resultado = await response.json();
                Swal.fire({
                    title: 'Cadastro realizado com sucesso',
                    text: `${resultado.mensagem}, pressione o botão ou espere para ser redirecionado para a página de login`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer:3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        document.body.classList.remove('swal2-height-auto');
                        console.log('entrou')
                    }
                }).then((result) => {
                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                        navigate('/login');
                    }
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title:' Erro ao cadastrar',
                text: `tente novamente depois`,
                icon: 'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                    console.log('entrou')
                }
            })
        }
    }
    return (
        <div className={styles.fundo}>
            <div className={styles.CardCadastro}>
                <aside className={styles.aside}>
                    <img src={ImagemFundo} className={styles.backgroundImg} alt={'FundoIng'}></img>
                    <a href="/" id="voltar" className={styles.voltar}><img src={BackArrow} alt="Voltar" className={styles.imgVoltar}/></a>
                    <img src={Logo} alt="Logo LocalTop" className={styles.logo}/>
                </aside>
                <div className={styles.InputSide}>
                    <a href="/" id="voltar" className={styles.voltarmobile}><img src={BackArrow} alt="Voltar" className={styles.imgVoltar}/></a>
                    <h1>CADASTRO</h1>
                    <form className={styles.FormCadastro} id="FormCadastro" method="post" onSubmit={(e) => {e.preventDefault(); validarCampos();}}>
                        <div className={styles.DivNome}>
                            <label>Nome completo:</label>
                            <input type="text" id="nome" alt="Nome completo" placeholder="Digite seu nome completo*" name="nome" onChange={(e) => {setNomeFocus(true);setNome(e.target.value)}} style={nomeFocus ? { outline: '1px solid #3E996F' } : {}} ref={nomeRef}/>
                        </div>
                        <div className={styles.DivEmail}>
                            <label>Email:</label>
                            <input type="email" id="email" placeholder="Digite seu email*" name="email" onChange={(e) => {setEmailFocus(true);setEmail(e.target.value)}} style={emailFocus ? { outline: '1px solid #3E996F' } : {}} ref={emailRef}/>
                        </div>
                        <div className={styles.DivDtNascCPF}>
                            <div className={styles.DivDatanasc}>
                                <label>Data de Nascimento:</label>
                                <input type="date" id="datanasc" name="datanasc" min={MinDate()}
                                      max={getTodayDateString()} onChange={(e) => {setDtnascFocus(true);setDataNasc(e.target.value)}} style={dtnascFocus ? { outline: '1px solid #3E996F' } : {}} ref={dtnascRef}/>
                            </div>
                            <div className={styles.DivCPF}>
                                <label>CPF:</label>
                                <input type="text" id="cpf"  value={cpf} maxLength={14} placeholder="000.000.000-00" title="" onChange={(e) => {MascaraCPF(e.target.value);setCPFFocus(true);}} style={!cpfFocus ? { outline: '1px solid #3E996F' } : {}} ref={cpfRef} name="cpf"/>
                            </div>
                        </div>
                        <div className={styles.DivSenha}>
                            <label>Senha:</label>
                            <input type={mostrarSenha ? 'text' : 'password'} autoComplete={"new-password"} id="senha" name="senha" onChange={(e) => {setSenhaFocus(true);setSenha(e.target.value)}} style={senhaFocus ? { outline: '1px solid #3E996F' } : {}} ref={senhaRef}/>
                                <div className={styles.DivOlho} onClick={alternarVisibilidadeSenha}>
                                    <img src={mostrarSenha ? OlhoFechado : OlhoAberto} alt="Olho fechado" id="olho" className={styles.imgOlho}/>
                                </div>
                        </div>
                        <div className={styles.DivChecksenha}>
                            <label>Confirmar Senha:</label>
                            <input type={mostrarSenha ? 'text' : 'password'} autoComplete={"new-password"} id="confirmarsenha" onChange={(e) => {setCheckSenhaFocus(true);setCheckSenha(e.target.value)}} style={checksenhaFocus ? { outline: '1px solid #3E996F' } : {}} ref={checksenhaRef}/>
                        </div>
                        <p className={styles.senhaCondicao}>
                            Senha deve conter: <br/>
                            - 8 ou mais caracteres <br/>
                            - 1 letra maiuscula <br/>
                            - 1 número <br/>
                            - 1 caractere especial
                        </p>
                        <button type="submit" className={styles.cadastrar}>Cadastrar</button>
                        <a href="/login" className={styles.login}>Já possui uma conta? Faça login</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;