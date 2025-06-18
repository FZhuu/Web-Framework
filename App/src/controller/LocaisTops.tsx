import React from 'react';
import Banner from '../imgs/bannerpesquisa.webp'

const LocaisTops: React.FC = () => {
    return (
        <>
            <br/>
            <div className="container-fluid" style={{display: "flex", justifyContent: "center"}}>
                <img src={Banner} alt={"Banner"} style={{height: "100%", width: "100%"}}/>
            </div>
            <br/>
            <br/>
            <div style={{display: "flex", marginLeft: "2dvi"}}>
                <div>
                    <h3 style={{color: "#302163"}}> FILTRO DE OPÇÕES </h3>
                    <hr/>
                    <h4 style={{color: "#3BA06D"}}> CATEGORIAS </h4>
                    <input type="checkbox" name="categoria" value="1"/> BELEZA & BEM ESTAR
                    <br/>
                    <input type="checkbox" name="categoria" value="2"/> PET
                    <br/>
                    <input type="checkbox" name="categoria" value="3"/> RESIDENCIAL
                    <br/>
                    <input type="checkbox" name="categoria" value="4"/> LIMPEZA
                    <br/>
                    <input type="checkbox" name="categoria" value="5"/> TECNOLOGIA
                    <hr/>
                    <h4 style={{color: "#3BA06D"}}> CIDADE </h4>
                    <input list="cidades" id="cidades-choice" name="cidades-choice"
                           style={{width: "10dvi", height: "1.2dvi", borderRadius: "1dvi", border:"2px solid #3BA06D"}}/>

                    <datalist id="cidades">
                        <option value="Araucaria"></option>
                        <option value="Curitiba"></option>
                        <option value="Dois Vizinhos"></option>
                        <option value="Ponta Grossa"></option>
                        <option value="Londrina"></option>
                    </datalist>
                    <hr/>
                    <h4 style={{color: "#3BA06D"}}> AVALIAÇÃO </h4>
                    <input type="radio" name="avaliacao" value="5"/> 5 ⭐
                    <br/>
                    <input type="radio" name="avaliacao" value="4"/> 4 ⭐
                    <br/>
                    <input type="radio" name="avaliacao" value="3"/> 3 ⭐
                    <br/>
                    <input type="radio" name="avaliacao" value="2"/> 2 ⭐
                    <br/>
                    <input type="radio" name="avaliacao" value="1"/> 1 ⭐
                </div>
                <div style={{width: "1px", backgroundColor: "black", marginLeft: "2dvi"}}>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "30px"}}
                     className="container-fluid">
                    <div style={{paddingBottom: "2dvi", display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <div>
                            <button id="btnAplicarFiltros" style={{borderRadius: "20px"}}
                                    onClick={()=>{}}> Aplicar filtros
                            </button>
                            <button id="btnLimparFiltros" style={{borderRadius: "20px"}}> Limpar filtros</button>
                        </div>
                        <input type="search" id="inputSearch"
                               placeholder="Procurando por um estabelecimento especifico?"
                               style={{borderRadius: "20px", width: "25dvi", height: "1.6dvi", paddingLeft: "10px"}}/>

                        <select id="ordem-choice" name="ordem-choice"
                                style={{borderRadius: "20px", width: "7dvi", height: "1.6dvi", paddingLeft: "10px", color: "black"}}>
                            <option value="Ordem"> Ordem</option>
                            <option value="↓ Preço">↓ Preço</option>
                            <option value="↑ Preço">↑ Preço</option>
                            <option value="↓ Avaliação">↓ Avaliação</option>
                            <option value="↑ Avaliação">↑ Avaliação</option>
                        </select>

                    </div>
                    <div className="grade-produtos" id="grade-produtos">

                    </div>
                </div>
            </div>
            <br/>
            <br/>
        </>
    )
}