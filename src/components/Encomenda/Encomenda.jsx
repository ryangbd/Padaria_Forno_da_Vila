import { useState } from "react"
import "./Encomenda.css"

const produtos = [
    {id:1,nome:"Pão Francês",preço:0.80,qtd:null},
    {id:2,nome:"Croissant Artesanal",preço:6.50,qtd:null},
    {id:3,nome:"Pão Italiano", preço:8.00,qtd:null},
    {id:4,nome:"Sonho",preço:5.00,qtd:null},
    {id:5,nome:"Bolo de Cenoura",preço:7.50,qtd:null},
    {id:6,nome:"Café Especial",preço:5.00,qtd:null}
]

function Encomenda(){
    const [form, setForm] = useState({nome:"",telefone:"",produtoId:"",dataRetirada:""})
    const [quantidade, setQuantidade] = useState(1)
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }
    return(
        <div className="box encomendabox">
            <form className="formEncomenda">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" placeholder="Nome Completo"/>
                <label htmlFor="telefone">Telefone</label>
                <input type="number" id="telefone" name="telefone" placeholder="(00) 00000-0000"/>
                <label htmlFor="produto">Produto</label>
                <select id="produto" name="produtoId" value={form.produtoId} onChange={handleChange}>
                    {produtos.map(p => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                </select>
                <div className="seletor-quantidade">
                    <button type="button" onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-</button>
                        <span>{quantidade}</span>
                    <button type="button" onClick={() => setQuantidade(q => q + 1)}>+</button>
                </div>
                <label htmlFor="date">Data de retirada</label>
                <input type="date" id="date" name="dateId" onChange={handleChange} value={form.dateId} min={new Date().toISOString().split("T")[0]}></input>
                <label htmlFor="obs">Observações</label>
                <input type="text" id="obs" name="obsId"></input>
            </form>
        </div>
    )
}

export default Encomenda