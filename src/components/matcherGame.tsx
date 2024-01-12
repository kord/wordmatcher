import React, {Component} from 'react';
import '../css/matcherGame.scss';

interface MatcherGameProps {
}

interface MatcherGameState {
    gameActive: boolean,
}

class MatcherGame extends Component<MatcherGameProps, MatcherGameState> {
    constructor(props: MatcherGameProps) {
        super(props);
        this.state = {
            gameActive: false,
        };
    }

    render() {
        return (
            <div className={'matcher-game'}>
                <div className={'options-bar'}>
                    Options bar:
                    <button>
                        Options
                    </button>
                    <button>
                        Options2
                    </button>
                    <button>
                        Options3
                    </button>
                </div>
                <div className={'game-body'}>
                    <p>
                        Matcher Game!
                    </p>

                    <div className={'quiz-hint'}>爱</div>
                    <div className={'quiz-response-panel'}>
                        <div className={'quiz-response-grid'}>
                            <div className={'quiz-response-option'}>
                                1
                            </div>
                            <div className={'quiz-response-option'}>
                                2
                            </div>
                            <div className={'quiz-response-option'}>
                                3
                            </div>
                            <div className={'quiz-response-option'}>
                                4
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default MatcherGame;


