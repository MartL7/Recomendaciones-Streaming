import { Header } from "../components/header"
import { ShowFilteredAnimes } from "../components/ShowFilteredAnimes"
import { filterForGenre } from '../hooks/filterForGenre'
import { Filters } from '../components/Filters.jsx'

export function ShowAnimes() {

    const { filteredResults, setFilters } = filterForGenre()

    return (
        <>
            <Header />
            <h1> Animes Recomendados </h1>

            <Filters onChange={setFilters} />

            <main className='Container-Image'>
                <ShowFilteredAnimes results={filteredResults}/>
            </main>
        </>
    )
}