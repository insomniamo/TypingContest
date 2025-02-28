export const calculateAccuracy = (input: string, errors: number): number => {
    const totalChars = input.replace(/\s/g, "").length;

    if (totalChars === 0) return 0;
    return parseFloat(((1 - errors / totalChars) * 100).toFixed(0));
}
