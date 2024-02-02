import { InfoContent } from "./InfoContent"
import { activeInfoContent } from "../hooks/showInfoContent"

export const ListOfContent = ({ results }) => {

    const { showInfo, info, handleClickImage, handleHideInfo } = activeInfoContent()

    const content = results?.map((result) => {
        
        try {
            const bufferData = result.poster.data
            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(bufferData)))
            const url = `data:image/jpeg;base64,${base64String}`
            
            return (
                
                <article key={result.id} className="Container-Child">
                    <img src={url} alt={result.title} type="image/jpeg" onClick={() => handleClickImage(result)}/>
                    {showInfo && <InfoContent results={info} handleHideInfo={handleHideInfo}/>}
                </article>
            
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
