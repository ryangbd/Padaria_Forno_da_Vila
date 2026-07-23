import './header.css'
import padariaImg from "../../assets/images/padaria.webp"

function Header(){
    return(
        <div className="Header">
            <h1>Forno da Vila</h1>
            <img src={padariaImg}/>
        </div>
    )
}

export default Header