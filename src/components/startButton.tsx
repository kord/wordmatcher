import React, {Component} from "react";
import '../css/buttons.css';

interface StartButtonProps {
    startFn: VoidFunction;
}

interface StartButtonState {
}

export class StartButton extends Component<StartButtonProps, StartButtonState> {
    constructor(props: StartButtonProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'game-control-button start-button'}
                 onClick={this.props.startFn}/>
        );
    }
}