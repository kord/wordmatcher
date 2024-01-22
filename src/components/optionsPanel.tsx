import React, {Component} from "react";
import {
    getStoredBool,
    getStoredNumber,
    getStoredValue,
    setStoredBool,
    setStoredNumber,
    setStoredValue,
    optionsStoredNames, optionsDefaultValues
} from "../utils/localStorage";
import {HskLevel} from "../dictionaries/languages";
import {CharacterSetOptions, WordListType} from "../logic/gameOptionsTypes";
import classNames from "classnames";
import '../css/optionsPanel.css';

export type OptionsPanelProps = {
    onChangeFn: VoidFunction,
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
        setStoredValue(optionsStoredNames.wordListType, this.state.wordListType);
        setStoredNumber(optionsStoredNames.hskLevel, this.state.hskLevel);
        setStoredNumber(optionsStoredNames.jundaMin, this.state.jundaMin);
        setStoredNumber(optionsStoredNames.jundaMax, this.state.jundaMax);
        setStoredBool(optionsStoredNames.includeLowerHskLevels, this.state.includeLowerHskLevels);
        setStoredValue(optionsStoredNames.characterSet, this.state.characterSet);
        setStoredValue(optionsStoredNames.gameDurationType, this.state.gameDurationType);
        setStoredNumber(optionsStoredNames.gameDurationQuestions, this.state.gameDurationQuestions);
        setStoredNumber(optionsStoredNames.gameDurationTimeSeconds, this.state.gameDurationTimeSeconds);
        this.props.onChangeFn();
    }

    setHskLevel = (level: string) => {
        if (this.state.hskLevel === +level) return;
        this.setState({hskLevel: +level}, this.saveOptions);
    }

    setJunDaMax = (junDaMax: string) => {
        if (this.state.jundaMax === +junDaMax) return;
        this.setState({jundaMax: +junDaMax}, this.saveOptions);
    }

    setGameDurationQuestions = (gameDurationQuestions: string) => {
        if (this.state.gameDurationQuestions === +gameDurationQuestions) return;
        this.setState({gameDurationQuestions: +gameDurationQuestions}, this.saveOptions);
    }

    setGameDurationTimeSeconds = (gameDurationTimeSeconds: string) => {
        if (this.state.gameDurationTimeSeconds === +gameDurationTimeSeconds) return;
        this.setState({gameDurationTimeSeconds: +gameDurationTimeSeconds}, this.saveOptions);
    }

    handleChangeIncludeLowerHskLevels: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.checked;
        if (this.state.includeLowerHskLevels === newValue) return;
        this.setState({includeLowerHskLevels: newValue}, this.saveOptions);
    }

    handleCharacterSetChange = (ff: CharacterSetOptions) => {
        if (this.state.characterSet === ff) return;
        this.setState({characterSet: ff}, this.saveOptions);
    }

    handleWordListTypeChange = (ff: WordListType) => {
        if (this.state.wordListType === ff) return;
        this.setState({wordListType: ff}, this.saveOptions);
    }

    handleGameDurationTypeChange: React.ChangeEventHandler<HTMLInputElement> = (ff) => {
        const newValue = ff.target.value;
        if (this.state.gameDurationType === newValue) return;
        this.setState({gameDurationType: newValue}, this.saveOptions);
    }

    render() {
        return (
            <div className={'options-panel'}>
                <div className={'options-panel__flex'}>
                    {/*************************************************************/}
                    <p className={'options-panel__section-name'}>Game Length</p>
                    {/*************************************************************/}
                    <div className={'options-panel__section__inner'}>
                        <label>
                            <input type="radio"
                                   value="time"
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
                        <label>
                            <input type="radio"
                                   value="questions"
                                   checked={this.state.gameDurationType === 'questions'}
                                   onChange={this.handleGameDurationTypeChange}/>
                            &nbsp;Questions:&nbsp;
                            <label>
                                <select value={this.state.gameDurationQuestions}
                                        onChange={e => this.setGameDurationQuestions(e.target.value)}
                                >
                                    {[10, 20, 30, 40, 50, 75, 100].map(c =>
                                        <option value={c} key={c}>{c} Questions</option>
                                    )}
                                </select>
                            </label>
                        </label>

                        <label>
                            <input type="radio"
                                   value="unlimited"
                                   checked={this.state.gameDurationType === 'unlimited'}
                                   onChange={this.handleGameDurationTypeChange}/>
                            &nbsp;Unlimited&nbsp;
                        </label>
                    </div>

                    {/*************************************************************/}
                    <p className={'options-panel__section-name'}>Word List</p>
                    {/*************************************************************/}
                    <div className={classNames(
                        `options-panel__section`,
                        {'options-panel__section__active': this.state.wordListType === 'HSK'})}
                         onClick={() => this.handleWordListTypeChange('HSK')}>
                        <div className={'options-panel__section__inner'}>
                            <span>
                                HSK Level:&nbsp;
                                <select
                                    value={this.state.hskLevel}
                                    onChange={e => this.setHskLevel(e.target.value)}>
                                    <option value={HskLevel.HSK1}>Level 1</option>
                                    <option value={HskLevel.HSK2}>Level 2</option>
                                    <option value={HskLevel.HSK3}>Level 3</option>
                                    <option value={HskLevel.HSK4}>Level 4</option>
                                    <option value={HskLevel.HSK5}>Level 5</option>
                                    <option value={HskLevel.HSK6}>Level 6</option>
                                </select>
                            </span>
                            <label>
                                Include lower levels:&nbsp;
                                <input type={'checkbox'}
                                       checked={this.state.includeLowerHskLevels}
                                       onChange={this.handleChangeIncludeLowerHskLevels}></input>
                            </label>

                        </div>
                    </div>

                    <div className={classNames(
                        `options-panel__section`,
                        {'options-panel__section__active': this.state.wordListType === 'JunDa'})}
                         onClick={() => this.handleWordListTypeChange('JunDa')}>
                        <div className={'options-panel__section__inner'}>
                        <span>
                            Jun Da Most Common Characters:&nbsp;
                            <select
                                value={this.state.jundaMax}
                                onChange={e => this.setJunDaMax(e.target.value)}
                            >
                                {[100, 200, 400, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map(n =>
                                    <option value={n} key={n}>{n} Characters</option>)}
                            </select>
                        </span>
                        </div>
                    </div>
                    {/*************************************************************/}
                    <p className={'options-panel__section-name'}>Character Set</p>
                    {/*************************************************************/}
                    {[['Traditional', 'tw'], ['Simplified', 'cn']].map(lang =>
                        <div className={classNames(
                            `options-panel__section`,
                            {'options-panel__section__active': this.state.characterSet === lang[1]})}
                             key={lang[1]}
                             onClick={() => this.handleCharacterSetChange(lang[1] as CharacterSetOptions)}>
                            <div className={'options-panel__section__inner'}>
                                {lang[0]}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    }
}