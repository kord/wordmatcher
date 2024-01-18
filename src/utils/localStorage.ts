const appWidePrefix = 'wm_'

export function getStoredValue(valueName: string): string | undefined {
    const key = `${appWidePrefix}${valueName}`;
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) return storedValue;
    return undefined;
}

export function getStoredNumber(valueName: string): number | undefined {
    const v = getStoredValue(valueName);
    if (!v) return undefined;
    const num = +v;
    return num;
}

export function getStoredBool(valueName: string): boolean {
    const v = getStoredValue(valueName);
    if (v === 'true') return true;
    if (v === 'false') return false;
    // Default to false if we're trying to look up something absurd.
    return false;
}

export function setStoredValue(valueName: string, value: string) {
    const key = `${appWidePrefix}${valueName}`;
    localStorage.setItem(key, value);
}

export function setStoredNumber(valueName: string, value: number) {
    const key = `${appWidePrefix}${valueName}`;
    localStorage.setItem(key, value.toString());
}

export function setStoredBool(valueName: string, value: boolean) {
    const key = `${appWidePrefix}${valueName}`;
    localStorage.setItem(key, value.toString());
}

// const solvedValueMarker = 'solved';
//
// export function markAsSolved(puzzle: DDBoardSpec) {
//     const url = puzzle.url;
//     const key = `${appWidePrefix}solved_${url}`
//     localStorage.setItem(key, solvedValueMarker);
// }
//
// export function hasBeenSolved(puzzle: DDBoardSpec) {
//     const url = puzzle.url;
//     const key = `${appWidePrefix}solved_${url}`
//     const val = localStorage.getItem(key);
//     return val === solvedValueMarker;
// }