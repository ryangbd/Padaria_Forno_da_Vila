import './hero.css'
import useScrollReveal from '../../hooks/useScrollReveal'
import bolinhoImg from "../../assets/images/Padaria-people.webp"
import downArrow from "../../assets/icons/down-arrow.svg";

function Hero(){
    const [ref, visivel] = useScrollReveal()
    return (
        <div ref={ref} className={`box scroll-reveal ${visivel ? 'is-visible' : ''}`}>
            <section className="left">
                <span className="hero-tag">Feito com carinho, todos os dias</span>

                <h1>Pães artesanais feitos diariamente para transformar cada café em um momento especial.</h1>

                <p className="hero-subtitle">
                    Do forno à sua mesa em poucas horas. Receitas simples,
                    ingredientes de verdade e aquele cheirinho que só padaria
                    de bairro tem.
                </p>

                <div className="hero-actions">
                    <a className="btn-cardapio" href="#cardapio">Ver cardápio <img src={downArrow} alt="" /></a>
                    <a className="btn-secundario" href="#nossa-historia">Conhecer nossa história</a>
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