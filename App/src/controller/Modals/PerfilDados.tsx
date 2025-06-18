import React, {useEffect, useState} from 'react';
import styles from '../../styles/Perfil.module.css';
import UserServices from "../../Services/UserService";
import {useNavigate} from "react-router-dom";
import ImgDefault from '../../imgs/SVGs/perfil.svg'
import {cpfMask} from "../cpfmask";
import Swal from "sweetalert2";
import {usePerfil} from "../../context/PerfilContext";
import {useNome} from "../../context/NomeContext";

const PerfilDados: React.FC = () => {
    const navigate = useNavigate()
    const [nomeFocus, setNomeFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [dtnascFocus, setDtnascFocus] = useState(false);
    const [cpfFocus, setCPFFocus] = useState(false);
    const [nomeTemp,SetNomeTemp] = useState("")
    const {nome,setNome} = useNome();
    const [email,SetEmail] = useState("")
    const [DataNasc,SetDataNasc] = useState("")
    const [CPF,SetCPF] = useState("")
    const nomeRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const dtnascRef = React.useRef<HTMLInputElement>(null);
    const cpfRef = React.useRef<HTMLInputElement>(null);
    const [Change,SetChange] = useState(false)
    const {fotoPreview, setFotoPreview} = usePerfil();
    const [foto, setFoto] = useState<File | null>(null);

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
            return SetCPF(cpfmasked)
        }
        SetCPF(input)
    }
    function validaCPF():boolean {
        let cpfRep = CPF.replace(/\D/g, '');

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
                cpfRef.current.style.border = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        return true;
    }
    function validarNome() {
        const regex = /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/

        if (nomeTemp.length < 8 || !regex.test(nomeTemp)) {
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
                nomeRef.current.style.border = '1px solid rgb(202, 50, 121)';
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
                emailRef.current.style.border = '1px solid rgb(202, 50, 121)';
            }

            return false;
        }
        return true;
    }
    function validarDataNasc() {
        const today = new Date();
        const DtNasc = new Date(DataNasc);

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
                dtnascRef.current.style.border = '1px solid rgb(202, 50, 121)';
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
                    dtnascRef.current.style.border = '1px solid rgb(202, 50, 121)';
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
                dtnascRef.current.style.border = '1px solid rgb(202, 50, 121)';
            }
            return false;
        }
        return true;
    }
    async function GetUser() {
        const usuario = await UserServices.GetUser()
        SetNomeTemp(usuario.Nome)
        SetEmail(usuario.Email)
        SetDataNasc(usuario.DataNasc.split('T')[0])
        SetCPF(usuario.CPF)
        const foto = await fetch(`http://localhost:8080/api/usuario/foto/${localStorage.getItem('ID')}`,{
            method: 'GET',
            headers: {'authorization':'Bearer ' + localStorage.getItem('token')}
        })
        const fotoBlob = await foto.blob()
        setFotoPreview(URL.createObjectURL(fotoBlob))
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        GetUser();
    },[])

    async function validarCampos() {
        if (!validarNome()) return;
        if (!validarEmail()) return;
        if (!validarDataNasc()) return;
        if (!msgValidaCPF()) return;
        const formData = new FormData();
        formData.append('nome', nomeTemp);
        formData.append('email', email);
        formData.append('dataNascimento', DataNasc);
        formData.append('cpf', CPF);
        if(foto) formData.append('file', foto);
        try {
            const response = await fetch(`http://localhost:8080/api/usuario/${localStorage.getItem('ID')}`, {
                method: 'PUT',
                headers: {'authorization':'Bearer ' + localStorage.getItem('token')},
                body: formData
            })
            if (response.ok) {
                await Swal.fire({
                    title: 'Dados atualizados com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                SetChange(false);
                setNome(nomeTemp)
                GetUser();
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title:' Erro ao atualizar',
                text: `tente novamente depois`,
                icon: 'error',
                didOpen: () => {
                    document.body.classList.remove('swal2-height-auto');
                }
            })
        }
    }

    return (
        <>
            <h1>Meu Perfil</h1>
            <p>Gerenciar a sua conta</p>
            <hr/>
            <form id="form">
                <div className={styles.NomeEmailFoto}>
                    <div className={styles.NomeEmail}>
                        <div className={styles.nome}>
                            <label htmlFor="nome">Nome Completo</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={nomeTemp}
                                onChange={(e) => {
                                    setNomeFocus(true);SetNomeTemp(e.target.value)
                                }} style={nomeFocus ? { border:"1px solid rgba(62, 62, 62, 0.3)"  } : {}}
                                ref={nomeRef}
                                readOnly={!Change}
                            />
                        </div>
                        <div className={styles.email}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {setEmailFocus(true);SetEmail(e.target.value)}} style={emailFocus ? { border:"1px solid rgba(62, 62, 62, 0.3)"  } : {}} ref={emailRef}
                                readOnly={!Change}
                            />
                        </div>
                    </div>
                    <div className={styles.InputFoto}>
                        <label htmlFor="file">
                            <img className={styles.Perfilimg} src={fotoPreview || ImgDefault} alt={''}/>
                            <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" style={Change? {display:"block"}:{display: 'none'}} id="svgFoto">
                                <path
                                    d="M21 11V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9C3 7.89543 3.89543 7 5 7H6.5C7.12951 7 7.72229 6.70361 8.1 6.2L9.15 4.8C9.52771 4.29639 10.1205 4 10.75 4H13.25"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    opacity="70%"/>
                                <path d="M18.5 4V6.5M18.5 9V6.5M18.5 6.5H16M18.5 6.5H21" stroke="#000000"
                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                      opacity="70%"/>
                                <circle cx="12" cy="13" r="4" stroke="#000000" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" opacity="70%"/>
                            </svg>
                        </label>
                        <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setFoto(file);
                                setFotoPreview(URL.createObjectURL(file));
                            }
                        }}
                        style={{ display: 'none' }}
                        disabled={!Change}
                        />
                    </div>
                </div>
                <div className={styles.DtnascCpf}>
                    <div className={styles.datanasc}>
                        <label htmlFor="datanasc">Data de nascimento</label>
                        <input
                            type="date"
                            id="datanasc"
                            name="datanasc"
                            value={DataNasc}
                            min={MinDate()}
                            max={getTodayDateString()} onChange={(e) => {setDtnascFocus(true);SetDataNasc(e.target.value)}} style={dtnascFocus ? { border:"1px solid rgba(62, 62, 62, 0.3)" } : {}} ref={dtnascRef}
                            readOnly={!Change}
                        />
                    </div>
                    <div className={styles.cpf}>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={CPF}
                            maxLength={14}
                            onChange={(e) => {MascaraCPF(e.target.value);setCPFFocus(true);SetCPF(e.target.value)}} style={!cpfFocus ? { border:"1px solid rgba(62, 62, 62, 0.3)" } : {}}  ref={cpfRef}
                            readOnly={!Change}
                        />
                    </div>
                </div>
                {Change ?
                    <div id="btns" className={styles.btns}>
                        <button type="button" className={styles.BtnCancelar} onClick={() => {
                            GetUser().then(() => {SetChange(false)
                        })
                        }}>Cancelar</button>
                        <button type="button" className={styles.BtnSalvar} onClick={validarCampos}>Salvar</button>
                    </div>
                    :
                    <div id="btns" className={styles.btns}>
                        <button type="button" className={styles.mudarcampos} onClick={() => {
                            SetChange(true)
                        }}>Mudar informações
                        </button>
                    </div>
            }
            </form>
        </>
    )
}

export default PerfilDados;