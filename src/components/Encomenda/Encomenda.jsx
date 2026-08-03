import { useState } from "react"
import "./Encomenda.css"
import produtos from "../../data/Produtos/Produtos.jsx"
function Encomenda(){
    const [form, setForm] = useState({nome:"", telefone:"", produtoId:"", dataRetirada:"", obs:""})
    const [quantidade, setQuantidade] = useState(1)
    const [carrinho, setCarrinho] = useState([])
    
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }
    function adicionarAoCarrinho(){
        const produto = produtos.find(p => p.id === Number(form.produtoId))
        const novoItem = {produto, quantidade}
        setCarrinho([...carrinho, novoItem])
    }

    return(
        <div className="encomenda-page">

            <div className="encomenda-content">
            <h1>Faça seu pedido</h1>
            <p className="subtitulo">Preencha os dados abaixo e a gente confirma direitinho com você.</p>
            <div className="ajuste">

                <div className="box encomendabox">
                    <form className="formEncomenda">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome Completo"/>

                        <label htmlFor="telefone">Telefone</label>
                        <input type="number" id="telefone" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000"/>

                        <div className="linha-produto-qtd">
                            <div className="campo-produto">
                                <label htmlFor="produto">Produto</label>
                                <select id="produto" name="produtoId" value={form.produtoId} onChange={handleChange}>
                                    <option value="">Selecione...</option>
                                    {produtos.map(p => (
                                        <option key={p.id} value={p.id}>{p.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="campo-qtd">
                                <label>Qtd.</label>
                                <input type="number" min="0" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}/>
                                <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao carrinho</button>
                            </div>
                        </div>


                        <label htmlFor="date">Data de retirada</label>
                        <input type="date" id="date" name="dataRetirada" onChange={handleChange} value={form.dataRetirada} min={new Date().toISOString().split("T")[0]}/>

                        <label htmlFor="obs">Observações</label>
                        <textarea id="obs" name="obs" value={form.obs} onChange={handleChange} rows="4"/>

                        <button type="submit">Enviar encomenda</button>
                    </form>
                </div>

                <div className="comanda">
                    <span className="selo">Forno da Vila</span>
                    <span className="titulo-comanda">COMANDA</span>
                    <div className="comandainfo">
                        <div className="linha-comanda"><p>Cliente</p>{form.nome || "---"}</div>
                        <div className="linha-comanda"><p>Produto</p><p></p></div>
                        <div className="linha-comanda"><p>Quantidade</p>{form.valor || "---"}</div>
                        <div className="linha-comanda"><p>Retirada</p><p>{form.dataRetirada || "---"}</p></div>
                        <div className="barrinha"></div>
                        <div className="linha-comanda total">
                            <span>Total</span>
                            <span>R$</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                                    </div>
    )
}

export default Encomenda

//only place to hide 