import React, {Component} from "react";
import {HskLevel} from "../dictionaries/languages";
import {getStoredBool, getStoredNumber, getStoredValue} from "../utils/localStorage";
import '../css/optionsPanel.css';

export type OptionsPanelProps = {
    onChangeFn?: VoidFunction,
};

interface OptionsPanelState {
    hskLevel: HskLevel,
    includeLowerHskLevels: boolean,
    characterType: string,
    gameDurationType: string,
    gameDurationQuestions: number,
    gameDurationTimeSeconds: number,
}

const storedNames = {
    hskLevel: 'options-hskLevel',
    includeLowerHskLevels: 'options-includeLowerHskLevels',
    characterType: 'options-characterType',
    gameDurationType: 'options-gameDurationType',
    gameDurationQuestions: 'options-gameDurationQuestions',
    gameDurationTimeSeconds: 'options-gameDurationTimeSeconds',

}

const defaultValues = {
    hskLevel: HskLevel.HSK1,
    includeLowerHskLevels: false,
    characterType: 'tw',
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
            characterType: getStoredValue(storedNames.characterType) || defaultValues.characterType,
            gameDurationType: getStoredValue(storedNames.gameDurationType) || defaultValues.gameDurationType,
            gameDurationQuestions: getStoredNumber(storedNames.gameDurationQuestions) || defaultValues.gameDurationQuestions,
            gameDurationTimeSeconds: getStoredNumber(storedNames.gameDurationTimeSeconds) || defaultValues.gameDurationTimeSeconds,

        };
    }

    saveOptions = () => {
        console.log('Asked to save options.')
    }

    setHskLevel = (level: string) => {
        console.log(level);
        this.setState({hskLevel: +level}, this.saveOptions);
    }

    handleChangeIncludeLowerHskLevels: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.checked;
        this.setState({includeLowerHskLevels: newValue}, this.saveOptions);
    }

    handleCharacterTypeChange: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.value;
        this.setState({characterType: newValue}, this.saveOptions);
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
                               onChange={this.handleGameDurationTypeChange} />
                            &nbsp;Questions
                        </label>

                        <label><input type="radio" value="time"
                               checked={this.state.gameDurationType === 'time'}
                               onChange={this.handleGameDurationTypeChange} />
                            &nbsp;Time
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
                                   checked={this.state.characterType === 'tw'}
                                   onChange={this.handleCharacterTypeChange} />
                        </label>
                        <label>
                            Simplified:&nbsp;
                            <input type="radio" value="cn"
                                   checked={this.state.characterType === 'cn'}
                                   onChange={this.handleCharacterTypeChange} />
                        </label>
                    </div>

                </div>
            </div>
        );
    }
}