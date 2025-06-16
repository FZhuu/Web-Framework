import React from 'react';
import styles from '../../styles/Perfil.module.css';

const PerfilDados: React.FC = () => {
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
                            <input type="text" id="nome" name="nome" readOnly/>
                        </div>
                        <div className={styles.email}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" readOnly/>
                        </div>
                    </div>
                    <div className={styles.InputFoto}>
                        <label htmlFor="file">
                            <div id="Perfilimg" className={styles.Perfilimg}></div>
                            <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}} id="svgFoto">
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
                        <input type="file" id="file" name="file" accept="image/*" onChange={() => {console.log('alguma coisa')}}
                               style={{display: 'none'}} disabled/>
                    </div>
                </div>
                <div className={styles.DtnascCpf}>
                    <div className={styles.datanasc}>
                        <label htmlFor="datanasc">Data de nascimento</label>
                        <input type="date" id="datanasc" name="datanasc" readOnly/>
                    </div>
                    <div className={styles.cpf}>
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" name="cpf" maxLength={14} onInput={() => { console.log('alguma coisa')}}
                               readOnly/>
                    </div>
                </div>
                <div id="btns" className={styles.btns}>
                    <button type="button" className={styles.mudarcampos} onClick={() => { console.log('alguma coisa')}}>Mudar informações</button>
                </div>
            </form>
        </>
    )
}

export default PerfilDados;