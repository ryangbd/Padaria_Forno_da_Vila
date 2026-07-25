import "./sobre.css"
import padariaImg from "../../assets/images/Padaria-Img.webp"

function Sobre(){
    return(
        <div className="box boxsobre">
            <div className="sobre-container">
                <div className="sobre-imagem">
                    <img src={padariaImg} alt="Interior da padaria Forno da Vila" />
                </div>

                <div className="sobre-conteudo">
                    <span className="sobre-tag">Nossa História</span>
                    <h2>Tradição que vira sabor</h2>
                    <p>
                        Há mais de duas décadas, o <strong>Forno da Vila</strong> prepara
                        pães, doces e cafés com ingredientes selecionados e muito carinho.
                        Cada receita carrega a mesma paixão do primeiro dia — feita à mão,
                        assada no ponto certo e servida com um sorriso.
                    </p>

                    <ul className="sobre-lista">
                        <li>Ingredientes frescos e selecionados</li>
                        <li>Produção artesanal diária</li>
                        <li>Atendimento acolhedor e familiar</li>
                    </ul>

                    <button className="sobre-btn">Conheça nosso cardápio</button>
                </div>
            </div>
        </div>
    )
}
export default Sobre