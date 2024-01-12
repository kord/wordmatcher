import {pinyin} from 'pinyin-pro';
import {MatcherDict, WordEntry} from "./matcherDict";
import {Lang} from "./languages";


export {}


let trans = '';
trans = pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
console.log(trans)

trans = pinyin('english'); // 'hàn yǔ pīn yīn'
console.log(trans)

const testWords: [string, string][] = [
    ['爱', 'love'],
    ['八', 'eight'],
    ['不', 'not'],
    ['吃', 'eat'],
    ['东西', 'thing'],
    ['都', 'both'],
    ['饭店', 'restaurant'],
    ['狗', 'dog'],
    ['回', 'to go back'],
    ['会', 'can'],
];

const testDict: [WordEntry, WordEntry][] = testWords.map(words => [
    {lang: Lang.MandarinSimplified, word: words[0]},
    {lang: Lang.English, word: words[1]}]);
// [
//     [{lang: Lang.MandarinSimplified, word: '爱'}, {lang: Lang.English, word: 'love'}],
//     [{lang: Lang.MandarinSimplified, word: '八'}, {lang: Lang.English, word: 'eight'}],
//     [{lang: Lang.MandarinSimplified, word: '不'}, {lang: Lang.English, word: 'not'}],
//     [{lang: Lang.MandarinSimplified, word: '吃'}, {lang: Lang.English, word: 'eat'}],
//     [{lang: Lang.MandarinSimplified, word: '东西'}, {lang: Lang.English, word: 'thing'}],
// ];

export const TestMandarinDict = new MatcherDict(testDict);