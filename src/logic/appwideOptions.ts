import {GameLength} from "./matcherGameOptions";
import {HskLevel} from "../dictionaries/languages";

export interface HskLexicon {
    level: HskLevel,
    includeLowerLevels?: boolean,
}

export interface JunDaLexicon {
    firstWord: number,
    lastWord: number,
}

export interface AppOptions {
    duration: GameLength,
    wordlist: HskLexicon | JunDaLexicon | 'SimpTrad',
}