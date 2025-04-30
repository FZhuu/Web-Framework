import React, { useState, useRef } from 'react';
import '../styles/login.css';
import BackArrow from '../imgs/Back-arrow.svg';
import OlhoAberto from '../imgs/olho-aberto.svg';
import OlhoFechado from '../imgs/olho-fechado.svg';
import ImagemFundo from '../imgs/Fundo-crud.jpg';
import Logo from '../imgs/logo/SVG Variações/Branco/Vertical Branco.svg';
import Swal from 'sweetalert2';


// function VerificarCampos() {
//     let email = document.getElementById("email") as HTMLInputElement;
//     let senha = document.getElementById("senha") as HTMLInputElement;
//     console.log(email, senha);
//     if (email.value === "" || senha.value === "") {
//         Swal.fire({
//             icon: 'error',
//             title: 'Campos vazios',
//             text: 'Por favor, preencha todos os campos.'
//         });
//         email.style.outline = '1px solid rgb(202, 50, 121)';
//         senha.style.outline = '1px solid rgb(202, 50, 121)';
//         return;
//     }
//     if (!validarEmail(email.value)) return;
// }


const Login: React.FC = () => {

    const [emailFocus, setEmailFocus] = useState(false);
    const [senhaFocus, setSenhaFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const emailRef = useRef<HTMLInputElement>(null);
    const senhaRef = useRef<HTMLInputElement>(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const alternarVisibilidadeSenha = () => {
        setMostrarSenha(prev => !prev);
    };

    const validarEmail = (email: string) => {
        const regex = /^[A-Za-z0-9._!#$%&*+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!regex.test(email)) {
            console.log(email);
            Swal.fire(
                'Email Inválido',
                'Por favor, insira um email válido.',
                'error'
            );

            if (emailRef.current) {
                emailRef.current.style.outline = '1px solid rgb(202, 50, 121)';
            }

            return false;
        }
        console.log(email);
        return true;
    };

    const verificarCampos = () => {
        console.log(senha);
        if (email.trim() === '' || senha.trim() === '') {
            if (email.trim() === '' && senha.trim() === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos vazios',
                    text: 'Por favor, preencha todos os campos.',
                });
                if (emailRef.current) {
                    emailRef.current.style.outline = '1px solid rgb(202, 50, 121)';
                }
                if (senhaRef.current) {
                    senhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
                }
                return;
            }
            if (email.trim() === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Digite a email',
                    text: 'Por favor, digite a email.',
                });
                if (emailRef.current) emailRef.current.style.outline = '1px solid rgb(202, 50, 121)';
                return;
            };
            if (senha.trim() === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Digite a senha',
                    text: 'Por favor, digite a senha.',
                });
                if (senhaRef.current) senhaRef.current.style.outline = '1px solid rgb(202, 50, 121)';
                return;
            }
        }

        if (!validarEmail(email)) return;

        // Sucesso (continue com login)
        console.log('Todos os campos preenchidos corretamente.');
    };


    return (
        <div className='fundo'>
            <div className="Card-login">
                <aside>
                    <img src={ImagemFundo} className="backgroundImg"></img>
                    <a href="/" id="voltar" className="voltar"><img src={BackArrow} alt="Voltar" className="imgVoltar" /></a>
                    <img src={Logo} alt="Logo LocalTop" className="logo" />
                </aside>
                <div className="InputSide">
                    <a href="/" id="voltar" className="voltar-mobile"><img src={BackArrow} alt="Voltar" className="imgVoltar" /></a>
                    <h1>LOGIN</h1>
                    <form className="Form-login" id="Form-login" method="post" onSubmit={(e) => {e.preventDefault(); verificarCampos();}}>
                        <div className="DivEmail">
                            <label>Email:</label>
                            <input type="email" id="email" placeholder="Digite seu email*" name="email" onChange={(e) => { setEmailFocus(true); setEmail(e.target.value) }} style={emailFocus ? { outline: '1px solid #3E996F' } : {}} ref={emailRef} />
                        </div>
                        <div className="DivSenha">
                            <label>Senha:</label>
                            <input type={mostrarSenha ? 'text' : 'password'} id="senha" name="senha" onChange={(e) => {setSenhaFocus(true); setSenha(e.target.value)}} placeholder="Digite sua senha*" style={senhaFocus ? { outline: '1px solid #3E996F' } : {}} ref={senhaRef} />.
                            <div className="DivOlho" onClick={alternarVisibilidadeSenha}>
                                <img src={mostrarSenha ? OlhoFechado : OlhoAberto} alt="Olho fechado" id="olho" className="imgOlho" />
                            </div>
                        </div>
                        <button type="submit" id="login" className="login">Entrar</button>
                        <a href="/cadastro" className="signup">Não possui uma conta? Cadastre-se</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;