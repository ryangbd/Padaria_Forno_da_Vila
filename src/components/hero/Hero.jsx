import './hero.css'
import bolinhoImg from "../../assets/images/paozinhobolinho.webp"
import downArrow from "../../assets/icons/down-arrow.svg";

function Hero(){
    return (
        <div className="box">
            <section className="left">
            <span>Pães artesanais feitos diariamente para transformar cada café em um momento especial.</span>
            <button className="btn-cardapio">Ver cardápio <img src={downArrow}/></button>
            </section>
            <img src={bolinhoImg}/>
        </div>
    )
}
export default Hero