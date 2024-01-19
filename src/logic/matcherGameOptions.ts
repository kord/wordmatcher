import {simplifiedTraditionalDictionary} from "../dictionaries/simplifiedTraditionalDictionary";
import {getHskMatcherDict} from "../dictionaries/dictionaryUtilities";
import {HskLevel} from "../dictionaries/languages";
import {MatcherGameOptions, MatcherRoundObjective} from "./gameOptionsTypes";

export const defaultOptions: MatcherGameOptions = {
    dictionary: getHskMatcherDict({level: HskLevel.HSK1}),
    gameLength: 'unlimited',
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
    gameLength: 'unlimited',
    optionCount: 4,
    objectives: [
        {objective: MatcherRoundObjective.SecondLangToFirstLang, relativeWeight: .5},
        {objective: MatcherRoundObjective.FirstLangToSecondLang, relativeWeight: .5},
    ]
}