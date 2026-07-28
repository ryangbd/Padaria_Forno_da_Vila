import "./Encomenda.css"

function Encomenda(){
    return(
        <div className="box encomendabox">
            <form className="formEncomenda">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" placeholder="Nome Completo"/>
                <label htmlFor="telefone">Telefone</label>
                <input type="number" id="telefone" name="telefone" placeholder="Nome Completo"/>
                <label htmlFor="produto">Produto</label>
                <select id="produto" name="produto" value={form.produtoId} onChange={handleChange}>
                    {produtos.map(p => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}

export default Encomenda