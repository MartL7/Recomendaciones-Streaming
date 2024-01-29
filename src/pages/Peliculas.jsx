import { Header } from "../components/header"
import { ShowFilteredMovies } from "../components/ShowFilteredMovies"
import { filterForGenre } from '../hooks/filterForGenre'
import { Filters } from '../components/Filters.jsx'

export function ShowPeliculas() {

    const { filteredResults, setFilters } = filterForGenre()

    return (
        <>
            <Header />

            <h1> Películas Recomendadas </h1>
            <Filters onChange={setFilters} />

            <main className='Container-Image'>

                 <ShowFilteredMovies results={filteredResults} />

            </main>
        </>
    )
}