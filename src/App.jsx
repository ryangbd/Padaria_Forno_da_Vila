import './App.css'
import Header from './components/header/Header.jsx'
import Hero from './components/hero/Hero.jsx'
import Destaques from './components/Destaques/Destaques.jsx'

function App(){
    return(
        <div className="app">
            <Header/>
            <Hero/>
            <Destaques/>
        </div>
    )
}

export default App