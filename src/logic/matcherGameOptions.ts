import {MatcherDict, WordEntry} from "../dictionaries/matcherDict";
import {simplifiedTraditionalDictionary} from "../dictionaries/simplifiedTraditionalDictionary";
import {getHskMatcherDict} from "../dictionaries/dictionaryUtilities";
import {HskLevel} from "../dictionaries/languages";

export interface GameLength {
    count: number,
    units: 'seconds' | 'rounds',
}

export interface MatcherGameOptions {
    dictionary: MatcherDict,
    gameLength: GameLength,
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

export const defaultOptions: MatcherGameOptions = {
    dictionary: getHskMatcherDict({level: HskLevel.HSK1}),
    gameLength: {count: 45, units: 'seconds'},
    optionCount: 4,
    objectives: [
        {objective: MatcherRoundObjective.FirstLangToSecondLang, relativeWeight: 1},
        {objective: MatcherRoundObjective.SecondLangToFirstLang, relativeWeight: 1},
        {objective: MatcherRoundObjective.FirstLangToPinyin, relativeWeight: .25},
        {objective: MatcherRoundObjective.PinyinToFirstLang, relativeWeight: .25},
    ]
}

export const defaultSimpTradOptions: MatcherGameOptions = {
    dictionary: simplifiedTraditionalDictionary,
    gameLength: {count: 45, units: 'seconds'},
    optionCount: 4,
    objectives: [
        {objective: MatcherRoundObjective.SecondLangToFirstLang, relativeWeight: .5},
        {objective: MatcherRoundObjective.FirstLangToSecondLang, relativeWeight: .5},
    ]
}