import React, {Component} from "react";
import {WordEntry} from "../dictionaries/matcherDict";
import {Lang} from "../dictionaries/languages";


// Borrowed from https://stackoverflow.com/questions/58704990/calculate-pixel-width-of-text-without-knowing-font-in-react-javascript
function getTextWidth(text:string, font:string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context!.font = font || getComputedStyle(document.body).font;

    return context!.measureText(text).width;
}


interface QuizResponseOptionProps {
    entry: WordEntry,
    onClick: (i:number)=>void,
    optionNumber: number,
}

interface QuizResponseOptionState {
}

export class QuizResponseOption extends Component<QuizResponseOptionProps, QuizResponseOptionState> {
    constructor(props: QuizResponseOptionProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`quiz-response-option quiz-response-option__${Lang[this.props.entry.lang]}`}
                 key={this.props.optionNumber}
                 onClick={() => this.props.onClick(this.props.optionNumber)}
                 style={{
                     '--character-count': this.props.entry.word.length,
                     '--string-width': getTextWidth(this.props.entry.word, 'Times New Roman'),
            } as React.CSSProperties}>
                {this.props.entry.word}
                {/*{getTextWidth(this.props.entry.word, 'Times New Roman')}*/}
            </div>);
    }
}