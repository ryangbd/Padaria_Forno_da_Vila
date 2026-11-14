import { useState } from 'react'

function Modal({ children, onClose, labelledBy, className = '' }) {
    const [fechando, setFechando] = useState(false)

    function fechar() {
        if (fechando) return
        setFechando(true)
        window.setTimeout(onClose, 220)
    }

    return (
        <div className={`overlay-carrinho${fechando ? ' modal-fechando' : ''}`} onClick={fechar}>
            <section
                className={`modal-carrinho ${className}`.trim()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                onClick={event => event.stopPropagation()}
            >
                {children(fechar)}
            </section>
        </div>
    )
}

export default Modal
