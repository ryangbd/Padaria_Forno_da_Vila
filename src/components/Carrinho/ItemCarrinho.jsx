function ItemCarrinho({ carrinho, onExcluir }) {
    const itensAgrupados = Object.values(
        carrinho.reduce((acc, item) => {
            const id = item.produto.id
            if (!acc[id]) acc[id] = { produto: item.produto, quantidade: 0 }
            acc[id].quantidade += item.quantidade
            return acc
        }, {})
    )

    return (
        <>
            {itensAgrupados.map(item => (
                <div key={item.produto.id} className="item-carrinho">
                    <span>{item.produto.nome} x{item.quantidade}</span>
                    <span>R${(item.produto.preço * item.quantidade).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <button type="button" onClick={() => onExcluir(item.produto.id)}>Excluir</button>
                </div>
            ))}
        </>
    )
}

export default ItemCarrinho