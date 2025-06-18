import React from 'react';
import Notebook from "../imgs/notebook.png";
import Agenda from "../imgs/agenda.png";
import Interacao from "../imgs/interaçao.jpg";

const MainIndex: React.FC = () => {
    return (<><section style={{backgroundColor:'#3BA06D',padding: "60px 20px",fontFamily:"Arial,sans-serif",color:"white",textAlign:"center"}}>
            <h1 style={{fontSize:"3.5rem",fontWeight:"bold",color:"#F5FF00",marginBottom:"2rem",textShadow:"10xp 10px 20px rgba(0,0,0,0.5"}}>TUDO O QUE VOCÊ PRECISA,NUM SÓ LUGAR</h1>
            <p style={{fontSize:"1.3rem",color:"#E0F0E9",maxWidth:"800px",margin:"0 auto 6dvi"}}>Descubra como a LocalTop transforma a forma de contratar e oferecer serviços, com agilidade, confiança e praticidade.</p>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5dvi", marginTop: "20px"}}>
                <div style={{background: "white", color: "#1a1a1a", borderRadius: "12px", width: "260px", padding: "20px"}}>
                    <img src={Notebook} alt="Ícone" style={{width: "100px",height: "100px",objectFit: "cover", borderRadius: "50%", marginTop: "-60px", border: "5px solid white"}}/>
                    <h3 style={{marginTop: "20px", color: "#2E186A"}}>ENCONTRE COM FACILIDADE</h3>
                    <p>Busque por serviços perto de você, com avaliações reais e filtros que ajudam na escolha certa.</p>
                </div>

                <div style={{background: "white", color: "#1a1a1a", borderRadius: "12px", width: "260px", padding: "20px"}}>
                    <img src={Agenda} alt="Ícone" style={{width: "100px",height: "100px",objectFit: "cover", borderRadius: "50%", marginTop: "-60px", border: "5px solid white"}}/>
                    <h3 style={{marginTop: "20px", color: "#2E186A"}}>AGENDE SEM COMPLICAÇÕES</h3>
                    <p>Escolha o horário ideal e confirme o seu serviço em poucos cliques.</p>
                </div>

                <div style={{background: "white", color: "#1a1a1a", borderRadius: "12px", width: "260px", padding: "20px"}}>
                    <img src={Interacao} alt="Ícone" style={{width: "100px",height: "100px",objectFit: "cover", borderRadius: "50%", marginTop: "-60px", border: "5px solid white"}}/>
                    <h3 style={{marginTop: "20px", color: "#2E186A"}}>QUALIDADE GARANTIDA</h3>
                    <p>Apenas prestadores bem avaliados e com suporte da nossa equipe.</p>
                </div>

            </div>
        </section>

            <section style={{background:"linear-gradient(#2E186A 60%,#513798 40%)", padding: "60px 20px", fontFamily: "Arial, sans-serif", color: "white", textAlign: "center",borderRadius: "3dvi 3dvi 0 0"}}>
                <h1 className="titulo-card">⭐ OS MAIS BEM AVALIADOS DA SEMANA ⭐</h1>

                <div className="cards-container">

                    <div className="card">
                        <div className="nome-servico">STUDIO BELLAHAIR</div>
                        <div className="categoria">Beleza & Bem Estar</div>
                        <div>Hidratação <br/>+ corte de cabelo longo</div>
                        <div className="local">📍 Batel - Curitiba</div>
                        <div className="stars">★★★★★</div>
                        <button className="btn">CONFIRA MAIS!</button>
                    </div>

                    <div className="card destaque">
                        <div className="recomendado">Super Recomendação!</div>
                        <div className="nome-servico">LIMPEZA & BRILHO</div>
                        <div className="categoria">Residencial</div>
                        <div>Limpeza <br/>e higienização de sofá.</div>
                        <div className="local">📍 Bacacheri - Curitiba</div>
                        <div className="stars">★★★★★</div>
                        <button className="btn">CONFIRA MAIS!</button>
                    </div>

                    <div className="card">
                        <div className="nome-servico">PETMIMOS</div>
                        <div className="categoria">Pets</div>
                        <div>Banho <br/>e Tosa de Animal de Pequeno Porte</div>
                        <div className="local">📍 Portão - Curitiba</div>
                        <div className="stars">★★★★★</div>
                        <button className="btn">CONFIRA MAIS!</button>
                    </div>

                    <div className="card">
                        <div className="nome-servico">TECHFIX EXPRESS</div>
                        <div className="categoria">Tecnologia</div>
                        <div>Avaliação <br/>e troca de peças para Notebook</div>
                        <div className="local">📍 Água Verde - Curitiba</div>
                        <div className="stars">★★★★★</div>
                        <button className="btn">CONFIRA MAIS!</button>
                    </div>

                    <div className="card">
                        <div className="nome-servico">CASA PRONTA SERVIÇOS</div>
                        <div className="categoria">Residencial</div>
                        <div>Troca <br/>de chuveiro elétrico</div>
                        <div className="local">📍 Bacacheri - Curitiba</div>
                        <div className="stars">★★★★★</div>
                        <button className="btn">CONFIRA MAIS!</button>
                    </div>

                </div>
            </section>

            <br/>
            <br/>

            <div className="container">
                <div className="feedbacks">
                    <div className="feedback-title">FEEDBACKS</div>

                    <div className="feedback-card">
                        <div className="user-name">JULIANA M. <span className="stars">★★★★★</span></div>
                        <div className="feedback-text">"Marquei um corte de cabelo e fui atendida na hora! Atendimento incrível, virei cliente fiel."</div>
                    </div>

                    <div className="feedback-card">
                        <div className="user-name">FELIPE A. CARVALHO <span className="stars">★★★★☆</span></div>
                        <div className="feedback-text">"O banho e tosa foi excelente! Meu cachorro voltou feliz e cheiroso. Muito cuidado e carinho."</div>
                    </div>

                    <div className="feedback-card">
                        <div className="user-name">RENATA C. FERNANDES <span className="stars">★★★★☆</span></div>
                        <div className="feedback-text">"Precisei de um técnico e encontrei pelo LocalTop. Agendamento fácil e o serviço foi nota 10!"</div>
                    </div>
                </div>

                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14629.386128610602!2d-49.274697!3d-25.428954!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce5cfdb6f9df3%3A0xf4e858b3bbfb6474!2sPra%C3%A7a%20Alfredo%20Andersen%2C%20Curitiba%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1715450000000"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy={"no-referrer-when-downgrade"}>
                    </iframe>
                </div>
            </div></>
    )
}

export default MainIndex;