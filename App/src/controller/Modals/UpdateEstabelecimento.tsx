import React from 'react';
import {Numeromask} from "../Numeromask";
import {cnpjmask} from "../cnpjmask";
import {cepMask} from "../cepmask";
import Delete from "../../imgs/SVGs/delete.svg"
import PrevImg from '../../imgs/SVGs/AnteriorSeta.svg'
import NextImg from '../../imgs/SVGs/ProximaSeta.svg'
import Pesquisar from '../../imgs/SVGs/pesquisar.svg'
import Swal from "sweetalert2";

const UpdateEstabelecimento: React.FC = () => {
    const [telefone, SetTelefone] = React.useState<string>('')
    const [cnpj, SetCNPJ] = React.useState<string>('')
    const [cep, SetCEP] = React.useState<string>('')
    const [estado, SetEstado] = React.useState<string>('')
    const [cidade, SetCidade] = React.useState<string>('')
    const [bairro, SetBairro] = React.useState<string>('')
    const [endereco, SetEndereco] = React.useState<string>('')

    function MascaraTelefone(input: string) {
        input = input.replace(/\D/g, "")
        if (input.length === 11) {
            const Telmasked = Numeromask(input)
            return SetTelefone(Telmasked)
        }
        SetTelefone(input)
    }
    function MascaraCnpj(input: string) {
        input = input.replace(/\D/g, "")
        if (input.length === 11) {
            const cnpjmasked = cnpjmask(input)
            return SetCNPJ(cnpjmasked)
        }
        SetCNPJ(input)
    }
    function MascaraCEP(input: string) {
        input = input.replace(/\D/g, "")
        if (input.length === 11) {
            const cepmasked = cepMask(input)
            return SetCEP(cepmasked)
        }
        SetCNPJ(input)
    }
    async function buscarCEP() {
        if (cep.length < 8) {
            Swal.fire({
                title:'CEP Inválido',
                text:'CEP não encontrado',
                icon:'error'
            })
            return
        }
        const Cep = cep.replace(/\D/g, '');

        const resposta = await fetch(`https://viacep.com.br/ws/${Cep}/json/`);
        const dados = await resposta.json();
        if (dados.erro) {
            Swal.fire({
                title:'CEP Inválido',
                text:'CEP não encontrado',
                icon:'error'
            })
            return;
        }
        console.log(await dados)
        SetEstado(dados.uf);
        SetCidade(dados.localidade);
        SetBairro(dados.bairro);
        SetEndereco(dados.logradouro);
    }
    return (
        <>
            <h1 id="nomeEstabelecimento">Nome do Estabelecimento</h1>
            <p id="cnpjEstabelecimento">CNPJ do estabelecimento</p>
            <hr className="horizontalRule"/>
            <form>
                <div className="UpperUpdtForm">
                    <div className="LeftUpdtForm">
                        <h5>Dados Cadastrais</h5>
                        <div className="UPDEmail">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" readOnly/>
                        </div>
                        <div className="TelCep">
                            <div className="UPDTelefone">
                                <label htmlFor="telefone">Número de Telefone</label>
                                <input type="text" id="telefone" name="telefone" value={telefone} maxLength={15}
                                       onInput={(e)=>{MascaraTelefone(e.currentTarget.value)}} onChange={(e)=>{MascaraTelefone(e.target.value)}}
                                       readOnly/>
                            </div>
                            <div className="UpdtCNPJ">
                                <label htmlFor="cnpj">CNPJ</label>
                                <input type="text" id="cnpj" name="cnpj" value={cnpj} maxLength={17} onInput={(e)=>{MascaraCnpj(e.currentTarget.value)}}
                                       onChange={(e)=>{MascaraCnpj(e.target.value)}}
                                       readOnly/>
                            </div>
                            <div className="UPDCep">
                                <label htmlFor="cep">CEP</label>
                                <input type="text" id="cep" name="cep" value={cep} onInput={(e)=>{MascaraCEP(e.currentTarget.value)}}
                                       onChange={(e)=>{MascaraCEP(e.target.value)}}
                                       readOnly/>
                                <button type="button"
                                        style={{display:"none", position: "absolute",border: "none",backgroundColor:" transparent",width: "1.6dvi",height: "1.6dvi",padding:"0", margin: "0 0.2dvi 0.2dvi 0"}}
                                        onClick={buscarCEP} id="searchCEP">
                                    <img src={Pesquisar} alt='Procurar CEP'
                                         style={{height: "100%", width: "100%"}}/>
                                </button>
                            </div>
                        </div>
                        <div className="EstadoCidadeBairro">
                            <div className="UpdtEstado">
                                <label htmlFor="estado">Estado</label>
                                <input type="text" id="estado" name="estado" readOnly/>
                            </div>
                            <div className="UpdtCidade">
                                <label htmlFor="cidade">Cidade</label>
                                <input type="text" id="cidade" name="cidade" readOnly/>
                            </div>
                            <div className="UpdtBairro">
                                <label htmlFor="bairro">Bairro</label>
                                <input type="text" id="bairro" name="bairro" readOnly/>
                            </div>
                        </div>
                        <div className="EnderecoNumero">
                            <div className="UpdtEndereco">
                                <label htmlFor="endereco">Endereço</label>
                                <input type="text" id="endereco" name="endereco" readOnly/>
                            </div>
                            <div className="UpdtNumero">
                                <label htmlFor="numero">Número</label>
                                <input type="text" id="numero" name="numero" readOnly/>
                            </div>
                        </div>
                        <div className="UpdtComplemento">
                            <label htmlFor="complemento">Complemento</label>
                            <input type="text" id="complemento" name="complemento" readOnly/>
                        </div>
                    </div>
                    <div className="RightUpdtForm">
                        <div className="InputFotoEstabele">
                            <div id="EstabelecimentoimgUpdt" className="EstabelecimentoUpdtImg">
                                <button className="UpdtprevImg" id="prevImg" type="button" onClick={()=>{}}>
                                    <img src={PrevImg} alt="imagem anterior"/>
                                </button>
                                {/*<img id="imgEstabele" src="https://placehold.co/300x400?text=Adicione+sua+foto" alt="Imagens do Estabelecimento">*/}
                                <button className="UpdtnextImg" id="nextImg" type="button" onClick={()=>{}}>
                                    <img src={NextImg} alt="proxima imagem"/>
                                </button>
                            </div>
                            <div className="IdentifierDelete">
                                <label htmlFor="fileEstabeleUpdt" id="addImg" style={{display: "none"}}>
                                    <svg width="30px" height="30px" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg" fill="none">
                                        <path fill="#3E996F" fill-rule="evenodd"
                                              d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
                                    </svg>
                                </label>
                                <div className="spans" id="spansUpdt">
                                    <p>Nenhuma imagem Adicionada</p>
                                </div>
                                <button type="button" className="deleteImgUpdt" id="deleteImgUpdt"
                                        onClick={()=>{}} style={{display: "none"}}><img
                                    src={Delete} alt="excluir imagem"/></button>
                            </div>
                            <input type="file" id="fileEstabeleUpdt" name="file" accept="image/*"
                                   onClick={()=>{}} style = {{display: "none"}} multiple/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="LowerUpdtForm">
                    <div className="lowerside-btns">
                        <button type="button" className="DeleteEstabelecimentoUpdt" id="DeleteEstabelecimentoUpdt"
                                onClick={()=>{}}>Excluir Estabelecimento
                        </button>
                        <div className="UpdtEstabeleBtn">
                            <button type="button" className="cancelUpdt" id="cancelUpdt"
                                    onClick={()=>{}}>Cancelar
                            </button>
                            <button type="button" className="SaveUpdt" id="SaveUpdt"
                                    onClick={()=>{}}>Salvar
                            </button>
                            <button type="button" className="ChangeCampos" id='changecampos'
                                    onClick={()=>{}}>Editar informações
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <hr/>
            <div className="LowerSide">
                <h4>Serviços</h4>
                <div className="middleLowerSide">
                    <div className="searchBar">
                        <label htmlFor="pesquisaServico">
                            <svg id="Camada_2" data-name="Camada 2" width="25px" height="25px"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.94 40">
                                <g id="Camada_1-2">
                                    <path className="cls-1"
                                          d="M39.37,36.68l-8.29-8.3c2.4-2.99,3.83-6.79,3.83-10.92C34.91,7.81,27.09,0,17.45,0S0,7.81,0,17.45s7.81,17.45,17.45,17.45c4.11,0,7.88-1.42,10.86-3.79l8.3,8.31c.38.38.88.57,1.38.57s1-.19,1.38-.57c.76-.76.76-1.99,0-2.75ZM17.45,31.16c-7.57,0-13.71-6.14-13.71-13.71S9.88,3.75,17.45,3.75s13.71,6.14,13.71,13.71-6.14,13.71-13.71,13.71Z"
                                          fill="#00000"
                                    />
                                </g>
                            </svg>
                        </label>
                        <input type="search" id="pesquisaServico" placeholder="Digite o Nome do serviço"/>
                    </div>
                    <div className="ControllerBtns">
                        <button type="button" className="addServico" id="addServico" onClick={()=>{}}>
                            <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                 fill="none">
                                <path fill="#3E996F" fill-rule="evenodd"
                                      d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm14 .069a1 1 0 01-1 1h-2.931V14a1 1 0 11-2 0v-2.931H6a1 1 0 110-2h3.069V6a1 1 0 112 0v3.069H14a1 1 0 011 1z"/>
                            </svg>
                        </button>
                        <button type="button" className="editServico" id="ToggleEditServico" onClick={()=>{}}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z"
                                    stroke="#3E996F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button type="button" className="deleteServico" id="toggleDeleteServico"
                                onClick={()=>{}}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11V17" stroke="#f12525" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M14 11V17" stroke="#f12525" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M4 7H20" stroke="#f12525" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                      stroke="#f12525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                      stroke="#f12525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="servicosEstabelecimento" id="servicosEstabelecimento">
                </div>
            </div>
        </>
    )
}