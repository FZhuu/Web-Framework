import React from "react";
import UserIcon from "./Images/person-circle.svg";
import {BrowserRouter,Routes, Route, Link} from "react-router-dom";
import Login from "../controller/login";

const Menu: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary MenuNav" style={{ padding: "0" }}>
            <div className="container-fluid navdiv">
                <a className="navbar-brand" href="#">Renner</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <div className="dropdown">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-dark">
                            Login / Signin
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/cadastro">Cadastro</a></li>
                            <li><a className="dropdown-item" href="/login">Login</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Menu;
