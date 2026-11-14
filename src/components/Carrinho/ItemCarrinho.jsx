import '../Carrinho/ItemCarrinho.css'

function ItemCarrinho({ carrinho, onAlterarQuantidade, onExcluir }) {
    if (carrinho.length === 0) {
        return <p className="carrinho-vazio">Seu carrinho está vazio.</p>
    }

    return (
        <div className="lista-carrinho">
            {carrinho.map(({ produto, quantidade }) => (
                <article key={produto.id} className="item-carrinho">
                    <div className="item-carrinho-info">
                        <strong>{produto.nome}</strong>
                        <span>R$ {(produto.preco * quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <small>R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cada</small>
                    </div>
                    <div className="item-carrinho-acoes">
                        <div className="controle-quantidade" aria-label={`Quantidade de ${produto.nome}`}>
                            <button type="button" disabled={quantidade <= 1} onClick={() => onAlterarQuantidade(produto.id, quantidade - 1)} aria-label={`Diminuir ${produto.nome}`}>−</button>
                            <span>{quantidade}</span>
                            <button type="button" onClick={() => onAlterarQuantidade(produto.id, quantidade + 1)} aria-label={`Aumentar ${produto.nome}`}>+</button>
                        </div>
                        <button className="btn-remover-item" type="button" onClick={() => onExcluir(produto.id)}>Remover</button>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default ItemCarrinho
