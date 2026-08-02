import './header.css'

function Header(){
    return(
        <div className="Header">
            <div className="Header-content">
                <span className="Header-eyebrow">Padaria artesanal</span>

                <div className="Header-title-wrap">
                    <svg className="Header-score" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 35 L45 5" stroke="#657a51" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M40 35 L75 5" stroke="#657a51" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M70 35 L105 5" stroke="#657a51" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                    <h1>Forno da Vila</h1>
                </div>

                <p className="Header-tagline">Pão de forno, todo santo dia</p>
            </div>

            <div className="Header-image">
                <img src="../src/assets/images/Fachada.webp" alt="Fachada da padaria Forno da Vila" />
            </div>
        </div>
    )
}

export default Header