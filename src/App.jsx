import { useEffect, useState } from 'react'
import { ListOfContent } from './components/Content.jsx'
import { Header } from './components/header.jsx'
import { filterForGenre } from './hooks/filterForGenre'
import { Filters } from './components/Filters.jsx'
import './App.css'

export function App() {
  const { filteredResults, setFilters } = filterForGenre()
  const isResults = filteredResults ?? false

  return (
    <>
      <Header />
      <h1 className='mt-5 mt-md-0'> Series, Películas, Animes Recomendados </h1>

      <Filters onChange={setFilters} />

      <main className='Container-Image'>
        
          {isResults ? <ListOfContent results={filteredResults} /> : <h2 className='mt-5 text-center'> No hay resultados </h2>}

      </main>
    </>
  )
}

