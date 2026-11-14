import './App.css'
import { useState } from 'react'
import Header from './components/header/Header.jsx'
import Hero from './components/hero/Hero.jsx'
import Destaques from './components/Destaques/Destaques.jsx'
import Sobre from "./components/Sobre/Sobre.jsx"
import Encomenda from './components/Encomenda/Encomenda.jsx'

function App(){
    const [carrinho, setCarrinho] = useState([])

    function adicionarAoCarrinho(produto, quantidade = 1) {
        const qtd = Math.floor(Number(quantidade))
        if (!produto || !Number.isFinite(qtd) || qtd < 1) return
        setCarrinho(itens => {
            const existente = itens.find(item => item.produto.id === produto.id)
            if (existente) return itens.map(item => item.produto.id === produto.id
                ? { ...item, quantidade: item.quantidade + qtd }
                : item)
            return [...itens, { produto, quantidade: qtd }]
        })
    }

    function alterarQuantidade(produtoId, quantidade) {
        const qtd = Math.floor(Number(quantidade))
        if (!Number.isFinite(qtd) || qtd < 1) return
        setCarrinho(itens => itens.map(item => item.produto.id === produtoId
            ? { ...item, quantidade: qtd }
            : item))
    }

    function excluirItem(produtoId) {
        setCarrinho(itens => itens.filter(item => item.produto.id !== produtoId))
    }

    return(
        <div className="app" >
            <Header/>
            <Hero/>
            <Destaques onAdicionar={adicionarAoCarrinho}/>
            <Sobre/>
            <Encomenda carrinho={carrinho} onAdicionar={adicionarAoCarrinho} onAlterarQuantidade={alterarQuantidade} onExcluir={excluirItem}/>
        </div>
    )
}

export default App
