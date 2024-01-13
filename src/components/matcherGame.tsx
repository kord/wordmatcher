import React, {Component} from 'react';
import '../css/matcherGame.scss';
import {MatcherGameLogic} from "../logic/game";
import {MatcherRoundObjective} from "../logic/options";

interface MatcherGameProps {
}

interface MatcherGameState {
    gameActive: boolean,
    game: MatcherGameLogic,
}

class MatcherGame extends Component<MatcherGameProps, MatcherGameState> {
    constructor(props: MatcherGameProps) {
        super(props);
        this.state = {
            gameActive: false,
            game: new MatcherGameLogic(),
        };
    }



    render() {
        const tempGame = this.state.game.getNewRound(MatcherRoundObjective.FirstLangToSecondLang)

        return (
            <div className={'matcher-game'}>
                <div className={'options-bar'}>
                    Options bar:
                    <button>
                        Options
                    </button>
                </div>
                <div className={'game-body'}>
                    <p>
                        Matcher Game!
                    </p>

                    <div className={'quiz-hint'}>{tempGame.hint.word}</div>
                    <div className={'quiz-response-panel'}>
                        <div className={'quiz-response-grid'}>

                            {tempGame.options.map((option, i) =>
                                <div className={'quiz-response-option'} key={i}>
                                    {option.word}
                                </div>)}

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default MatcherGame;


