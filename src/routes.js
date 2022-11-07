import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Fragment } from "react";
import Home from './pages/Home';
import Game from './pages/Game';
import Header from './components/Footer&Header/Header';
import GlobalStateProvider from './components/DataComponents/GlobalState';
import Sobre from './pages/Sobre';
import Teste from './pages/Teste';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <div className='Body'>
                    <Routes>
                        <Route path="sobre" element={<Sobre />} />
                        <Route path="/teste" element={<Teste />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/game" element={<GlobalStateProvider><Game /></GlobalStateProvider>} />
                    </Routes>
                </div>
            </Fragment>
        </BrowserRouter>

    )
}

export default RoutesApp;