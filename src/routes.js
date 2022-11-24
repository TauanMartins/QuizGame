import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Fragment } from "react";
import Home from './pages/Home';
import Game from './pages/Game';
import Header from './components/Header';
import GlobalStateProvider from './components/DataComponents/GlobalState';
import Sobre from './pages/Sobre';
import Maintence from './pages/Maintence';
import Infinite from './pages/Infinite';
import History from './pages/History';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <div className='Body'>
                    <Routes>
                        <Route path="/maintence" element={<Maintence />} />
                        <Route path="sobre" element={<Sobre />} />
                        <Route path="/" element={<GlobalStateProvider><Home /></GlobalStateProvider>} />
                        <Route path="/game" element={<GlobalStateProvider><Game /></GlobalStateProvider>} />
                        <Route path="/infinite" element={<GlobalStateProvider><Infinite /></GlobalStateProvider>} />
                        <Route path="/history" element={<GlobalStateProvider><History /></GlobalStateProvider>} />
                    </Routes>
                </div>
            </Fragment>
        </BrowserRouter>

    )
}

export default RoutesApp;