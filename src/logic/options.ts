import {MatcherDict, WordEntry} from "../dictionaries/matcherDict";
import {TestMandarinDict} from "../dictionaries/mandarin";

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
    EnglishWordToChineseCharacter,
    ChineseCharacterToEnglishWord,
    ChineseCharacterToPinyin,
    PinyinToChineseCharacter,
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
    dictionary: TestMandarinDict,
    gameLength: {count: 45, units: 'seconds'},
    optionCount: 4,
    objectives: [
        {objective: MatcherRoundObjective.EnglishWordToChineseCharacter, relativeWeight: .25},
        {objective: MatcherRoundObjective.ChineseCharacterToEnglishWord, relativeWeight: .25},
        {objective: MatcherRoundObjective.ChineseCharacterToPinyin, relativeWeight: .25},
        {objective: MatcherRoundObjective.PinyinToChineseCharacter, relativeWeight: .25},
    ]
}