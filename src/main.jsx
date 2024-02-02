import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import { HashRouter  as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css' 
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import { ShowPeliculas } from './pages/Peliculas.jsx'
import { ShowAnimes } from './pages/Animes.jsx'
import { ShowSeries } from './pages/Series.jsx'
import { Documentation } from './pages/Docs.jsx'
import { ShowForm } from './form.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>

    <Routes>
       <Route path="/" element={ <App /> } />
       <Route path="/Peliculas" element={ <ShowPeliculas /> } />
       <Route path="/Animes" element={ <ShowAnimes /> } />
       <Route path="/Series" element={ <ShowSeries /> } />
       <Route path="/Docs" element={ <Documentation /> } />
       <Route path="/form" element={ <ShowForm /> } />
    </Routes>
    
  </Router>
)
