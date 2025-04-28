import React from 'react';

const Login: React.FC = () => {
    return (
        <div className='container'>
            <aside>
                <a></a>
                <img src="" alt="" />
            </aside>
            <div>
                <h1>login</h1>
                <form>
                    <input type="text" placeholder='email' />
                    <input type="password" placeholder='senha' />
                    <button type='button'>Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;