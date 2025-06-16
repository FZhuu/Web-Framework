import React from 'react';
import Logo from '../imgs/logo/SVG Variações/Branco/Vertical Branco.svg'
import Instagram from '../imgs/SVGs/Instagram.svg'
import Facebook from '../imgs/SVGs/Facebook.svg'
import Twitter from '../imgs/SVGs/X(Twitter).svg'
import Youtube from '../imgs/SVGs/Youtube.svg'

const Footer:React.FC = () => {
    return (
        <footer id={'footer'}>
            <div className="footer-top">
                <a href="/" className="linkLogo"><img src={Logo}
                                                      alt="Logo LocalTop" className="logo"/></a>
                <div className={"Caminhos"} style={{}}>
                    <div className="divisor">
                        <h3>Encontrar LocalTop</h3>
                        <nav>
                            <a href="/">Beleza & Bem Estar</a>
                            <a href="/">Pet</a>
                            <a href="/">Residencial</a>
                            <a href="/">Saúde</a>
                            <a href="/">Tecnologia</a>
                        </nav>
                    </div>
                    <div className="divisor">
                        <h3>Divulgar Serviço</h3>
                        <nav>
                            <a href={'/'}>Como Divulgar</a>
                            <a href={'cadastro'}>Cadastre-se</a>
                        </nav>
                    </div>
                    <div className="divisor">
                        <h3>Sobre Nós</h3>
                        <nav>
                            <a href="/#Header">Quem Somos</a>
                            <a href="/">O que fazemos</a>
                        </nav>
                    </div>
                </div>
                <div className="redesSociais">
                    <a href="/"><img src={Youtube} alt="Youtube"/></a>
                    <a href="/"><img src={Instagram} alt="Instagram"/></a>
                    <a href="/"><img src={Twitter} alt="X"/></a>
                    <a href="/"><img src={Facebook} alt="Facebook"/></a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 LocalTop. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer;