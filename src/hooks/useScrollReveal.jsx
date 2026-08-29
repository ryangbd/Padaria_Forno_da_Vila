import { useEffect, useRef, useState } from "react";

function useScrollReveal(){
    const ref = useRef(null)
    const [visivel, setVisivel] = useState(false)

    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setVisivel(true)
                    observer.unobserve(entry.target)
                }
            },
            {threeshold:0.2}
        )
        if(ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    return [ref, visivel]
}

export default useScrollReveal