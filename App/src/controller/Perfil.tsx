import React, { useState } from 'react';
import styles from '../styles/Perfil.module.css'
import PerfilDados from "./Modals/PerfilDados";
import LojaSVG from '../imgs/SVGs/Loja.svg'

const Perfil: React.FC = () => {
    const [nome,SetNome] = useState(null)
    return (
        <main>
            <aside>
                <div id="FotoNome" className={styles.FotoNome}>
                    <div className={styles.imgPerfil} id="imgPerfil">
                    </div>
                    <div className={styles.NomeEmail} id="NomeEmail">
                        <h4>${nome? nome:"nome do usuario"}</h4>
                        <h5>Email Usuário</h5>
                    </div>
                </div>
                <hr/>
                <div>
                    <div className={styles.opcoes}>
                        <label htmlFor="conta">
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25Z"
                                    stroke="#302163" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M12.1303 13C13.8203 13 15.1903 11.63 15.1903 9.94C15.1903 8.25001 13.8203 6.88 12.1303 6.88C10.4403 6.88 9.07031 8.25001 9.07031 9.94C9.07031 11.63 10.4403 13 12.1303 13Z"
                                    stroke="#302163" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M6.5 19.11C6.80719 17.8839 7.51529 16.7956 8.51178 16.0179C9.50827 15.2403 10.736 14.818 12 14.818C13.264 14.818 14.4917 15.2403 15.4882 16.0179C16.4847 16.7956 17.1928 17.8839 17.5 19.11"
                                    stroke="#302163" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </label>
                        <button type={'button'} id={'conta'} onClick={() => {console.log('alguma coisa')}}>MINHA CONTA</button>
                    </div>
                    <div className={styles.opcoes}>
                        <label htmlFor="trocarsenha">
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="Edit / Edit_Pencil_01">
                                    <path id="Vector"
                                          d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
                                          stroke="#FFFF" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </g>
                            </svg>
                        </label>
                        <button id="trocarsenha">TROCAR SENHA</button>
                    </div>
                </div>
                <hr/>
                <button type="button" id="AddEstabelecimento" className={styles.AddEstabelecimento} onClick={() => {console.log('alguma coisa')}}>
                    <img src={LojaSVG} alt="SvgLoja"/>+ADICIONAR LOCALTOP
                </button>
            </aside>
            <div className={styles.informacao} id="informacao">
                <PerfilDados/>
            </div>
        </main>
    );
}

export default Perfil