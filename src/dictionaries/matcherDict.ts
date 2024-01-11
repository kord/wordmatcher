import {Lang} from "./languages";

type WordEntry = {
    lang: Lang,
    word: string,
    definition?: string,
}

class MatcherDict {
    lang1: Lang;
    lang2: Lang;

    entries: Array<[WordEntry, WordEntry]>;

    l1word: Map<string, WordEntry>;
    l2word: Map<string, WordEntry>;

    constructor(entries: Array<[WordEntry, WordEntry]>) {
        console.assert(entries.length > 0, 'Cannot initialize dictionary with length 0 word list.');
        this.entries = entries;
        this.lang1 = entries[0][0].lang;
        this.lang2 = entries[0][1].lang;

        this.l1word = new Map();
        this.l2word = new Map();

        entries.forEach((entry, index) => {
            this.addPair(entry[0], entry[1]);
        });
    }

    addPair = (a: WordEntry, b: WordEntry) => {
        console.assert(a.lang === this.lang1 && b.lang === this.lang2,
            `Inserting wrong languages into dictionary.`);
        this.l1word.set(a.word, b);
        this.l2word.set(b.word, a);
    }

    random = () => {
        const index = Math.floor(Math.random() * this.entries.length);
        return this.entries[index];
    }


}