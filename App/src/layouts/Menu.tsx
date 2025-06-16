import React from "react";
import UserIcon from "../imgs/SVGs/perfil.svg";
import Logo from '../imgs/logo/SVG Variações/Branco/Horizontal-Branco-changed.svg'

const Menu: React.FC = () => {
    const [Dropdown, setDropdown] = React.useState<boolean>(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    return (
        <header id={'header'}>
            <a href="/" className="logoLink">
                <img src={Logo} alt="Logo LocalTop"
                     className="logo"/>
            </a>
            <nav className="servicos">
                <a href="/" className="encontrar">Encontrar <p>LocalTop</p></a>
                <a href="/">Divulgar Serviço</a>
                <a href="/#sobre">Sobre Nós</a>
            </nav>
            <nav className="infos">
                <h3 id="nomeUsu">Nome de usuario </h3>
                <div className="usuario">
                    <button className="dropdownUsuario" id="BtnDropdown" onClick={()=> {setDropdown(!Dropdown)}}>
                        <img src={UserIcon} alt="Minha Conta" className="ImgUsuario"/>
                    </button>
                    <div className="dropdown-content" ref={dropdownRef} style={Dropdown ? {display: "flex"} : {display: "none"} }>
                        <a href="/perfil">Meu Perfil</a>
                        <a href={'/login'} id="logoutBtn">Sair</a>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default Menu;
