import React, {Component} from "react";
import {HskLevel} from "../dictionaries/languages";
import {
    getStoredBool,
    getStoredNumber,
    getStoredValue,
    setStoredBool,
    setStoredNumber,
    setStoredValue,
    optionsStoredNames, optionsDefaultValues
} from "../utils/localStorage";
import '../css/optionsPanel.css';
import {WordListType} from "../logic/gameOptionsTypes";

export type OptionsPanelProps = {
    onChangeFn?: VoidFunction,
};

export interface OptionsPanelState {
    wordListType: WordListType,
    hskLevel: HskLevel,
    jundaMin: number,
    jundaMax: number,
    includeLowerHskLevels: boolean,
    characterSet: string,
    gameDurationType: string,
    gameDurationQuestions: number,
    gameDurationTimeSeconds: number,
}


export class OptionsPanel extends Component<OptionsPanelProps, OptionsPanelState> {
    constructor(props: OptionsPanelProps) {
        super(props);
        this.state = {
            wordListType: getStoredValue(optionsStoredNames.wordListType) as WordListType || optionsDefaultValues.wordListType,
            hskLevel: getStoredNumber(optionsStoredNames.hskLevel) as HskLevel || optionsDefaultValues.hskLevel,
            jundaMin: getStoredNumber(optionsStoredNames.jundaMin) || optionsDefaultValues.jundaMin,
            jundaMax: getStoredNumber(optionsStoredNames.jundaMax) || optionsDefaultValues.jundaMax,
            includeLowerHskLevels: getStoredBool(optionsStoredNames.includeLowerHskLevels) || optionsDefaultValues.includeLowerHskLevels,
            characterSet: getStoredValue(optionsStoredNames.characterSet) || optionsDefaultValues.characterSet,
            gameDurationType: getStoredValue(optionsStoredNames.gameDurationType) || optionsDefaultValues.gameDurationType,
            gameDurationQuestions: getStoredNumber(optionsStoredNames.gameDurationQuestions) || optionsDefaultValues.gameDurationQuestions,
            gameDurationTimeSeconds: getStoredNumber(optionsStoredNames.gameDurationTimeSeconds) || optionsDefaultValues.gameDurationTimeSeconds,

        };
    }

    saveOptions = () => {
        console.log('Asked to save options.');
        setStoredValue(optionsStoredNames.wordListType, this.state.wordListType);
        setStoredNumber(optionsStoredNames.hskLevel, this.state.hskLevel);
        setStoredNumber(optionsStoredNames.jundaMin, this.state.jundaMin);
        setStoredNumber(optionsStoredNames.jundaMax, this.state.jundaMax);
        setStoredBool(optionsStoredNames.includeLowerHskLevels, this.state.includeLowerHskLevels);
        setStoredValue(optionsStoredNames.characterSet, this.state.characterSet);
        setStoredValue(optionsStoredNames.gameDurationType, this.state.gameDurationType);
        setStoredNumber(optionsStoredNames.gameDurationQuestions, this.state.gameDurationQuestions);
        setStoredNumber(optionsStoredNames.gameDurationTimeSeconds, this.state.gameDurationTimeSeconds);
    }

    setHskLevel = (level: string) => {
        this.setState({hskLevel: +level}, this.saveOptions);
    }

    setJunDaMax = (level: string) => {
        this.setState({jundaMax: +level}, this.saveOptions);
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

    handleWordListTypeChange: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.value as WordListType;
        this.setState({wordListType: newValue}, this.saveOptions);
    }

    handleGameDurationTypeChange: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.value;
        this.setState({gameDurationType: newValue}, this.saveOptions);
    }

    render() {
        return (
            <div className={'options-panel'}>
                <div className={'options-panel__flex'}>
                    {/*************************************************************/}
                    <p className={'options-panel__section-name'}>Game Length</p>
                    {/*************************************************************/}
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
                                <select value={this.state.gameDurationTimeSeconds}
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

                    {/*************************************************************/}
                    <p className={'options-panel__section-name'}>Word List</p>
                    {/*************************************************************/}
                    <div className={'options-panel__section'}>
                        <input className={'options-panel__word-list-selector'}
                               type="radio"
                               value='HSK'
                               checked={this.state.wordListType === 'HSK'}
                               onChange={this.handleWordListTypeChange}/>
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

                    <input className={'options-panel__word-list-selector'}
                           type="radio"
                           value='JunDa'
                           checked={this.state.wordListType === 'JunDa'}
                           onChange={this.handleWordListTypeChange}/>
                    <div className={'options-panel__section'}>
                        <label>
                            Jun Da Most Common Characters:&nbsp;
                            <select
                                value={this.state.jundaMax}
                                onChange={e => this.setJunDaMax(e.target.value)}
                            >
                                {[100, 200, 400, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map(n =>
                                    <option value={n} key={n}>{n} Characters</option>)}
                            </select>
                        </label>
                    </div>

                    {/*************************************************************/}
                    <p className={'options-panel__section-name'}>Character Set</p>
                    {/*************************************************************/}
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