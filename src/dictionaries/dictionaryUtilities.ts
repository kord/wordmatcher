import {HskLevel, Lang} from "./languages";
import {MatcherDict, WordEntry} from "./matcherDict";
import {hsk1Wordlist} from "../wordlists/hsk1";
import {hsk2Wordlist} from "../wordlists/hsk2";
import {hsk3Wordlist} from "../wordlists/hsk3";
import {hsk4Wordlist} from "../wordlists/hsk4";
import {hsk5Wordlist} from "../wordlists/hsk5";
import {hsk6Wordlist} from "../wordlists/hsk6";
import {HskLexicon} from "../logic/appwideOptions";

const OpenCC = require('opencc-js');

const twConverter = OpenCC.Converter({from: 'cn', to: 'tw'});

// We want to trim a long definition down into just the first section before the ';' character.
// This is a bit of a cheap hack, and maybe we should be manually editing the wordlists.
function shortDefinition(w: string) {
    const loc = w.search(';')
    if (loc > 1) return w.substring(0, loc);
    else return w;
}

// Generate a List of WordEntrys on the asusmption that the input is given as a list of
//  [Simplified, Long English definition] pairs.
export function wordListToMatcherInput(wordList: [string, string][]): [WordEntry, WordEntry][] {
    return wordList.map(words => [
        {lang: Lang.ChineseSimplified, word: words[0]},
        {lang: Lang.English, word: shortDefinition(words[1]), definition: words[1]}]);
}

function getHskWordList(hskOptions : HskLexicon): [string, string][] {
    const {level, includeLowerLevels} = hskOptions;
    const ret: [string, string][] = [];
    if (!includeLowerLevels)
        switch (level) {
            case HskLevel.HSK1:
                return hsk1Wordlist;
            case HskLevel.HSK2:
                return hsk2Wordlist;
            case HskLevel.HSK3:
                return hsk3Wordlist;
            case HskLevel.HSK4:
                return hsk4Wordlist;
            case HskLevel.HSK5:
                return hsk5Wordlist;
            case HskLevel.HSK6:
                return hsk6Wordlist;
        }
    else {
        if (level >= HskLevel.HSK6) ret.push(...hsk6Wordlist);
        if (level >= HskLevel.HSK5) ret.push(...hsk5Wordlist);
        if (level >= HskLevel.HSK4) ret.push(...hsk4Wordlist);
        if (level >= HskLevel.HSK3) ret.push(...hsk3Wordlist);
        if (level >= HskLevel.HSK2) ret.push(...hsk2Wordlist);
        if (level >= HskLevel.HSK1) ret.push(...hsk1Wordlist);
        return ret;
    }
}

export function getHskMatcherDict(hskOptions: HskLexicon): MatcherDict {
    return new MatcherDict(wordListToMatcherInput(getHskWordList(hskOptions)));
}



function wordListToSimpTradMatcherDictInput(words: [string, string][]) {
    // Drop all of the english words in the 2nd place.
    const simpWords = words.map(pair => ({lang: Lang.ChineseSimplified, word: pair[0]}));
    const ret: [WordEntry, WordEntry][] = [];
    // Prune the unchanged words.
    simpWords.forEach(simp => {
        const trad = simplifiedToTwTraditional(simp);
        if (simp.word !== trad.word)
            ret.push([simp, trad])
    });
    return ret;
}


// Convert (default) Simplified words to their traditional counterparts.
export const simplifiedToTwTraditional = (word: WordEntry) => {
    console.assert(word.lang === Lang.ChineseSimplified);
    return {
        word: twConverter(word.word),
        lang: Lang.ChineseTraditional,
        definition: word.definition,
    } as WordEntry;
}
