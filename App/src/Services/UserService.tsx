import {UserModel} from "../Model/UserModel";
import Swal from "sweetalert2";

const login = async (email:string, senha:string) => {
    return await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Email: email,
            Senha: senha
        })
    });
}

const cadastro = async (usuario?:UserModel) => {
    const response = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    if (response.ok) {
        return await response.json();
    }
    throw new Error(
        'Erro ao fazer cadastro'
    )
}

const listar = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch
    ('http://localhost:3000/listar', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    if (response.ok) {
        return await response.json();
    }
}

const GetUser = async () => {
    const id = localStorage.getItem('ID');
    const token = localStorage.getItem('token');
    const response = await fetch
    (`http://localhost:8080/api/usuario/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    return await response.json();
}

const logout = async () => {
    let logout = false;
     await Swal.fire({
        title: "Deseja mesmo fazer logout?",
        icon: 'warning',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim',
        showCancelButton: true,
        showCloseButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            console.log("Usuário confirmou!");
            logout = true;
        } else {
            console.log("Usuário cancelou!");
            logout = false;
        }
    });
     return logout;
}

const UserServices = {
    login,
    cadastro,
    listar,
    GetUser,
    logout,
}

export default UserServices;