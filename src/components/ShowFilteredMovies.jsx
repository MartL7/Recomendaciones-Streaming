import { InfoContent } from "./InfoContent"
import { activeInfoContent } from "../hooks/showInfoContent"

export const ShowFilteredMovies = ({ results }) => {
    
    const { showInfo, info, handleClickImage, handleHideInfo } = activeInfoContent()

    const typesFind = {
        Anime: 'Anime',
        Serie: 'Serie',
        Movie: 'Pelicula',
    }

    const filteredResults = results?.filter((result) => result.type === typesFind.Movie)

    const content = filteredResults?.map((result) => {

        try {
            const bufferData = result.poster.data
            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(bufferData)))
            const url = `data:image/jpeg;base64,${base64String}`
            
            return (

                <div key={result.id}>
                    <img src={url} alt={result.title} type="image/jpeg" onClick={() => handleClickImage(result)}/>
                    {showInfo && <InfoContent results={info} handleHideInfo={handleHideInfo}/>}
                </div>

            )
        } catch (error) {
            console.error('Error al procesar la imagen:', error)
            return null
        }
    })

    return (
        <>
            { content }
        </>
    )
}
