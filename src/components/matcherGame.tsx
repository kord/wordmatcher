import React, {Component} from 'react';
import {MatcherGameLogic} from "../logic/game";
import {defaultOptions, defaultSimpTradOptions} from "../logic/matcherGameOptions";
import {QuizResponseOption} from "./quizResponseOption";
import {OptionsButton} from "./optionsButton";
import '../css/matcherGame.scss';
import {StartButton} from "./startButton";
import {MatcherDict} from "../dictionaries/matcherDict";
import {GameplayOptions, MatcherRoundObjective} from "../logic/gameOptionsTypes";
import {getAppOptionsFromLocalStorage} from "../utils/localStorage";


interface MatcherGameProps {
}

interface MatcherGameState {
    loadedDictionary?: MatcherDict,
    gameActive: boolean,
    game: MatcherGameLogic,
    rules: GameplayOptions,
}

class MatcherGame extends Component<MatcherGameProps, MatcherGameState> {
    constructor(props: MatcherGameProps) {
        super(props);
        this.state = {
            gameActive: false,
            game: new MatcherGameLogic(defaultOptions),
            // game: new MatcherGameLogic(defaultSimpTradOptions),
            rules: getAppOptionsFromLocalStorage(),
        };
    }

    startFn = () => {
        console.log('start pressed')
    }

    optionsChangeFn = () => {
        this.setState({
            rules: getAppOptionsFromLocalStorage(),
            gameActive: false
        })
    }

    selectGuess = (i: number) => {
        this.state.game.applyGuessForCurrentRound(i);
        this.forceUpdate();
    }

    scoreString = () => {
        if (this.state.gameActive) {
            const duration = this.state.rules.duration;
            // if (typeof duration === 'string' && duration === 'unlimited')
            // return `${this.state.game.currentScore}/${this.state.rules.}`
        }
        return 'incomplete';
    }


    render() {
        const gameActive = this.state.gameActive;

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
                <div className={'game-score'}>{this.state.gameActive ? this.scoreString() : ''}</div>
                <StartButton startFn={this.startFn}/>
                <OptionsButton onChangeFn={this.optionsChangeFn}/>
            </>
        );
    }
}


export default MatcherGame;


