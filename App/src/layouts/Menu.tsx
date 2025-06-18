import React, {useEffect, useState} from "react";
import Logo from '../imgs/logo/SVG Variações/Branco/Horizontal-Branco-changed.svg'
import Styles from '../styles/Menu.module.css'
import UserServices from "../Services/UserService";
import {useNavigate,Link} from "react-router-dom";
import ImgDefault from "../imgs/SVGs/perfil.svg";
import {usePerfil} from "../context/PerfilContext";
import {useNome} from "../context/NomeContext";

const Menu: React.FC = () => {
    const navigate = useNavigate();
    const [Dropdown, setDropdown] = React.useState<boolean>(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null); // <-- Novo ref
    const [logged, setLogged] = React.useState<boolean>(false);
    const [adm, SetAdm] = React.useState<boolean>(false);
    const { fotoPreview, setFotoPreview } = usePerfil();
    const {nome,setNome} = useNome();
    async function GetUser() {
        const usuario = await UserServices.GetUser();
        if (usuario.error) return;
        setNome(usuario.Nome);
    }

    useEffect(() => {
        const logged = localStorage.getItem('Logged');
        const adm = localStorage.getItem('ADM');
        if (logged) setLogged(true);
        if (adm) SetAdm(true);
        GetUser();
    }, []);

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const dropdown = dropdownRef.current;
            const button = buttonRef.current;
            if (
                dropdown && !dropdown.contains(event.target as Node) &&
                button && !button.contains(event.target as Node)
            ) {
                setDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function pegarFoto() {
        const foto = await fetch(`http://localhost:8080/api/usuario/foto/${localStorage.getItem('ID')}`,{
            method: 'GET',
            headers: {'authorization':'Bearer ' + localStorage.getItem('token')}
        })
        const fotoBlob = await foto.blob()
        setFotoPreview(URL.createObjectURL(fotoBlob))
    }

    useEffect(() => {
        pegarFoto()
    }, []);

    return (
        <header id={'header'}>
            <Link to="/" className={Styles.logoLink}>
                <img src={Logo} alt="Logo LocalTop" className={Styles.logo}/>
            </Link>
            <nav className={Styles.servicos}>
                <Link to="/" className={Styles.encontrar}>Encontrar <p>LocalTop</p></Link>
                <Link to="/">Divulgar Serviço</Link>
                <Link to="/#sobre">Sobre Nós</Link>
            </nav>
            {logged ? (
                <nav className={Styles.infos}>
                    <h3 id="nomeUsu">{nome ? nome.split(" ")[0] : "Nome de usuário"}</h3>
                    <div className={Styles.usuario}>
                        <button
                            ref={buttonRef} // <-- Aqui
                            className={Styles.dropdownUsuario}
                            id="BtnDropdown"
                            onClick={() => setDropdown(!Dropdown)}
                        >
                            <img src={fotoPreview || ImgDefault} alt="Minha Conta" className={Styles.conta}/>
                        </button>
                        <div
                            className={Styles.dropdownContent}
                            ref={dropdownRef}
                            style={Dropdown ? {display: "flex"} : {display: "none"}}
                        >
                            <Link to="/perfil">Meu Perfil</Link>
                            {adm && <Link to="/listaUsuarios">Usuários</Link>}
                            {adm && <Link to="/listaLojas">Estabelecimentos</Link>}
                            {adm && <Link to="/listaadmins">Admins</Link>}
                            <button id="logoutBtn" className={Styles.logout} onClick={async ()=>{
                                const result = await UserServices.logout();
                                if(!result) return;
                                navigate('/login')
                            }}>Sair</button>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className={Styles.infos} id="infos">
                    <Link to="/login" className={Styles.logar}>Login</Link>
                    <Link to="/cadastro" className={Styles.cadastrar}>Cadastrar-se</Link>
                </nav>
            )}
        </header>
    );
};

export default Menu;
