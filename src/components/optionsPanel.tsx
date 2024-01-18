import React, {Component} from "react";
import {HskLevel} from "../dictionaries/languages";
import {
    getStoredBool,
    getStoredNumber,
    getStoredValue,
    setStoredBool,
    setStoredNumber,
    setStoredValue
} from "../utils/localStorage";
import '../css/optionsPanel.css';

export type OptionsPanelProps = {
    onChangeFn?: VoidFunction,
};

interface OptionsPanelState {
    hskLevel: HskLevel,
    includeLowerHskLevels: boolean,
    characterSet: string,
    gameDurationType: string,
    gameDurationQuestions: number,
    gameDurationTimeSeconds: number,
}

const storedNames = {
    hskLevel: 'options-hskLevel',
    includeLowerHskLevels: 'options-includeLowerHskLevels',
    characterSet: 'options-characterType',
    gameDurationType: 'options-gameDurationType',
    gameDurationQuestions: 'options-gameDurationQuestions',
    gameDurationTimeSeconds: 'options-gameDurationTimeSeconds',

}

const defaultValues = {
    hskLevel: HskLevel.HSK1,
    includeLowerHskLevels: false,
    characterSet: 'tw',
    gameDurationType: 'time',
    gameDurationQuestions: 30,
    gameDurationTimeSeconds: 45,
}


export class OptionsPanel extends Component<OptionsPanelProps, OptionsPanelState> {
    constructor(props: OptionsPanelProps) {
        super(props);
        this.state = {
            hskLevel: getStoredNumber(storedNames.hskLevel) as HskLevel || defaultValues.hskLevel,
            includeLowerHskLevels: getStoredBool(storedNames.includeLowerHskLevels) || defaultValues.includeLowerHskLevels,
            characterSet: getStoredValue(storedNames.characterSet) || defaultValues.characterSet,
            gameDurationType: getStoredValue(storedNames.gameDurationType) || defaultValues.gameDurationType,
            gameDurationQuestions: getStoredNumber(storedNames.gameDurationQuestions) || defaultValues.gameDurationQuestions,
            gameDurationTimeSeconds: getStoredNumber(storedNames.gameDurationTimeSeconds) || defaultValues.gameDurationTimeSeconds,

        };
    }

    saveOptions = () => {
        console.log('Asked to save options.');
        setStoredNumber(storedNames.hskLevel, this.state.hskLevel);
        setStoredBool(storedNames.includeLowerHskLevels, this.state.includeLowerHskLevels);
        setStoredValue(storedNames.characterSet, this.state.characterSet);
        setStoredValue(storedNames.gameDurationType, this.state.gameDurationType);
        setStoredNumber(storedNames.gameDurationQuestions, this.state.gameDurationQuestions);
        setStoredNumber(storedNames.gameDurationTimeSeconds, this.state.gameDurationTimeSeconds);
    }

    setHskLevel = (level: string) => {
        this.setState({hskLevel: +level}, this.saveOptions);
    }

    setGameDurationQuestions = (gameDurationQuestions: string) => {
        this.setState({gameDurationQuestions: +gameDurationQuestions}, this.saveOptions);
    }

    setGameDurationTimeSeconds = (gameDurationTimeSeconds: string) => {
        this.setState({gameDurationTimeSeconds: +gameDurationTimeSeconds}, this.saveOptions);
    }

    handleChangeIncludeLowerHskLevels: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.checked;
        this.setState({includeLowerHskLevels: newValue}, this.saveOptions);
    }

    handleCharacterSetChange: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.value;
        this.setState({characterSet: newValue}, this.saveOptions);
    }

    handleGameDurationTypeChange: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.value;
        this.setState({gameDurationType: newValue}, this.saveOptions);
    }

    render() {
        return (
            <div className={'options-panel'}>
                <div className={'options-panel__flex'}>
                    <p className={'options-panel__section-name'}>Game Length</p>
                    <div className={'options-panel__section'}>
                        <label><input type="radio" value="questions"
                                      checked={this.state.gameDurationType === 'questions'}
                                      onChange={this.handleGameDurationTypeChange}/>
                            &nbsp;Questions:&nbsp;
                            <label>
                                <select
                                    value={this.state.gameDurationQuestions}
                                    onChange={e => this.setGameDurationQuestions(e.target.value)}
                                >
                                    <option value={10}>10 Questions</option>
                                    <option value={20}>20 Questions</option>
                                    <option value={30}>30 Questions</option>
                                    <option value={40}>40 Questions</option>
                                    <option value={50}>50 Questions</option>
                                    <option value={75}>75 Questions</option>
                                    <option value={100}>100 Questions</option>
                                </select>
                            </label>
                        </label>

                        <label><input type="radio" value="time"
                                      checked={this.state.gameDurationType === 'time'}
                                      onChange={this.handleGameDurationTypeChange}/>
                            &nbsp;Time:&nbsp;
                            <label>
                                <select
                                    value={this.state.gameDurationTimeSeconds}
                                    onChange={e => this.setGameDurationTimeSeconds(e.target.value)}
                                >
                                    <option value={30}>30 Seconds</option>
                                    <option value={45}>45 Seconds</option>
                                    <option value={60}>1 Minute</option>
                                    <option value={90}>1.5 Minutes</option>
                                    <option value={180}>3 Minutes</option>
                                    <option value={300}>5 Minutes</option>
                                </select>
                            </label>
                        </label>

                    </div>

                    <p className={'options-panel__section-name'}>Word List</p>
                    <div className={'options-panel__section'}>
                        <label>
                            HSK Level:&nbsp;
                            <select
                                value={this.state.hskLevel}
                                onChange={e => this.setHskLevel(e.target.value)}
                            >
                                <option value={HskLevel.HSK1}>Level 1</option>
                                <option value={HskLevel.HSK2}>Level 2</option>
                                <option value={HskLevel.HSK3}>Level 3</option>
                                <option value={HskLevel.HSK4}>Level 4</option>
                                <option value={HskLevel.HSK5}>Level 5</option>
                                <option value={HskLevel.HSK6}>Level 6</option>
                            </select>
                        </label>
                        <label>
                            Include lower levels:&nbsp;
                            <input type={'checkbox'}
                                   checked={this.state.includeLowerHskLevels}
                                   onChange={this.handleChangeIncludeLowerHskLevels}></input>
                        </label>

                    </div>

                    <p className={'options-panel__section-name'}>Character Set</p>
                    <div className={'options-panel__section'}>
                        <label>
                            Traditional:&nbsp;
                            <input type="radio" value="tw"
                                   checked={this.state.characterSet === 'tw'}
                                   onChange={this.handleCharacterSetChange}/>
                        </label>
                        <label>
                            Simplified:&nbsp;
                            <input type="radio" value="cn"
                                   checked={this.state.characterSet === 'cn'}
                                   onChange={this.handleCharacterSetChange}/>
                        </label>
                    </div>

                </div>
            </div>
        );
    }
}