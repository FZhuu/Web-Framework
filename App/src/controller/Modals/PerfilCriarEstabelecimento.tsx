import React from "react";
import SetaAnterior from '../../imgs/SVGs/AnteriorSeta.svg';
import SetaProxima from '../../imgs/SVGs/ProximaSeta.svg';
import Pesquisar from '../../imgs/SVGs/pesquisar.svg'
import Delete from '../../imgs/SVGs/delete.svg';
import styles from './Perfil.module.css';
const CriarEstabelecimento: React.FC = () => {
    return (
        <>
            <h1>Adicionar LocalTop</h1>
            <p>Crie um perfil para o seu negócio</p>
            <hr/>
            <form>
                <div className={styles.NomeEmailFotoEstabe}>
                    <div className={styles.NomeEmailEstabele}>
                        <div className={styles.nomeEstabele}>
                            <label htmlFor="nomeEstabele">Nome do Estabelecimento</label>
                            <input type="text" id="nomeEstabele" name="nome"/>
                        </div>
                        <div className={styles.emailEstabele}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email"/>
                        </div>
                        <div className={styles.TelefoneCnpj}>
                            <div className={styles.telefone}>
                                <label htmlFor="telefone">Número de Telefone</label>
                                <input type="text" id="telefone" name="telefone" maxLength={15}
                                       onInput={()=>{}}/>
                            </div>
                            <div className={styles.cnpj}>
                                <label htmlFor="cnpj">CNPJ</label>
                                <input type="text" id="cnpj" name="cnpj" maxLength={18} onInput={()=>{}}/>
                            </div>
                            <div className={styles.cep}>
                                <label htmlFor="cep">CEP</label>
                                <div
                                    style={{display: 'flex', flexDirection: 'row',justifyContent: 'end',alignItems: 'center'}}>
                                    <input type="text" id="cep" name="cep" maxLength={9} onInput={()=>{}}/>
                                    <button type="button"
                                            style={{position: 'absolute',border: 'none',backgroundColor: 'transparent',width: '2rem',height: '2rem'}}
                                            onClick={()=>{}}><img
                                        src={Pesquisar} style={{height: '100%', width: '100%'}} alt={'Pesquisar CEP'}/></button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.Endereco}>
                            <div className={styles.BairroCidadeEstado}>
                                <div className={styles.estado}>
                                    <label htmlFor="estado">Estado</label>
                                    <input type="text" id="estado" name="estado" disabled/>
                                </div>
                                <div className={styles.cidade}>
                                    <label htmlFor="cidade">Cidade</label>
                                    <input type="text" id="cidade" name="cidade" disabled/>
                                </div>
                                <div className={styles.bairro}>
                                    <label htmlFor="bairro">Bairro</label>
                                    <input type="text" id="bairro" name="bairro" disabled/>
                                </div>
                            </div>
                            <div className={styles.RuaNumero}>
                                <div className={styles.rua}>
                                    <label htmlFor="endereco">Endereco</label>
                                    <input type="text" id="endereco" name="rua" disabled/>
                                </div>
                                <div className={styles.numero}>
                                    <label htmlFor="numero">Número</label>
                                    <input type="text" id="numero" name="numero"/>
                                </div>
                            </div>
                            <div className={styles.complemento}>
                                <label htmlFor="complemento">Complemento</label>
                                <input type="text" id="complemento" name="complemento"/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.InputFotoEstabele}>
                        <div id="Estabelecimentoimg" className={styles.Estabelecimentoimg}>
                            <button className={styles.prevImg} id="prevImg" type="button" onClick={()=>{}}><img
                                src={SetaAnterior} alt="imagem anterior"/></button>
                            <button className={styles.nextImg} id="nextImg" type="button" onClick={()=>{}}><img
                                src={SetaProxima} alt="proxima imagem"/></button>
                        </div>
                        <div className={styles.IdentifierDelete}>
                            <p id="indexFoto">Nenhuma Foto Adicionada</p>
                            <button type="button" className={styles.deleteImg} id="deleteImg" onClick={()=>{}}><img
                                src={Delete} alt="excluir imagem"/></button>
                        </div>
                        <label htmlFor="fileEstabele">
                            Adicionar Foto
                        </label>
                        <input type="file" id="fileEstabele" name="file" accept="image/*" onChange={()=>{}}
                               style={{display: 'none'}} multiple/>
                    </div>
                </div>
                <div id="btns" className={styles.btnEstabelecimento}>
                    <button type="button" className="criarEstabelecimento" onClick={() => {}}>Criar</button>
                </div>
            </form>
        </>
    )
}

export default CriarEstabelecimento;