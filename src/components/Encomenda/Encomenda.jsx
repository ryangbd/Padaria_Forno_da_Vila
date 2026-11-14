import { useState } from "react"
import "./Encomenda.css"
import produtos from "../../data/Produtos/Produtos.jsx"
import ItemCarrinho from "../Carrinho/ItemCarrinho.jsx"

function dataLocalISO() {
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, "0")
    const dia = String(hoje.getDate()).padStart(2, "0")
    return `${ano}-${mes}-${dia}`
}

function Encomenda({ carrinho, onAdicionar, onAlterarQuantidade, onExcluir }) {
    const [form, setForm] = useState({ nome: "", telefone: "", produtoId: "", dataRetirada: "", obs: "" })
    const [quantidade, setQuantidade] = useState(1)
    const [mostrarCarrinho, setMostrarCarrinho] = useState(false)
    const [mensagem, setMensagem] = useState("")

    const valorTotal = carrinho.reduce((total, item) => total + item.produto.preco * item.quantidade, 0)
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0)
    const valorTotalFormatado = valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const resumoProdutos = carrinho.length
        ? carrinho.map(item => `${item.produto.nome} (${item.quantidade})`).join(", ")
        : "---"

    function handleChange(event) {
        setForm(atual => ({ ...atual, [event.target.name]: event.target.value }))
        setMensagem("")
    }

    function adicionarProduto() {
        const produto = produtos.find(item => item.id === Number(form.produtoId))
        if (!produto) {
            setMensagem("Selecione um produto antes de adicionar.")
            return
        }
        onAdicionar(produto, quantidade)
        setMensagem(`${produto.nome} adicionado ao carrinho.`)
        setForm(atual => ({ ...atual, produtoId: "" }))
        setQuantidade(1)
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (carrinho.length === 0) {
            setMensagem("Adicione pelo menos um produto ao carrinho antes de continuar.")
            return
        }
        setMensagem("Pedido revisado. Esta página ainda não envia a encomenda para a padaria.")
    }

    return (
        <section className="encomenda-page" id="encomenda">
            <div className="encomenda-content">
                <h1>Faça seu pedido</h1>
                <p className="subtitulo">Preencha os dados e confira os produtos na comanda.</p>
                <div className="ajuste">
                    <div className="box encomendabox">
                        <form className="formEncomenda" onSubmit={handleSubmit}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" autoComplete="name" required />

                            <label htmlFor="telefone">Telefone</label>
                            <input type="tel" id="telefone" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(11) 99999-9999" autoComplete="tel" required />

                            <div className="linha-produto-qtd">
                                <div className="campo-produto">
                                    <label htmlFor="produto">Produto</label>
                                    <select id="produto" name="produtoId" value={form.produtoId} onChange={handleChange}>
                                        <option value="">Selecione...</option>
                                        {produtos.map(produto => <option key={produto.id} value={produto.id}>{produto.nome}</option>)}
                                    </select>
                                </div>
                                <div className="campo-qtd">
                                    <label htmlFor="quantidade">Qtd.</label>
                                    <input id="quantidade" type="number" min="1" step="1" value={quantidade} onChange={event => setQuantidade(Math.max(1, Number(event.target.value) || 1))} />
                                </div>
                                <button className="btn-add-carrinho" type="button" onClick={adicionarProduto}>Adicionar</button>
                            </div>

                            <label htmlFor="date">Data de retirada</label>
                            <input type="date" id="date" name="dataRetirada" onChange={handleChange} value={form.dataRetirada} min={dataLocalISO()} required />

                            <label htmlFor="obs">Observações</label>
                            <textarea id="obs" name="obs" value={form.obs} onChange={handleChange} rows="4" placeholder="Alguma orientação para o pedido?" />

                            {mensagem && <p className="mensagem-pedido" role="status">{mensagem}</p>}
                            <button type="submit">Revisar pedido</button>
                        </form>
                    </div>

                    <aside className="comanda" aria-label="Resumo do pedido">
                        <span className="selo">Forno da Vila</span>
                        <span className="titulo-comanda">COMANDA</span>
                        <div className="comandainfo">
                            <div className="linha-comanda"><p>Cliente</p><span>{form.nome || "---"}</span></div>
                            <div className="linha-comanda produtos-linha">
                                <p>Produtos</p>
                                <button type="button" className="btn-visualizar-carrinho" onClick={() => setMostrarCarrinho(true)}>
                                    Ver carrinho ({totalItens})
                                </button>
                            </div>
                            <p className="resumo-produtos">{resumoProdutos}</p>
                            <div className="linha-comanda"><p>Retirada</p><span>{form.dataRetirada || "---"}</span></div>
                            <div className="barrinha" />
                            <div className="linha-comanda total"><span>Total</span><span>R$ {valorTotalFormatado}</span></div>
                        </div>
                    </aside>
                </div>
            </div>

            {mostrarCarrinho && (
                <div className="overlay-carrinho" onClick={() => setMostrarCarrinho(false)}>
                    <section className="modal-carrinho" role="dialog" aria-modal="true" aria-labelledby="titulo-carrinho" onClick={event => event.stopPropagation()}>
                        <div className="modal-carrinho-header">
                            <div><h2 id="titulo-carrinho">Seu carrinho</h2><p>{totalItens} {totalItens === 1 ? "item" : "itens"}</p></div>
                            <button type="button" onClick={() => setMostrarCarrinho(false)} aria-label="Fechar carrinho">×</button>
                        </div>
                        <ItemCarrinho carrinho={carrinho} onAlterarQuantidade={onAlterarQuantidade} onExcluir={onExcluir} />
                        {carrinho.length > 0 && <div className="rodape-carrinho"><span>Total</span><strong>R$ {valorTotalFormatado}</strong></div>}
                        <button className="btn-continuar-comprando" type="button" onClick={() => setMostrarCarrinho(false)}>Continuar escolhendo</button>
                    </section>
                </div>
            )}
        </section>
    )
}

export default Encomenda
