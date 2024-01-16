import {pinyin} from 'pinyin-pro';
import {MatcherDict, WordEntry} from "./matcherDict";
import {Lang} from "./languages";
import {MatcherGameLogic} from "../logic/game";
import {simplifiedToTwTraditional} from "./traditionalSimplifiedConverter";
import * as cluster from "cluster";
import {hsk1Wordlist} from "../wordlists/hsk1";


export {}

//
// let trans = '';
// trans = pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
// console.log(trans)
//
// trans = pinyin('english'); // 'hàn yǔ pīn yīn'
// console.log(trans)

//
// const testWords: [string, string][] = [
//     ['爱', 'love'],
//     ['八', 'eight'],
//     ['不', 'not'],
//     ['吃', 'eat'],
//     ['东西', 'thing'],
//     ['都', 'both'],
//     ['饭店', 'restaurant'],
//     ['狗', 'dog'],
//     ['回', 'to go back'],
//     ['会', 'can'],
// ];

// We want to trim a long definition down into just the first section before the ';' character.
// This is a bit of a cheap hack, and maybe we should be manually editing the wordlists.
function shortDefinition(w: string) {
    const loc = w.search(';')
    if (loc > 1) return w.substring(0, loc);
    else return w;
}

export function wordListToMatcherInput(wordList: [string, string][]): [WordEntry, WordEntry][] {
    return wordList.map(words => [
        {lang: Lang.ChineseSimplified, word: words[0]},
        {lang: Lang.English, word: shortDefinition(words[1]), definition: words[1]}]);
}

function wordListToSimpTradMatcherDictInput(words: [string, string][]) {
    // Drop all of the english words.
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

export const TestSimplifiedDict = new MatcherDict(wordListToMatcherInput(hsk1Wordlist));
