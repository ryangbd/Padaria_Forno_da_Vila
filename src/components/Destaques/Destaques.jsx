import "./destaque.css"
import Card from "./Card.jsx"
import paoFrancesImg from "../../assets/images/pao-frances.webp"
import croissantChocolateImg from "../../assets/images/croissant-de-chocolate-facil.webp"
import paoItalianoImg from "../../assets/images/pao-italiano.webp"
import sonhoImg from "../../assets/images/sonho.webp"
import boloCenouraImg from "../../assets/images/bolo-de-cenoura.webp"
import cafeEspecialImg from "../../assets/images/cafe.webp"


function Destaques(){
    return(
        <div className="box destaques">
            <div className="titlebox">
            <span>PRODUTOS EM DESTAQUE</span>
            </div>
            <div className="card-section">
                <Card
                    imagem={paoFrancesImg}
                    nome="Pão Francês"
                    descricao="Crocante por fora e macio por dentro."
                    preco="0,80"
                />
                <Card
                    imagem={croissantChocolateImg}
                    nome="Croissant Artesanal"
                    descricao="Massa folhada leve e amanteigada."
                    preco="6,50"
                />
                <Card
                    imagem={paoItalianoImg}
                    nome="Pão Italiano"
                    descricao="Fermentação lenta e sabor marcante."
                    preco="8,00"
                />
                <Card
                    imagem={sonhoImg}
                    nome="Sonho"
                    descricao="Massa fofinha com recheio cremoso."
                    preco="5,00"
                />
                <Card
                    imagem={boloCenouraImg}
                    nome="Bolo de Cenoura"
                    descricao="Receita caseira com cobertura de chocolate."
                    preco="7,50"
                />
                <Card
                    imagem={cafeEspecialImg}
                    nome="Café Especial"
                    descricao="Grãos selecionados e preparo na hora."
                    preco="5,00"
                />
            </div>
        </div>
    )
}

export default Destaques