export interface UserModel {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    senha: string;
    role: string;
    dataNascimento: string |Date;
}