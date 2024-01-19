import {MatcherDict, WordEntry} from "../dictionaries/matcherDict";
import {HskLevel} from "../dictionaries/languages";

export interface GameDurationFinite {
    count: number,
    units: 'seconds' | 'rounds',
}
export type GameDuration = GameDurationFinite | 'unlimited';

export interface MatcherGameOptions {
    dictionary: MatcherDict,
    gameLength: GameDuration,
    optionCount: number,
    objectives: {
        objective: MatcherRoundObjective,
        relativeWeight: number,
    }[]
}

export enum MatcherRoundObjective {
    SecondLangToFirstLang = 100,
    FirstLangToSecondLang,
    FirstLangToPinyin,
    PinyinToFirstLang,
}

export enum MatcherRoundResult {
    Success = 1,
    Failure = 2,
}

export interface MatcherRoundData {
    hint: WordEntry,
    answer: WordEntry,
    options: WordEntry[],
    answerIndex: number,
}

export interface MatcherRoundRecord {
    data: MatcherRoundData,
    userSelection: number,
    result: MatcherRoundResult,
}

export interface HskLexicon {
    level: HskLevel,
    includeLowerLevels?: boolean,
}

export interface JunDaLexicon {
    firstWord: number,
    lastWord: number,
}

export type CharacterSetOptions = 'cn' | 'tw';
export type WordListType = 'HSK' | 'JunDa' | 'SimpTrad' | 'TaiwanPlaces';
export type WordListOptions = HskLexicon | JunDaLexicon | 'SimpTrad' | 'TaiwanPlaces';

export interface AppOptions {
    duration: GameDuration,
    wordlist: WordListOptions,
    characterSet: CharacterSetOptions,
}