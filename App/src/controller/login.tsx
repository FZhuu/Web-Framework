import React, { useState, useRef } from 'react';
import styles from '../styles/login.module.css';
import BackArrow from '../imgs/SVGs/Back-arrow.svg';
import OlhoAberto from '../imgs/SVGs/olho-aberto.svg';
import OlhoFechado from '../imgs/SVGs/olho-fechado.svg';
import ImagemFundo from '../imgs/Fundo-crud.jpg';
import Logo from '../imgs/logo/SVG Variações/Branco/Vertical Branco.svg';
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {

    const navigate = useNavigate()
    const [emailFocus, setEmailFocus] = useState(false);
    const [senhaFocus, setSenhaFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const emailRef = useRef<HTMLInputElement>(null);
    const senhaRef = useRef<HTMLInputElement>(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const windowwidth = window.innerWidth

    const alternarVisibilidadeSenha = () => {
        setMostrarSenha(prev => !prev);
    };

    const validarEmail = (email: string) => {
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
                }
            );

            if (emailRef.current) {
                emailRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }

            return false;
        }
        return true;
    };

    const verificarCampos = async () => {
        if (email.trim() === '' || senha.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campos vazios',
                text: 'Por favor, preencha todos os campos.',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                }
            });
            if (emailRef.current) {
                emailRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            if (senhaRef.current) {
                senhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }
            return;
        }

        if (!validarEmail(email)) return;

        // Sucesso (continue com login)
        console.log(`Todos os campos preenchidos corretamente.\nemail: ${email}\nsenha: ${senha}`);

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email, Senha: senha }),
            })
            if (response.ok) {
                Swal.fire({
                    title: 'Login feito com Sucesso',
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        document.body.classList.remove('swal2-height-auto');
                    }
                }).then((result) => {
                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                        navigate('/perfil')
                    }
                })
                const dados = await response.json();
                localStorage.setItem('ID', dados.ID_usuario);
            }
            if (response.status === 401 || response.status === 404) {
                const erro = await response.json();
                Swal.fire({
                    title: erro.mensagem,
                    icon: 'error',
                    didOpen: () => {
                        document.body.classList.remove('swal2-height-auto');
                        console.log('entrou')
                    }
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'Erro ao login',
                text: 'Por favor, tente novamente.',
                icon: 'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                }
            })
            console.log('error', error);
        }
    };


    return (
        <div className={styles.fundo}>
            <div className={styles.Cardlogin}>
                <aside className={styles.aside}>
                    <img src={ImagemFundo} className={styles.backgroundImg} alt={'imagemFundo'}/>
                    <a href="/" id="voltar" className={styles.voltar}><img src={BackArrow} alt="Voltar" className={styles.imgVoltar} /></a>
                    <img src={Logo} alt="Logo LocalTop" className={styles.logo} />
                </aside>
                <div className={styles.InputSide}>
                    <a href="/" id="voltar" className={styles.voltarmobile}><img src={BackArrow} alt="Voltar" className={styles.imgVoltar} /></a>
                    <h1>LOGIN</h1>
                    <form className={styles.Formlogin} id="Form-login" method="post" onSubmit={(e) => {e.preventDefault(); verificarCampos();}}>
                        <div className={styles.DivEmail}>
                            <label>Email:</label>
                            <input type="email" id="email" placeholder="Digite seu email*" name="email" onChange={(e) => { setEmailFocus(true); setEmail(e.target.value) }} style={emailFocus ? { outline: '1px solid #3E996F' } : {}} ref={emailRef} />
                        </div>
                        <div className={styles.DivSenha}>
                            <label>Senha:</label>
                            <input type={mostrarSenha ? 'text' : 'password'} id="senha" name="senha" onChange={(e) => {setSenhaFocus(true); setSenha(e.target.value)}} placeholder="Digite sua senha*" style={senhaFocus ? { outline: '1px solid #3E996F' } : {}} ref={senhaRef} />
                            <div className={styles.DivOlho} onClick={alternarVisibilidadeSenha}>
                                <img src={mostrarSenha ? OlhoFechado : OlhoAberto} alt={`Olho ${ mostrarSenha ? 'Fechado':'Aberto'}`} id="olho" className={styles.imgOlho} />
                            </div>
                        </div>
                        <button type="submit" id="login" className={styles.login}>Entrar</button>
                        <a href="/cadastro" className={styles.signup}>Não possui uma conta? Cadastre-se</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;