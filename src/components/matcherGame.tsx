import React, {Component} from 'react';
import {MatcherGameLogic} from "../logic/game";
import {defaultOptions, defaultSimpTradOptions, MatcherRoundObjective} from "../logic/matcherGameOptions";
import {QuizResponseOption} from "./quizResponseOption";
import {OptionsButton} from "./optionsButton";
import '../css/matcherGame.scss';
import {StartButton} from "./startButton";


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
                <StartButton startFn={() => {
                }}/>
                <OptionsButton onChangeFn={() => {
                }}/>
            </>
        );
    }
}


export default MatcherGame;


