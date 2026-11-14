import './App.css'
import { useEffect, useRef, useState } from 'react'
import Header from './components/header/Header.jsx'
import Hero from './components/hero/Hero.jsx'
import Destaques from './components/Destaques/Destaques.jsx'
import Sobre from "./components/Sobre/Sobre.jsx"
import Encomenda from './components/Encomenda/Encomenda.jsx'
import Modal from './components/Modal.jsx'

function App(){
    const [usuario, setUsuario] = useState(() => {
        try { return sessionStorage.getItem('forno-da-vila-sessao') || '' } catch { return '' }
    })
    const [mostrarLogin, setMostrarLogin] = useState(false)
    const [mostrarPedidos, setMostrarPedidos] = useState(false)
    const [nomeLogin, setNomeLogin] = useState('')
    const [erroLogin, setErroLogin] = useState('')
    const [pedidos, setPedidos] = useState([])
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null)
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

    function entrar(event) {
        event.preventDefault()
        const nome = nomeLogin.trim()
        if (!nome) return
        try { sessionStorage.setItem('forno-da-vila-sessao', nome) } catch {
            setErroLogin('Não foi possível iniciar a sessão neste navegador.')
            return
        }
        setUsuario(nome)
        setMostrarLogin(false)
        setErroLogin('')
    }

    function sair() {
        try { sessionStorage.removeItem('forno-da-vila-sessao') } catch { /* sessão encerrada nesta página */ }
        setUsuario('')
        setMostrarPedidos(false)
    }

    function abrirMeusPedidos() {
        try {
            const salvos = JSON.parse(localStorage.getItem('forno-da-vila-pedidos') || '[]')
            const normalizar = texto => texto.trim().toLocaleLowerCase('pt-BR')
            setPedidos(Array.isArray(salvos) ? salvos.filter(pedido =>
                normalizar(pedido.cliente?.nome || '') === normalizar(usuario)
            ).sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)) : [])
        } catch {
            setPedidos([])
        }
        setMostrarPedidos(true)
    }

    return(
        <div className="app" >
            <header className="conta-header">
                <nav className="conta-nav" aria-label="Conta">
                {usuario ? <>
                    <span>Olá, {usuario}</span>
                    <button type="button" onClick={abrirMeusPedidos}>Meus pedidos</button>
                    <button type="button" className="conta-sair" onClick={sair}>Sair</button>
                </> : <button type="button" onClick={() => { setNomeLogin(''); setMostrarLogin(true) }}>Entrar</button>}
                </nav>
            </header>
            <Header/>
            <Hero/>
            <Destaques onAdicionar={adicionarAoCarrinho}/>
            <Sobre/>
            <Encomenda usuario={usuario} carrinho={carrinho} onAdicionar={adicionarAoCarrinho} onAlterarQuantidade={alterarQuantidade} onExcluir={excluirItem} onFinalizar={finalizarPedido}/>
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
            {mostrarLogin && <Modal onClose={() => setMostrarLogin(false)} labelledBy="titulo-login" className="modal-conta">
                {fechar => <>
                
                    <div className="modal-carrinho-header"><h2 id="titulo-login">Entrar</h2><button type="button" onClick={fechar} aria-label="Fechar">×</button></div>
                    <p>Acesse seus pedidos salvos neste navegador.</p>
                    <form className="form-conta" onSubmit={entrar}>
                        <label htmlFor="nome-login">Seu nome</label>
                        <input id="nome-login" autoComplete="name" value={nomeLogin} onChange={event => setNomeLogin(event.target.value)} required />
                        {erroLogin && <p role="alert">{erroLogin}</p>}
                        <button className="btn-continuar-comprando" type="submit">Continuar</button>
                    </form>
                    <small>Login demonstrativo. A sessão termina ao fechar a aba.</small>
                </>}
            </Modal>}
            {mostrarPedidos && <Modal onClose={() => setMostrarPedidos(false)} labelledBy="titulo-pedidos" className="modal-pedidos">
                {fechar => <>
                
                    <div className="modal-carrinho-header"><div><h2 id="titulo-pedidos">Meus pedidos</h2><p>Pedidos de {usuario}</p></div><button type="button" onClick={fechar} aria-label="Fechar">×</button></div>
                    {pedidos.length === 0 ? <p className="pedidos-vazios">Ainda não há pedidos salvos com esse nome neste navegador.</p> : <div className="lista-pedidos">
                        {pedidos.map(pedido => <article className="pedido-salvo" key={pedido.id}>
                            <div><strong>{pedido.id}</strong><span>Retirada em {new Date(`${pedido.dataRetirada}T00:00:00`).toLocaleDateString('pt-BR')}</span><span>{pedido.itens.reduce((soma, item) => soma + item.quantidade, 0)} itens</span></div>
                            <div className="pedido-salvo-acoes"><strong>R$ {pedido.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong><button type="button" onClick={() => setPedidoSelecionado(pedido)}>Ver comprovante</button></div>
                        </article>)}
                    </div>}
                    <small>Os pedidos ficam salvos neste navegador.</small>
                </>}
            </Modal>}
            {pedidoSelecionado && <Modal onClose={() => setPedidoSelecionado(null)} labelledBy="titulo-comprovante-salvo" className="comprovante">
                {fechar => <>
                
                    <div className="comprovante-cabecalho"><span className="comprovante-check" aria-hidden="true">✓</span><p>PEDIDO SIMULADO</p><h2 id="titulo-comprovante-salvo">Comprovante</h2><span>Pedido {pedidoSelecionado.id}</span></div>
                    <div className="comprovante-dados"><div><span>Cliente</span><strong>{pedidoSelecionado.cliente.nome}</strong></div><div><span>Telefone</span><strong>{pedidoSelecionado.cliente.telefone}</strong></div><div><span>Retirada</span><strong>{new Date(`${pedidoSelecionado.dataRetirada}T00:00:00`).toLocaleDateString('pt-BR')}</strong></div></div>
                    <div className="comprovante-itens">{pedidoSelecionado.itens.map(item => <div key={item.produtoId}><span>{item.quantidade} × {item.nome}</span><strong>R$ {item.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>)}</div>
                    {pedidoSelecionado.observacoes && <p className="comprovante-obs"><strong>Observações:</strong> {pedidoSelecionado.observacoes}</p>}
                    <div className="comprovante-total"><span>Total</span><strong>R$ {pedidoSelecionado.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>
                    <button className="btn-continuar-comprando" type="button" onClick={fechar}>Fechar comprovante</button>
                </>}
            </Modal>}
        </div>
    )
}

export default App
