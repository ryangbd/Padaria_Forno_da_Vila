import { useState } from "react"
import "./Encomenda.css"

const produtos = [
    {id:1,nome:"Pão Francês",preço:0.80},
    {id:2,nome:"Croissant Artesanal",preço:6.50},
    {id:3,nome:"Pão Italiano", preço:8.00},
    {id:4,nome:"Sonho",preço:5.00},
    {id:5,nome:"Bolo de Cenoura",preço:7.50},
    {id:6,nome:"Café Especial",preço:5.00}
]

function Encomenda(){
    const [form, setForm] = useState({ produtoId:""})
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }
    return(
        <div className="box encomendabox">
            <form className="formEncomenda">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" placeholder="Nome Completo"/>
                <label htmlFor="telefone">Telefone</label>
                <input type="number" id="telefone" name="telefone" placeholder="Nome Completo"/>
                <label htmlFor="produto">Produto</label>
                <select id="produto" name="produtoId" value={form.produtoId} onChange={handleChange}>
                    {produtos.map(p => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}

export default Encomenda