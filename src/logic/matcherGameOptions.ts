import {simplifiedTraditionalDictionary} from "../dictionaries/simplifiedTraditionalDictionary";
import {getHskMatcherDict} from "../dictionaries/dictionaryUtilities";
import {HskLevel} from "../dictionaries/languages";
import {MatcherGameOptions, MatcherRoundObjective} from "./gameOptionsTypes";

export const defaultOptions: MatcherGameOptions = {
    dictionary: getHskMatcherDict({hskLevel: HskLevel.HSK1}),
    duration: 'unlimited',
    optionCount: 4,
    objectives: [
        {objective: MatcherRoundObjective.FirstLangToSecondLang, relativeWeight: 1},
        {objective: MatcherRoundObjective.SecondLangToFirstLang, relativeWeight: 1},
        {objective: MatcherRoundObjective.FirstLangToPinyin, relativeWeight: 1},
        {objective: MatcherRoundObjective.PinyinToFirstLang, relativeWeight: 1},
    ]
}

export const defaultSimpTradOptions: MatcherGameOptions = {
    dictionary: simplifiedTraditionalDictionary,
    duration: 'unlimited',
    optionCount: 4,
    objectives: [
        {objective: MatcherRoundObjective.SecondLangToFirstLang, relativeWeight: .5},
        {objective: MatcherRoundObjective.FirstLangToSecondLang, relativeWeight: .5},
    ]
}