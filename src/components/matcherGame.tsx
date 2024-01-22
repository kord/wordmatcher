import React, {Component} from 'react';
import {MatcherGameLogic} from "../logic/game";
import {OptionsButton} from "./optionsButton";
import {StartButton} from "./startButton";
import {MatcherRoundResult} from "../logic/gameOptionsTypes";
import {getMatcherGameDictionaryOptionsFromLocalStorage} from "../utils/localStorage";
import {GameBody} from "./gameBody";
import {generateMatcherGameOptions} from "../dictionaries/dictionaryUtilities";
import classNames from "classnames";
import '../css/matcherGame.scss';


interface MatcherGameProps {
}

interface MatcherGameState {
    // loadedDictionary: MatcherDict,
    gameStartMsec?: number,
    game?: MatcherGameLogic,
}

class MatcherGame extends Component<MatcherGameProps, MatcherGameState> {
    constructor(props: MatcherGameProps) {
        super(props);
        this.state = {
        };
    }

    startFn = () => {
        const options = generateMatcherGameOptions(getMatcherGameDictionaryOptionsFromLocalStorage());
        this.setState({
            gameStartMsec: Date.now(),
            game: new MatcherGameLogic(options),
        })
    }

    optionsChangeFn = () => {
        this.setState({
            game: undefined,
        })
    }

    selectGuess = (i: number) => {
        if (this.state.game) {
            this.state.game.applyGuessForCurrentRound(i);
            this.forceUpdate();
        } else throw new Error('selectGuess called with no active game.')
    }

    scoreString = () => {
        if (this.state.game) {
            const score = this.state.game.currentScore();
            const duration = this.state.game.options.duration;
            if (typeof duration === 'string' && duration === 'unlimited')
                return `${score.right}/${score.attempted}`
            if (typeof duration !== 'string' && duration.units === 'rounds')
                return `${score.right}/${duration.count}`
            if (typeof duration !== 'string' && duration.units === 'seconds')
                return `${score.right}/${score.attempted}`
        }
        return 'not playing now';
    }


    render() {
        const {game} = this.state;

        return (<>
                <div className={'game-title'}>Word Matcher</div>
                <div className={classNames('game-score',
                    {'game-score__previous-correct': this.state.game?.lastResult === MatcherRoundResult.Success,
                        'game-score__previous-wrong': this.state.game?.lastResult === MatcherRoundResult.Failure,
                    })}>{this.scoreString()}</div>

                <>
                    {game ?
                        <GameBody currentRound={game.currentRound} selectGuess={this.selectGuess}/> :
                        <StartButton startFn={this.startFn}/>
                    }
                </>
                <OptionsButton onChangeFn={this.optionsChangeFn}/>
            </>
        );
    }
}


export default MatcherGame;


