import './card.css'

function Card({ imagem, nome, descricao, preco }) {
    return (
        <div className="product-card">
            <div className="product-card-imagem">
                <img src={imagem} alt={nome} />
                <div className="product-card-overlay">
                    <p>{descricao}</p>
                </div>
            </div>
            <div className="product-card-info">
                <h3>{nome}</h3>
                <span className="product-card-preco">R$ {preco}</span>
            </div>
        </div>
    )
}

export default Card