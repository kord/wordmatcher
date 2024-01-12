import {TestMandarinDict} from "../dictionaries/mandarin";
import {MatcherDict} from "../dictionaries/matcherDict";

export interface GameLength {
    count: number,
    units: 'seconds' | 'rounds',
}

export interface MatcherGameOptions {
    dictionary?: MatcherDict,
    gameLength?: GameLength,
}

export const defaultOptions: MatcherGameOptions = {
    dictionary: TestMandarinDict,
    gameLength: {count: 45, units: 'seconds'},
}