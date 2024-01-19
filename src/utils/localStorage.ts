import {HskLevel} from "../dictionaries/languages";
import {
    AppOptions,
    CharacterSetOptions,
    GameDuration,
    HskLexicon,
    JunDaLexicon,
    WordListOptions,
    WordListType
} from "../logic/gameOptionsTypes";
import {OptionsPanelState} from "../components/optionsPanel";

const appWidePrefix = 'wm_'

export const optionsStoredNames = {
    wordListType: 'options-wordListType',
    hskLevel: 'options-hskLevel',
    jundaMin: 'options-jundaMin',
    jundaMax: 'options-jundaMax',
    includeLowerHskLevels: 'options-includeLowerHskLevels',
    characterSet: 'options-characterType',
    gameDurationType: 'options-gameDurationType',
    gameDurationQuestions: 'options-gameDurationQuestions',
    gameDurationTimeSeconds: 'options-gameDurationTimeSeconds',
}

export const optionsDefaultValues : OptionsPanelState = {
    wordListType: 'HSK',
    hskLevel: HskLevel.HSK1,
    jundaMin: 1,
    jundaMax: 400,
    includeLowerHskLevels: false,
    characterSet: 'tw',
    gameDurationType: 'unlimited',
    gameDurationQuestions: 30,
    gameDurationTimeSeconds: 45,
}

export function getStoredValue(valueName: string): string | undefined {
    const key = `${appWidePrefix}${valueName}`;
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) return storedValue;
    return undefined;
}

export function getStoredNumber(valueName: string): number | undefined {
    const v = getStoredValue(valueName);
    if (!v) return undefined;
    return +v;
}

export function getStoredBool(valueName: string): boolean {
    const v = getStoredValue(valueName);
    if (v === 'true') return true;
    if (v === 'false') return false;
    // Default to false if we're trying to look up something absurd.
    return false;
}

export function setStoredValue(valueName: string, value: string) {
    const key = `${appWidePrefix}${valueName}`;
    localStorage.setItem(key, value);
}

export function setStoredNumber(valueName: string, value: number) {
    const key = `${appWidePrefix}${valueName}`;
    localStorage.setItem(key, value.toString());
}

export function setStoredBool(valueName: string, value: boolean) {
    const key = `${appWidePrefix}${valueName}`;
    localStorage.setItem(key, value.toString());
}

function getStoredCharacterSet(): CharacterSetOptions  {
    const valueName = optionsStoredNames.characterSet;
    const value = getStoredValue(valueName);
    if (value === 'tw' || value == 'cn') return value;
    return optionsDefaultValues.characterSet as CharacterSetOptions;
}

function getStoredGameDuration(): GameDuration {
    const gameDurationType = getStoredValue(optionsStoredNames.gameDurationType);
    if (gameDurationType === 'unlimited') return 'unlimited';
    if (gameDurationType === 'time') {
        const gameDurationTimeSeconds = getStoredValue(optionsStoredNames.gameDurationTimeSeconds);
        if (gameDurationTimeSeconds !== undefined && +gameDurationTimeSeconds > 0) {
            return {units: "seconds", count: +gameDurationTimeSeconds} as GameDuration;
        }
    } else if (gameDurationType === 'rounds') {
        const gameDurationQuestions = getStoredValue(optionsStoredNames.gameDurationQuestions);
        if (gameDurationQuestions !== undefined && +gameDurationQuestions > 0) {
            return {units: "rounds", count: +gameDurationQuestions} as GameDuration;
        }
    }

    return optionsDefaultValues.gameDurationType as GameDuration;
}

function getStoredWordListType() : WordListType {
    const wordListType = getStoredValue(optionsStoredNames.wordListType);
    if (['HSK' , 'JunDa' , 'SimpTrad' , 'TaiwanPlaces'].some(t => t === wordListType))
        return wordListType as WordListType;
    return optionsDefaultValues.wordListType as WordListType;
}

function getStoredHskOptions() : HskLexicon {
    const level = getStoredNumber(optionsStoredNames.hskLevel) || optionsDefaultValues.hskLevel;
    const includeLower = getStoredBool(optionsStoredNames.includeLowerHskLevels) || optionsDefaultValues.includeLowerHskLevels;
    return {level: level, includeLowerLevels: includeLower};
}

function getStoredJunDaOptions() : JunDaLexicon {
    const jundaMin = getStoredNumber(optionsStoredNames.jundaMin) || optionsDefaultValues.jundaMin;
    const jundaMax = getStoredNumber(optionsStoredNames.jundaMax) || optionsDefaultValues.jundaMax;
    return {firstWord: jundaMin, lastWord: jundaMax};
}

function getStoredWordListSelection() : WordListOptions {
    const wordListType = getStoredWordListType();
    if (wordListType === 'HSK') return getStoredHskOptions();
    else if (wordListType === 'JunDa') return getStoredJunDaOptions();
    else return wordListType;
}

export function getAppOptionsFromLocalStorage(): AppOptions {
    return {
        duration: getStoredGameDuration(),
        wordlist: getStoredWordListSelection(),
        characterSet: getStoredCharacterSet(),
    }
}