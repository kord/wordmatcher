import React, {Component} from "react";
import {WordEntry} from "../dictionaries/matcherDict";



interface OptionBoxProps {
    entry: WordEntry,
    onClick: (i:number)=>void,
    optionNumber: number,
}

interface OptionBoxState {
}

export class OptionBox extends Component<OptionBoxProps, OptionBoxState> {
    constructor(props: OptionBoxProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'quiz-response-option'}
                 key={this.props.optionNumber}
                 onClick={() => this.props.onClick(this.props.optionNumber)}
                 style={{
                     '--character-count': this.props.entry.word.length,
                     '--string-width': 5,
            } as React.CSSProperties}>
                {this.props.entry.word}
            </div>);
    }
}