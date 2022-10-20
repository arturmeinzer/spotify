// eslint-disable-next-line import/prefer-default-export
export const immutableMove = (arr, from, to) => arr.reduce((prev, current, idx, self) => {
    if (from === to) {
        prev.push(current);
    }
    if (idx === from) {
        return prev;
    }
    if (from < to) {
        prev.push(current);
    }
    if (idx === to) {
        prev.push(self[from]);
    }
    if (from > to) {
        prev.push(current);
    }
    return prev;
}, []);
