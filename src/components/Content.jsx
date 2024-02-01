import { useState } from "react"
import { InfoContent } from "./InfoContent"

export const ListOfContent = ({ results }) => {
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState({})

    const content = results?.map((result) => {
        const handleClickImage = () => {
            setInfo(result)
            setShowInfo(!showInfo)
        }

        const handleHideInfo = () => {
            setShowInfo(false)
        }

        try {
            const bufferData = result.poster.data
            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(bufferData)))
            const url = `data:image/jpeg;base64,${base64String}`
            
            return (
                <>
                    <img key={result.id} src={url} alt={result.title} type="image/jpeg" onClick={handleClickImage}/>
                    {showInfo && <InfoContent results={info} handleHideInfo={handleHideInfo}/>}
                </>
            )
        } catch (error) {
            console.error('Error al procesar la imagen:', error)
            return null
        }
    })

    return (
        content
    )
}
