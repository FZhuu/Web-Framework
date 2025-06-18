import React, {useEffect, useState} from 'react';
import styles from '../styles/Perfil.module.css'
import PerfilDados from "./Modals/PerfilDados";
import TrocarSenha from "./Modals/TrocarSenha";
import CriarEstabelecimento from "./Modals/PerfilCriarEstabelecimento";
import LojaSVG from '../imgs/SVGs/Loja.svg'
import UserServices from "../Services/UserService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import ImgDefault from "../imgs/SVGs/perfil.svg";
import {usePerfil} from "../context/PerfilContext";
import {useNome} from "../context/NomeContext";

const Perfil: React.FC = () => {
    const navigate = useNavigate()
    const {nome,setNome} = useNome()
    const [email,setemail] = useState("")
    const [componente,setComponente] = useState<number>(1)
    const { fotoPreview, setFotoPreview } = usePerfil();
    useEffect(() => {
        // Função para checar token e redirecionar se não existir
        function checarToken() {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                Swal.fire({
                    title: 'Acesso negado',
                    icon: 'error',
                })
            }
        }

        // Checa token na inicialização da página
        checarToken();

        // Adiciona listener para checar token quando o mouse se mover
        window.addEventListener('mousemove', checarToken);

        // Faz a requisição para pegar o usuário
        UserServices.GetUser().then(result => {
            if (result.error) {
                navigate('/login');
                return;
            }
            setNome(result.Nome);
            setemail(result.Email);
        });

        // Checa se usuário está marcado como "Logged"
        const logged = localStorage.getItem('Logged');
        if (!logged) {
            navigate('/login');
        }

        // Cleanup do event listener
        return () => {
            window.removeEventListener('mousemove', checarToken);
        };
    }, [navigate]);

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
    <main>
        <aside className={styles.Aside}>
            <div id="FotoNome" className={styles.FotoNome}>
                <img className={styles.imgPerfil} src={fotoPreview || ImgDefault} alt={"imagem de Perfil"}
                     id="imgPerfil"/>
                <div className={styles.NomeEmail} id="NomeEmail">
                    <h4>{nome ? nome.length > 13 ? nome.split(" ")[0] : nome : "nome do usuario"}</h4>
                    <h5>{email ? email : "Email Usuário"}</h5>
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
                    <button type={'button'} id={'conta'} onClick={() => {
                        setComponente(1)
                    }}>MINHA CONTA
                    </button>
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
                    <button id="trocarsenha" onClick={() => {
                        setComponente(2)
                    }}>TROCAR SENHA
                    </button>
                </div>
            </div>
            <hr/>
            <button type="button" id="AddEstabelecimento" className={styles.AddEstabelecimento} onClick={() => {
                setComponente(3)
            }}>
                <img src={LojaSVG} alt="SvgLoja"/>+ADICIONAR LOCALTOP
            </button>
            <div className={styles.estabelecimentos} id="estabelecimentos">
                <button type="button" className={styles.estabelecimento}><img src={LojaSVG}
                                                                       alt="Adicionar Estabelecimento"/> NOME
                    ESTABELECIMENTO
                </button>
                <button type="button" className={styles.estabelecimento} onClick={()=> {}}>
                    <svg width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Icon-Set" transform="translate(-360.000000, -723.000000)" fill="#3E996F">
                                <path
                                    d="M362.04,733 L366.699,725 L385.271,725 L390.029,733 L362.04,733 L362.04,733 Z M390,737 C389.985,738.381 388.394,739.001 387,739 C385.393,738.999 383.945,738.026 383.945,737 L383,737 C383,738.009 381.209,739 379.667,739 C378.188,739 376.468,737.978 376.468,737 L375.499,737 C375.499,738.009 373.749,739 372.271,739 C370.729,739 368.969,738.29 368.969,737 L368.022,737 C368.022,738.006 366.478,739.031 364.995,739.031 C363.491,739.031 362,738.381 362,737 L362,735 L390,735 L390,737 L390,737 Z M389,747 L363.003,747 L363,741 L364.964,741 C366.038,741 367.741,740.042 368.462,738.576 C369.271,740.001 370.781,741 372.223,741 C373.746,741 375.423,740.094 375.983,738.784 C376.544,740.063 378.186,741 379.678,741 C381.158,741 382.691,739.912 383.467,738.426 C384.374,739.926 385.106,741 387,741 C387.293,741 388.744,741.048 389,741 L389,747 L389,747 Z M389,751 C389,752.104 387.95,753 386.811,753 L365.156,753 C364.017,753 363.003,752.104 363.003,751 L363.003,749 L389,749 L389,751 L389,751 Z M386.154,723 L365.813,723 L360,733 L360,737 C360,738.065 360.383,739.229 361.001,740 L361.031,751 C361.031,753.209 362.878,755 365.156,755 L386.811,755 C389.089,755 391,753.209 391,751 L391,740 C391.7,739.176 392,738.33 392,737 L392,733 L386.154,723 L386.154,723 Z"
                                    id="shop">
                                </path>
                            </g>
                        </g>
                    </svg>
                    Barbearia
                </button>
            </div>
        </aside>
        <div className={styles.informacao} id="informacao">
            {componente === 1 && <PerfilDados/>}
            {componente === 2 && <TrocarSenha/>}
            {componente === 3 && <CriarEstabelecimento/>}
        </div>
    </main>
    );
}

export default Perfil