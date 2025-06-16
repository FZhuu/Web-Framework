import React from 'react';
import {UserModel} from "../Model/UserModel";

const login = async (email:string, senha:string) => {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    if (response.ok) {
        return await response.json();

    }
    throw new Error(
        'Erro ao fazer login'
    )
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
            'token' : `Bearer ${token}`
        }
    })
    if (response.ok) {
        return await response.json();
    }
}