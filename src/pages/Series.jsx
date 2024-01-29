import { Header } from "../components/header"
import { ShowFilteredSeries } from "../components/ShowFilteredSeries"
import { filterForGenre } from '../hooks/filterForGenre'
import { Filters } from '../components/Filters.jsx'

export function ShowSeries() {

    const { filteredResults, setFilters } = filterForGenre()

    return (
        <>
            <Header />
            <h1> Series Recomendadas </h1>
            <Filters onChange={setFilters} />

            <main className='Container-Image'>
                <ShowFilteredSeries results={filteredResults}/>
            </main>
        </>
    )
}