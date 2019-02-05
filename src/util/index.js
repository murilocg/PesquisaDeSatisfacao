export function sort(arr, name, ordem) {
    if (!arr || arr.length === 0) return [];
    let sortedArr = arr.slice();
    if (isNaN(arr[0][name]))
        return sortString(sortedArr, name, ordem);
    return sortNumber(sortedArr, name, ordem);
}

export function paginacao(pagina, arr) {
    let inicio = ((pagina - 1) * 10);
    return arr.slice(inicio, inicio + 10);
}

function sortNumber(arr, name, ordem) {
    return arr.sort((a, b) => {
        if (ordem === 'asc') return a[name] - b[name];
        return b[name] - a[name];
    });
}

function sortString(arr, name, ordem) {
    return arr.sort((a, b) => {
        if (a[name] === b[name]) return 0;
        if (ordem === 'asc') {
            if (a[name] < b[name]) return -1;
            return 1;
        } else {
            if (a[name] < b[name]) return 1;
            return -1;
        }
    });
}