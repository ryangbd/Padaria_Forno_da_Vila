import './card.css'

function Card({ produto, imagem, descricao, onAdicionar }) {
    return (
        <article className="product-card">
            <div className="product-card-imagem">
                <img src={imagem} alt={produto.nome} />
                <div className="product-card-overlay"><p>{descricao}</p></div>
            </div>
            <div className="product-card-info">
                <h3>{produto.nome}</h3>
                <div className="product-card-footer">
                    <span className="product-card-preco">
                        R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <button
                        className="carrinho"
                        type="button"
                        onClick={() => onAdicionar(produto)}
                        aria-label={`Adicionar ${produto.nome} ao carrinho`}
                        title="Adicionar ao carrinho"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M2 2h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L21 7H5M9 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default Card
