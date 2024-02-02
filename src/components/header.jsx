import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
             <nav className="navbar navbar-expand-sm bg-body-tertiary fw-bold">
                <div className="container-fluid">
                <button className="btn rounded-fill"><i className="bi bi-app-indicator"></i></button>
                <h2 className="navbar-brand px-5 mt-1 fw-bold"> Contenido Recomendado </h2>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                    <Link to="../" className="nav-link active" aria-current="page">
                        Inicio
                    </Link>
                    <Link to="../docs" className="nav-link active" aria-current="page">
                        Docs
                    </Link>
                    <Link to="../form" className="nav-link active" aria-current="page">
                        Agregar
                    </Link>
                    <Link to="../Peliculas" className="nav-link active" aria-current="page">
                        Películas
                    </Link>
                    <Link to="/Series" className="nav-link">
                        Series
                    </Link>
                    <Link to="/Animes" className="nav-link">
                        Animes
                    </Link>
                    </div>
                </div>
                </div>
            </nav>
      </header>
    )
}