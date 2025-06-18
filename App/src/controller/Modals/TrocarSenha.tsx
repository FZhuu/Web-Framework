import React, {useState} from 'react';
import OlhoAberto from '../../imgs/SVGs/olho-aberto.svg'
import OlhoFechado from '../../imgs/SVGs/olho-fechado.svg'
import styles from '../../styles/Perfil.module.css';
import Swal from "sweetalert2";

 const TrocarSenha: React.FC = () => {
     const [mostrarAtual,setMostrarAtual] = useState(false)
     const [mostrarNova,setMostrarNova] = useState(false)
     const [mostrarConfirmar,setMostrarConfirmar] = useState(false)
     const [senhaAtual,setSenhaAtual] = useState('')
     const [novasenha,setNovasenha] = useState('')
     const [confirmarNovaSenha,setConfirmarNovaSenha] = useState('')

     function validarSenha() {
         let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{8,}$/;
         if (novasenha.length < 8 ) {
             Swal.fire({
                 title:'Senha fraca',
                 text:'A senha deve ter pelo menos 8 caracteres',
                 icon:'error',
                 didOpen: () => {
                     document.body.classList.remove('swal2-height-auto');
                     console.log('entrou')
                 }
             })
             return false;
         }
         if (!regex.test(novasenha)) {
             Swal.fire({
                 title:'Senha fraca',
                 text: 'A senha deve ter pelo menos uma letra maiúscula, uma letra minúscula. um número e um caracter especial',
                 icon: 'error',
                 didOpen: () => {
                     document.body.classList.remove('swal2-height-auto');
                     console.log('entrou')
                 }
             })
             return false;
         }
         if (novasenha !== confirmarNovaSenha) {
             Swal.fire({
                 title: 'Senhas diferentes',
                 text: 'o campo de senha e comfirmação de senha devem ser iguais',
                 icon: 'error',
                 didOpen: () => {
                     document.body.classList.remove('swal2-height-auto');
                     console.log('entrou')
                 }
             })
             return false;
         }
         return true;
     }

     async function mudarSenha() {
         if (senhaAtual === '' || novasenha === '' || confirmarNovaSenha === '') {
             Swal.fire({
                 title: 'Todos os campos devem ser preenchidos',
                 icon: 'warning',
                 confirmButtonColor: '#3E996F'
             })
             return
         }
         if(!validarSenha()) return;
         const response = await fetch(`http://localhost:8080/api/usuario/novasenha/${localStorage.getItem('ID')}`, {
             method:'PUT',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
                 SenhaAtual: senhaAtual,
                 SenhaNova: novasenha,
            })
         })
         if (response.status === 401) {
             const error = await response.json();
             Swal.fire({
                 title:error.mensagem,
                 icon: 'error',
                 confirmButtonColor: '#3E996F'
             })
             return;
         }
         if (response.ok) {
             Swal.fire({
                 title: 'Senha alterada com sucesso',
                 icon: 'success',
             })
             setSenhaAtual('')
             setNovasenha('')
             setConfirmarNovaSenha('')
             return;
         }
         console.log(response.status)
         Swal.fire({
             title: 'Erro ao alterar senha',
             icon: 'error',
             confirmButtonColor: '#3E996F'
         })

     }

    return (
        <>
            <h1>Trocar Senha</h1>
            <hr/>
            <form>
                <div className={styles.SenhaAtual}>
                    <label htmlFor="senhaAtual">Senha Atual</label>
                    <input type={mostrarAtual?'text':"password"} id="senhaAtual" name="senhaAtual" onChange={(e)=>{setSenhaAtual(e.target.value)}}/>
                    <div className={styles.DivOlho} onClick={()=>{setMostrarAtual(!mostrarAtual)}}>
                        <img src={mostrarAtual ? OlhoAberto : OlhoFechado} alt={mostrarAtual?"Olho Aberto":"Olho Fechado"} id="olho" className={styles.imgOlho}/>
                    </div>
                </div>
                <div className={styles.NovaSenha}>
                    <label htmlFor="novaSenha">Nova Senha</label>
                    <input type={mostrarNova?'text':"password"} id="novaSenha" name="novaSenha" onChange={(e)=>{setNovasenha(e.target.value)}}/>
                    <div className={styles.DivOlho} onClick={()=> {setMostrarNova(!mostrarNova)}}>
                        <img src={mostrarNova ? OlhoAberto : OlhoFechado} alt={mostrarNova?"Olho Aberto":"Olho fechado"} id="olho" className={styles.imgOlho}/>
                    </div>
                </div>
                <div className={styles.CheckNovaSenha}>
                    <label htmlFor="confirmarNovaSenha">Corfirmar Nova Senha</label>
                    <input type={mostrarConfirmar?'text':"password"} id="confirmarNovaSenha" name={'confirmarNovaSenha'} onChange={(e)=>{setConfirmarNovaSenha(e.target.value)}}/>
                    <div className={styles.DivOlho} onClick={()=> {setMostrarConfirmar(!mostrarConfirmar)}}>
                        <img src={mostrarConfirmar?OlhoAberto:OlhoFechado} alt={mostrarConfirmar?"Olho Aberto":"Olho fechado"} id="olho" className={styles.imgOlho}/>
                    </div>
                </div>
                <div id="btns" className={styles.btns}>
                    <button type="button" className={styles.BtnSalvar} onClick={mudarSenha}>Salvar</button>
                </div>
            </form>
        </>
    )
 }

 export default TrocarSenha;