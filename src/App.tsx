import React from 'react';
import logo from './logo.svg';
import './css/App.css';

import './dictionaries/mandarin';
import MatcherGame from "./components/matcherGame";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>

                <MatcherGame/>
                
            </header>
        </div>
    );
}

export default App;
