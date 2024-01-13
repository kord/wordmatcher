import React from 'react';
import logo from './logo.svg';
import './css/App.css';

import './dictionaries/mandarin';
import {MatcherGameLogic} from "./logic/game";
import MatcherGame from "./components/matcherGame";


// Some initialization stuff to do before loading the app.
const initialize = () => {
    for (let i = 0; i < 4; i++) {
        const m = new MatcherGameLogic();
        const round = m.getNewRound(i);
        console.log(round);
        console.log("")
    }
}

function App() {
    initialize();
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
