import {Lang} from "./languages";
import {WordEntry} from "./matcherDict";

const OpenCC = require('opencc-js');

const twConverter = OpenCC.Converter({ from: 'cn', to: 'tw' });

// Convert (default) Simplified words to their traditional counterparts.
export const simplifiedToTwTraditional = (word: WordEntry) => {
    console.assert(word.lang===Lang.ChineseSimplified);
    return {
        word: twConverter(word.word),
        lang: Lang.ChineseTraditional,
    }
}
