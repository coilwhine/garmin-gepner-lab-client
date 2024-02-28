export function nameFormater(text: string): string {

    if (text) {
        let firstLetter = text[0];
        let otherLetters = text.slice(1);
        return firstLetter.toUpperCase() + otherLetters;
    }

    return;
}