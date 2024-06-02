export const binarySearch = <T extends {arr: any[], el: T['arr'][number], reversed: boolean, compareFunc: (a: any, b: any) => number | void}, >(params: T) => {
    const {arr, el, compareFunc, reversed} = params;
    let start = reversed ? arr.length - 1 : 0;
    let end = reversed ? 0 : arr.length - 1;

    while (reversed ? end <= start : start <= end) {
        const pivot = Math.floor((start + end) / 2);
        const compareResult = compareFunc(arr[pivot], el);

        if (compareResult === 0) {
            return {
                index: pivot,
                item: arr[pivot] as T['arr'][number]
            };
        }

        if (compareResult === 1) {
            start = reversed ? pivot - 1 : pivot + 1;
            continue;
        }

        if (compareResult === -1) {
            end = reversed ? pivot  + 1 : pivot - 1;
        }
    }

    return null;
}