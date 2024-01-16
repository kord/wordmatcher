import React from 'react';
import './css/App.css';

import './dictionaries/mandarin';
import MatcherGame from "./components/matcherGame";


// Some initialization stuff to do before loading the app.
const initialize = () => {
    // const m = new MatcherGameLogic();
    // for (let i = 100; i < 104; i++) {
    //     const round = m.getNewRound(i);
    //     console.log(round);
    //     console.log("")
    // }
}

function App() {
    initialize();
    return (
        <div className="App">
            <header className="App-header">
                <MatcherGame/>
            </header>
        </div>
    );
}

export default App;
