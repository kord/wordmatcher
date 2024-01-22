import {defaultOptions} from "./matcherGameOptions";
import {WordEntry} from "../dictionaries/matcherDict";
import {Lang} from "../dictionaries/languages";
import {pinyin} from "pinyin-pro";
import {
    MatcherGameOptions,
    MatcherRoundData,
    MatcherRoundObjective,
    MatcherRoundRecord,
    MatcherRoundResult
} from "./gameOptionsTypes";

// Taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export type GameScore = {
    right: number,
    wrong: number,
    attempted: number,
}

export class MatcherGameLogic {
    options: MatcherGameOptions;
    currentRound: MatcherRoundData;
    roundHistory: MatcherRoundRecord[];
    correctAnswers: number;
    incorrectAnswers: number;
    lastResult?: MatcherRoundResult;

    constructor(options: Partial<MatcherGameOptions> = {}) {
        this.options = {...defaultOptions, ...options};
        if (typeof this.options.duration !== "string" && 'count' in this.options.duration) {
            if (this.options.duration.units === "rounds" && this.options.duration.count < 1)
                throw new Error('Game length needs to be positive.');
        }

        this.roundHistory = [];
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;

        // Normalize the objective weightings to sum to 1.
        let totalObjectiveWeight = 0;
        this.options.objectives.forEach(o => totalObjectiveWeight += o.relativeWeight);
        this.options.objectives.forEach(o => o.relativeWeight /= totalObjectiveWeight);
        if (totalObjectiveWeight <= 0)
            throw new Error(`Objectives configured incorrectly: ${this.options.objectives}`)

        this.currentRound = this.getNewRandomRound();
    }

    public currentScore(): GameScore {
        return {
            attempted: this.roundHistory.length,
            right: this.correctAnswers,
            wrong: this.incorrectAnswers,
        }
    }

    public applyGuessForCurrentRound(choice: number) {
        const result = choice === this.currentRound.answerIndex ?
            MatcherRoundResult.Success : MatcherRoundResult.Failure;
        this.roundHistory.push({
            data: this.currentRound,
            userSelection: choice,
            result: result,
        });
        this.lastResult = result;
        if (result === MatcherRoundResult.Success) this.correctAnswers++;
        if (result === MatcherRoundResult.Failure) this.incorrectAnswers++;

        this.currentRound = this.getNewRandomRound();
    }

    private getRandomObjective(): MatcherRoundObjective {
        const rand = Math.random();
        let tot = 0;
        const objectives = this.options.objectives;
        for (let i = 0; i < objectives.length; i++) {
            tot += objectives[i].relativeWeight;
            if (rand < tot) {
                return objectives[i].objective;
            }
        }
        console.error('getRandomObjective failed for some stupid reason.');
        return MatcherRoundObjective.FirstLangToSecondLang;
    }

    private getNewRandomRound(): MatcherRoundData {
        const nextObjective = this.getRandomObjective();
        // console.log(`next objective is ${nextObjective}`);
        return this.getNewRound(nextObjective);
    }

    // This builds random rounds of the matcher game.
    private getNewRound(objective: MatcherRoundObjective): MatcherRoundData {
        const dict = this.options.dictionary;
        let ret: Partial<MatcherRoundData> = {};
        let hint: WordEntry;
        let answer: WordEntry;
        let options: WordEntry[];
        let pair: [WordEntry, WordEntry];

        // Depending on the type of puzzle we need, we have to do different things.
        // Get a random word pair, and populate the options with distinct possibilities.
        // TODO: Mess with the probabilities, probably in a heavy server, so that the puzzles can be made hard or
        //  easy, and enforce arbitrary distributional criteria.
        switch (objective) {
            case MatcherRoundObjective.FirstLangToSecondLang:
                pair = dict.random();
                hint = pair[0];
                answer = pair[1];
                options = [pair[1]];
                while (options.length < this.options.optionCount) {
                    const next = dict.random()[1];
                    if (options.every(opt => opt.word !== next.word))
                        options.push(next);
                }
                break;
            case MatcherRoundObjective.SecondLangToFirstLang:
                pair = dict.random();
                hint = pair[1];
                answer = pair[0];
                options = [pair[0]];
                while (options.length < this.options.optionCount) {
                    const next = dict.random()[0];
                    if (options.every(opt => opt.word !== next.word))
                        options.push(next);
                }
                break;
            case MatcherRoundObjective.FirstLangToPinyin:
                pair = dict.random();
                hint = pair[0];
                answer = {lang: Lang.Pinyin, word: pinyin(hint.word)};
                options = [answer];
                while (options.length < this.options.optionCount) {
                    const next = pinyin(dict.randomLength(hint.lang, hint.word.length).word);
                    if (options.every(opt => opt.word !== next))
                        options.push({lang: Lang.Pinyin, word: next});
                }
                break;
            case MatcherRoundObjective.PinyinToFirstLang:
                pair = dict.random();
                const sourceLang = pair[0].lang;
                hint = {lang: Lang.Pinyin, word: pinyin(pair[0].word)};
                answer = pair[0];
                options = [answer];

                while (options.length < this.options.optionCount) {
                    const next = dict.randomLength(sourceLang, pair[0].word.length).word;
                    if (options.every(opt => opt.word !== next))
                        options.push({lang: sourceLang, word: next});
                }
                break;
        }

        shuffle(options);
        return {
            answer: answer,
            hint: hint,
            options: options,
            answerIndex: options.indexOf(answer),
        };
    }
}