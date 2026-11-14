import './App.css'
import { useEffect, useRef, useState } from 'react'
import Header from './components/header/Header.jsx'
import Hero from './components/hero/Hero.jsx'
import Destaques from './components/Destaques/Destaques.jsx'
import Sobre from "./components/Sobre/Sobre.jsx"
import Encomenda from './components/Encomenda/Encomenda.jsx'

function App(){
    const [carrinho, setCarrinho] = useState([])
    const [adicao, setAdicao] = useState(null)
    const sequenciaAdicao = useRef(0)

    useEffect(() => {
        if (!adicao) return
        const temporizador = window.setTimeout(() => setAdicao(null), 2800)
        return () => window.clearTimeout(temporizador)
    }, [adicao])

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
        sequenciaAdicao.current += 1
        setAdicao({ id: sequenciaAdicao.current, nome: produto.nome, quantidade: qtd })
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

    function finalizarPedido(dadosPedido) {
        const pedido = {
            ...dadosPedido,
            id: `FV-${Date.now().toString(36).toUpperCase()}`,
            criadoEm: new Date().toISOString(),
        }

        try {
            const pedidosSalvos = JSON.parse(localStorage.getItem('forno-da-vila-pedidos') || '[]')
            const pedidos = Array.isArray(pedidosSalvos) ? pedidosSalvos : []
            localStorage.setItem('forno-da-vila-pedidos', JSON.stringify([...pedidos, pedido]))
        } catch {
            return { erro: 'Não foi possível salvar o pedido neste navegador. Confira o espaço disponível e tente novamente.' }
        }

        setCarrinho([])
        return pedido
    }

    return(
        <div className="app" >
            <Header/>
            <Hero/>
            <Destaques onAdicionar={adicionarAoCarrinho}/>
            <Sobre/>
            <Encomenda carrinho={carrinho} onAdicionar={adicionarAoCarrinho} onAlterarQuantidade={alterarQuantidade} onExcluir={excluirItem} onFinalizar={finalizarPedido}/>
            <div className="aviso-carrinho" role="status" aria-live="polite" aria-atomic="true">
                {adicao && (
                    <div key={adicao.id} className="aviso-carrinho-conteudo">
                        <span className="aviso-carrinho-check" aria-hidden="true">✓</span>
                        <div>
                            <strong>Adicionado ao carrinho</strong>
                            <p>{adicao.quantidade} × {adicao.nome}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
