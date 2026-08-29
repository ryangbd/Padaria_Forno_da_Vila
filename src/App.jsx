import './App.css'
import Header from './components/header/Header.jsx'
import Hero from './components/hero/Hero.jsx'
import Destaques from './components/Destaques/Destaques.jsx'
import Sobre from "./components/Sobre/Sobre.jsx"
import Encomenda from './components/Encomenda/Encomenda.jsx'

function App(){
    return(
        <div className="app" >
            <Header/>
            <Hero/>
            <Destaques/>
            <Sobre/>
            <Encomenda/>
        </div>
    )
}

export default App