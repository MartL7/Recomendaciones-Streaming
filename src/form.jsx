import { Header } from "./components/header"
import { sendForm } from "./hooks/sendForm"
import { useId } from "react"

export function ShowForm() {
   
    const imageId = useId()
    const { handleSubmit, handleInputChange } = sendForm()

    return (
        <>
            <Header />

             <form className="Formulario" encType="multipart/form-data" onSubmit={handleSubmit}>
                <h4> Agregar </h4>
                <input className="Inputs" type="text" name="title" placeholder="Nombre de la película, anime o serie. " required onChange={handleInputChange} />

                <select name="type" className="Inputs" required onChange={handleInputChange}>
                    <option value="" disabled>Seleccione un tipo</option>
                    <option value="Pelicula">Película</option>
                    <option value="Anime">Anime</option>
                    <option value="Serie">Serie</option>
                </select>

                <select className="Inputs" name="genre" required onChange={handleInputChange}>
                    <option value="" disabled>Seleccione un género</option>
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
                
                <label htmlFor={imageId} className="Input-Foto">
                    <span className="icon">👤</span> Subir foto/portada
                </label>
                <input className="Inputs foto" type="file" name="poster" required id={imageId} onChange={handleInputChange} />

                <input className="Boton" type="submit" value="Agregar" />

            </form>
        </>
    )
}