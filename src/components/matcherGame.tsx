import React, {Component} from 'react';
import {MatcherGameLogic} from "../logic/game";
import {defaultOptions, defaultSimpTradOptions} from "../logic/matcherGameOptions";
import {QuizResponseOption} from "./quizResponseOption";
import {OptionsButton} from "./optionsButton";
import '../css/matcherGame.scss';
import {StartButton} from "./startButton";
import {MatcherDict} from "../dictionaries/matcherDict";
import {MatcherRoundObjective} from "../logic/gameOptionsTypes";


interface MatcherGameProps {
}

interface MatcherGameState {
    loadedDictionary?: MatcherDict,
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

    startFn = () => {
        console.log('start pressed')
    }

    optionsChangeFn = () => {
        console.log('optionsChange called')
    }

    selectGuess = (i: number) => {
        this.state.game.applyGuessForCurrentRound(i);
        this.forceUpdate();
    }


    render() {

        return (<>
                <div className={'matcher-game'}>
                    <div className={'game-body'}>
                        <div className={'quiz-hint'}>{this.state.game.currentRound.hint.word}</div>
                        <div className={'quiz-response-panel'}>
                            <div className={'quiz-response-grid'}>
                                {this.state.game.currentRound.options.map((option, i) =>
                                    <QuizResponseOption
                                        entry={option}
                                        onClick={this.selectGuess}
                                        optionNumber={i}
                                        key={i}/>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className={'game-title'}>Word Matcher</div>
                <StartButton startFn={this.startFn                }/>
                <OptionsButton onChangeFn={                this.optionsChangeFn}/>
            </>
        );
    }
}


export default MatcherGame;


