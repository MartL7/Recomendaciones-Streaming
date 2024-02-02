import { Header } from "../components/header"

export function Documentation () {
    const responseJsonApi = {
        "id": 1,
        "title": "Dragon Ball Z",
        "poster": "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PD...",
        "type": "Anime",
        "genre": "Ficcion"
    }

    return (
        <>
            <Header />
            <main className="container">
            <section className="my-5">
                <h1 className="display-4 text-white">Documentación de la API</h1>
                <p className="lead text-white-50">
                    Bienvenido a la documentación de la API. Aquí encontrarás información detallada sobre los endpoints, parámetros y respuestas de la API.
                </p>
            </section>

            <section className="my-4">
                <h2 className="h4 text-white">Endpoint 1: /allcontent/</h2>
                <p className="text-white-50 fw-bold">
                    Obtiene todas las películas con la que cuenta la base de datos, en esta obtienes un JSON con información de las películas.
                </p>
                {/* Proximamente, agregar foto y ejemplo del JSON que devuelve ❌. */}
            </section>

            <section className="my-4">
                <h2 className="h4 text-white">Endpoint 2: /content/:id</h2>
                <p className="text-white-50 fw-bold">
                    Obtienes la información de una película en específico, con el id de la película.
                    ejemplo de uso: /content/1
                </p>
            </section>

            <section className="my-4">
                <h2 className="h4 text-white">Endpoint 3: /content/:genre</h2>
                <p className="text-white-50 fw-bold">
                    Obtienes todas las películas de un género en específico, con el género de la película. También puedes usar párametros.
                    ejemplo de uso: /content?genre=accion
                </p>
            </section>

            <section className="my-4">
                <h2 className="h4 text-white">Endpoint 4: /content/:type</h2>
                <p className="text-white-50 fw-bold">
                    Obtienes todas las películas de un tipo en específico, con el tipo de la película. También puedes usar párametros.
                    ejemplo de uso: /content?type=serie
                </p>
            </section>

            <section className="my-4">
                <h2 className="h4 text-white">Ejemplo de respuesta de la API</h2>
                <div className="code-block">
                    <pre>
                        <code>
                            {JSON.stringify(responseJsonApi, null, 2)}
                        </code>
                    </pre>
                </div>
            </section>
        </main>
        </>
    )
}