export const ListOfContent = ({ results }) => {

    const content = results?.map((result) => {
        try {
            const bufferData = result.poster.data
            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(bufferData)))
            const url = `data:image/jpeg;base64,${base64String}`
            
            return (
                <img key={result.id} src={url} alt={result.title} type="image/jpeg" />
            );
        } catch (error) {
            console.error('Error al procesar la imagen:', error)
            return null
        }
    })

    return (
        content
    )
}
