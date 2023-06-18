export function pickRandom(array, count) {
    if (count === 0) {
        throw new RangeError("The argument count was 0");
    }

    if (count > array.length || count < 0) {
        throw new RangeError(
            "The argument count was outside the bounds of the array"
        );
    }

    const copy = [...array];
    return copy.sort(() => 0.5 - Math.random()).slice(0, count);
}
