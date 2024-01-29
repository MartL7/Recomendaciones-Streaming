import { useId } from "react"

export function Filters({ onChange }) {
    const genreFilterId = useId()

    const handleChangeGenre = (event) => {
        onChange(prevState => ({
            ...prevState,
            genre: event.target.value
        }))
    }

    return (
        <section className="filters mt-5 mt-md-0">
            <div>
                <label htmlFor={genreFilterId}> Filtrar por Género </label>

                <select id={genreFilterId} name="genre" onChange={handleChangeGenre}>
                    <option value="All"> Todos </option>
                    <option value="Accion"> Acción </option>
                    <option value="Aventura"> Aventura </option>
                    <option value="Comedia"> Comedia </option>
                    <option value="Romance"> Romance </option>
                    <option value="Drama"> Drama </option>
                    <option value="Fantasia"> Fantasía </option>
                    <option value="Terror"> Terror </option>
                    <option value="Misterio"> Misterio </option>
                    <option value="Ficcion"> Ciencia Ficción </option>
                    <option value="Musical"> Musical </option>
                </select>
            </div>
        </section>
    )
}