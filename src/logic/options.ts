import {MatcherDict} from "../dictionaries/matcherDict";

export interface GameLength {
    count: number,
    units: 'seconds' | 'rounds',
}

export interface MatcherGameOptions {
    dictionary: MatcherDict,
    gameLength: GameLength,
    optionCount: number,
}

