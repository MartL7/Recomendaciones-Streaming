import { useState, useEffect } from 'react'

export const filterForGenre = () => {

    const [filters, setFilters] = useState({
        genre: 'All'
      })

    const [results, setResults] = useState()

    useEffect(() => {
        fetch('https://api-nodejs-production-7b72.up.railway.app/content/')
            .then(response => response.json())
            .then(data => {
                setResults(data)
            })
    }, [])

    const filteredResults = results?.filter((result) => {
        return filters.genre === 'All' ||
        result.genre === filters.genre
    })

    return { filteredResults, setFilters }
}