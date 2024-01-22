import {MatcherDict, WordEntry} from "../dictionaries/matcherDict";
import {HskLevel} from "../dictionaries/languages";

export enum MatcherRoundObjective {
    SecondLangToFirstLang = 100,
    FirstLangToSecondLang,
    FirstLangToPinyin,
    PinyinToFirstLang,
}

export enum MatcherRoundResult {
    Success = 123,
    Failure ,
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
    hskLevel: HskLevel,
    includeLowerLevels?: boolean,
}

export interface JunDaLexicon {
    firstJunDaWord: number,
    lastJunDaWord: number,
}

export type WordListType = 'HSK' | 'JunDa' | 'SimpTrad' | 'TaiwanPlaces';

export interface GameDurationFinite {
    count: number,
    units: 'seconds' | 'rounds',
}

export type GameDuration = GameDurationFinite | 'unlimited';
export type WordListOptions = HskLexicon | JunDaLexicon | 'SimpTrad' | 'TaiwanPlaces';
export type CharacterSetOptions = 'cn' | 'tw';

export interface MatcherGameDictionaryOptions {
    wordlist: WordListOptions,
    characterSet: CharacterSetOptions,
}

export interface MatcherGameOptions {
    dictionary: MatcherDict,
    duration: GameDuration,
    optionCount: number,
    objectives: {
        objective: MatcherRoundObjective,
        relativeWeight: number,
    }[],
}
