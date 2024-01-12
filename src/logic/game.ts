import {MatcherDict} from "../dictionaries/matcherDict";
import {TestMandarinDict} from "../dictionaries/mandarin";

interface MatcherGameOptions {
    dictionary: MatcherDict,

}

const defaultOptions : MatcherGameOptions = {
    dictionary: TestMandarinDict,
}

export class MatcherGame {
    constructor(options: MatcherGameOptions) {
    }
}