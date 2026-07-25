import './hero.css'
import bolinhoImg from "../../assets/images/Padaria-people.webp"
import downArrow from "../../assets/icons/down-arrow.svg";

function Hero(){
    return (
        <div className="box">
            <section className="left">
                <span className="hero-tag">Feito com carinho, todos os dias</span>

                <h1>Pães artesanais feitos diariamente para transformar cada café em um momento especial.</h1>

                <p className="hero-subtitle">
                    Do forno à sua mesa em poucas horas. Receitas simples,
                    ingredientes de verdade e aquele cheirinho que só padaria
                    de bairro tem.
                </p>

                <div className="hero-actions">
                    <button className="btn-cardapio">Ver cardápio <img src={downArrow} alt="" /></button>
                    <button className="btn-secundario">Conhecer nossa história</button>
                </div>

                <div className="hero-stats">
                    <div className="stat">
                        <strong>20+</strong>
                        <span>anos de tradição</span>
                    </div>
                    <div className="stat">
                        <strong>500+</strong>
                        <span>pães assados por dia</span>
                    </div>
                    <div className="stat">
                        <strong>4.9★</strong>
                        <span>avaliação dos clientes</span>
                    </div>
                </div>
            </section>

            <div className="right">
                <div className="hero-glow"></div>
                <img src={bolinhoImg} alt="Pão artesanal recém-assado" />
            </div>
        </div>
    )
}
export default Hero