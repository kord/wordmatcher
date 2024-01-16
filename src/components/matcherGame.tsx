import React, {Component} from 'react';
import '../css/matcherGame.scss';
import {MatcherGameLogic} from "../logic/game";
import {defaultOptions, defaultSimpTradOptions, MatcherRoundObjective} from "../logic/options";
import CSS from "csstype";
import {OptionBox} from "./optionBox";


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
            game: new MatcherGameLogic(defaultOptions),
            // game: new MatcherGameLogic(defaultSimpTradOptions),
        };
    }

    selectOption = (i: number) => {
        this.state.game.applyGuessForCurrentRound(i);
        this.forceUpdate();
    }


    render() {

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

                    <div className={'quiz-hint'}>{this.state.game.currentRound.hint.word}</div>
                    <div className={'quiz-response-panel'}>
                        <div className={'quiz-response-grid'}>
                            {this.state.game.currentRound.options.map((option, i) =>
                                <OptionBox word={option} onClick={this.selectOption} optionNumber={i}/>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default MatcherGame;


