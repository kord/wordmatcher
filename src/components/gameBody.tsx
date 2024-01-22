import React, {Component} from "react";
import {QuizResponseOption} from "./quizResponseOption";
import {MatcherRoundData} from "../logic/gameOptionsTypes";

interface GameBodyProps {
    currentRound: MatcherRoundData,
    selectGuess: (choice: number) => void
}

interface GameBodyState {
}

export class GameBody extends Component<GameBodyProps, GameBodyState> {
    constructor(props: GameBodyProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'matcher-game'}>
                <div className={'game-body'}>
                    <div className={'quiz-hint'}>{this.props.currentRound.hint.word}</div>
                    <div className={'quiz-response-panel'}>
                        <div className={'quiz-response-grid'}>
                            {this.props.currentRound.options.map((option, i) =>
                                <QuizResponseOption
                                    entry={option}
                                    onClick={this.props.selectGuess}
                                    optionNumber={i}
                                    key={i}/>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}