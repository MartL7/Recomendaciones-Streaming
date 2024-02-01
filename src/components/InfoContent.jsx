export function InfoContent({ results, handleHideInfo }) {

    return (
        <section className="Image-Info">
            <div className="Info">
                <h4> Título: </h4>
                <p> {results.title} </p>
            </div>
            <hr />
            <div className="Info">
                <h4> Género: </h4>
                <p> {results.genre} </p>
            </div>
            <hr />
            <div className="Info">
                <h4> Tipo: </h4>
                <p> {results.type} </p>
            </div>
            <hr />
            <div className="Info-Resume">
                <h4> Sinopsis: </h4>
                <p> Pronto habrá mas novedades </p>
            </div>

            <button className="Button" onClick={handleHideInfo}> Cerrar </button>
        </section>
    )
}