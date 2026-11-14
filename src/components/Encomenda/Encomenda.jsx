import { useEffect, useState } from "react"
import "./Encomenda.css"
import produtos from "../../data/Produtos/Produtos.jsx"
import ItemCarrinho from "../Carrinho/ItemCarrinho.jsx"
import Modal from "../Modal.jsx"
import useScrollReveal from "../../hooks/useScrollReveal"

function dataLocalISO(data) {
    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, "0")
    const dia = String(data.getDate()).padStart(2, "0")
    return `${ano}-${mes}-${dia}`
}

function limitesRetirada() {
    const hoje = new Date()
    const limite = new Date(hoje.getFullYear(), hoje.getMonth() + 3, 1)
    const ultimoDia = new Date(limite.getFullYear(), limite.getMonth() + 1, 0).getDate()
    limite.setDate(Math.min(hoje.getDate(), ultimoDia))
    return { minimo: dataLocalISO(hoje), maximo: dataLocalISO(limite) }
}

function Encomenda({ usuario, carrinho, onAdicionar, onAlterarQuantidade, onExcluir, onFinalizar }) {
    const [form, setForm] = useState({ nome: "", telefone: "", produtoId: "", dataRetirada: "", obs: "" })
    const [quantidade, setQuantidade] = useState(1)
    const [mostrarCarrinho, setMostrarCarrinho] = useState(false)
    const [mensagem, setMensagem] = useState("")
    const [comprovante, setComprovante] = useState(null)
    const { minimo, maximo } = limitesRetirada()
    const [ref, visivel] = useScrollReveal()

    useEffect(() => {
        if (usuario) setForm(atual => ({ ...atual, nome: usuario }))
    }, [usuario])

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
        const limites = limitesRetirada()
        if (form.dataRetirada < limites.minimo || form.dataRetirada > limites.maximo) {
            setMensagem("Escolha uma data de retirada entre hoje e os próximos três meses.")
            return
        }
        if (carrinho.length === 0) {
            setMensagem("Adicione pelo menos um produto ao carrinho antes de continuar.")
            return
        }
        const pedido = onFinalizar({
            cliente: { nome: form.nome.trim(), telefone: form.telefone.trim() },
            dataRetirada: form.dataRetirada,
            observacoes: form.obs.trim(),
            itens: carrinho.map(({ produto, quantidade }) => ({
                produtoId: produto.id,
                nome: produto.nome,
                precoUnitario: produto.preco,
                quantidade,
                subtotal: Number((produto.preco * quantidade).toFixed(2)),
            })),
            total: Number(valorTotal.toFixed(2)),
            simulado: true,
        })

        if (pedido.erro) {
            setMensagem(pedido.erro)
            return
        }

        setComprovante(pedido)
        setMensagem("")
        setMostrarCarrinho(false)
        setForm({ nome: usuario || "", telefone: "", produtoId: "", dataRetirada: "", obs: "" })
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
                            <input type="date" id="date" name="dataRetirada" onChange={handleChange} value={form.dataRetirada} min={minimo} max={maximo} aria-describedby="prazo-retirada" required />
                            <small id="prazo-retirada">Escolha uma data entre hoje e os próximos três meses.</small>

                            <label htmlFor="obs">Observações</label>
                            <textarea id="obs" name="obs" value={form.obs} onChange={handleChange} rows="4" placeholder="Alguma orientação para o pedido?" />

                            {mensagem && <p className="mensagem-pedido" role="status">{mensagem}</p>}
                            <button type="submit">Finalizar pedido simulado</button>
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
                <Modal onClose={() => setMostrarCarrinho(false)} labelledBy="titulo-carrinho">
                    {fechar => <>
                        <div className="modal-carrinho-header">
                            <div><h2 id="titulo-carrinho">Seu carrinho</h2><p>{totalItens} {totalItens === 1 ? "item" : "itens"}</p></div>
                            <button type="button" onClick={fechar} aria-label="Fechar carrinho">×</button>
                        </div>
                        <ItemCarrinho carrinho={carrinho} onAlterarQuantidade={onAlterarQuantidade} onExcluir={onExcluir} />
                        {carrinho.length > 0 && <div className="rodape-carrinho"><span>Total</span><strong>R$ {valorTotalFormatado}</strong></div>}
                        <button className="btn-continuar-comprando" type="button" onClick={fechar}>Continuar escolhendo</button>
                    </>}
                </Modal>
            )}

            {comprovante && (
                <Modal onClose={() => setComprovante(null)} labelledBy="titulo-comprovante" className="comprovante">
                    {fechar => <>
                        <div className="comprovante-cabecalho">
                            <span className="comprovante-check" aria-hidden="true">✓</span>
                            <p>PEDIDO SIMULADO</p>
                            <h2 id="titulo-comprovante">Encomenda finalizada</h2>
                            <span>O pedido foi salvo neste navegador.</span>
                        </div>
                        <div className="comprovante-numero">
                            <span>Número do pedido</span>
                            <strong>{comprovante.id}</strong>
                        </div>
                        <div className="comprovante-dados">
                            <div><span>Cliente</span><strong>{comprovante.cliente.nome}</strong></div>
                            <div><span>Telefone</span><strong>{comprovante.cliente.telefone}</strong></div>
                            <div><span>Retirada</span><strong>{new Date(`${comprovante.dataRetirada}T00:00:00`).toLocaleDateString('pt-BR')}</strong></div>
                        </div>
                        <div className="comprovante-itens">
                            {comprovante.itens.map(item => (
                                <div key={item.produtoId}>
                                    <span>{item.quantidade} × {item.nome}</span>
                                    <strong>R$ {item.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                                </div>
                            ))}
                        </div>
                        {comprovante.observacoes && <p className="comprovante-obs"><strong>Observações:</strong> {comprovante.observacoes}</p>}
                        <div className="comprovante-total"><span>Total</span><strong>R$ {comprovante.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>
                        <button className="btn-continuar-comprando" type="button" onClick={fechar}>Fechar comprovante</button>
                    </>}
                </Modal>
            )}
        </section>
    )
}

export default Encomenda
