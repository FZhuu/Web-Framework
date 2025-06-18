import React from 'react';
import Img1 from './Images/ImgCarrossel1.png'
import Img2 from './Images/ImgCarrossel2.png'
import Img3 from './Images/ImgCarrossel3.png'

const Slider = () => {
    return (
        <div style={{height: "45dvi", display: "flex", justifyContent: "center", alignItems: "center",backgroundColor:"#F7EFE6", borderRadius: "0 0 3dvi 3dvi"}}>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src={Img1} className="d-block w-100" alt="pessoas"/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={Img2} className="d-block w-100" alt="cachorro"/>
                    </div>
                    <div className="carousel-item">
                        <img src={Img3} className="d-block w-100" alt="tecnologia"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Próximo</span>
                </button>
            </div>
        </div>
    );
};

export default Slider;




