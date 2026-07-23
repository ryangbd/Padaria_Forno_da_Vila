import './hero.css'
import bolinhoImg from "../../assets/images/paozinhobolinho.webp"

function Hero(){
    return (
        <div className="box">
            <span>Pães artesanais feitos diariamente para transformar cada café em um momento especial.</span>
            <img src={bolinhoImg}/>
        </div>
    )
}
export default Hero