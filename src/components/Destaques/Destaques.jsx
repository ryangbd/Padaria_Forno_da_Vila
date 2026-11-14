import "./destaque.css"
import Card from "./Card.jsx"
import paoFrancesImg from "../../assets/images/pao-frances.webp"
import croissantChocolateImg from "../../assets/images/croissant-de-chocolate-facil.webp"
import paoItalianoImg from "../../assets/images/pao-italiano.webp"
import sonhoImg from "../../assets/images/sonho.webp"
import boloCenouraImg from "../../assets/images/bolo-de-cenoura.webp"
import cafeEspecialImg from "../../assets/images/cafe.webp"
import produtos from "../../data/Produtos/Produtos.jsx"

const imagens = [paoFrancesImg, croissantChocolateImg, paoItalianoImg, sonhoImg, boloCenouraImg, cafeEspecialImg]
const descricoes = [
    "Crocante por fora e macio por dentro.",
    "Massa folhada leve e amanteigada.",
    "Fermentação lenta e sabor marcante.",
    "Massa fofinha com recheio cremoso.",
    "Receita caseira com cobertura de chocolate.",
    "Grãos selecionados e preparo na hora.",
]

function Destaques({ onAdicionar }) {
    return (
        <section className="box destaques">
            <div className="titlebox"><span>PRODUTOS EM DESTAQUE</span></div>
            <div className="card-section">
                {produtos.map((produto, index) => (
                    <Card
                        key={produto.id}
                        produto={produto}
                        imagem={imagens[index]}
                        descricao={descricoes[index]}
                        onAdicionar={onAdicionar}
                    />
                ))}
            </div>
        </section>
    )
}

export default Destaques
