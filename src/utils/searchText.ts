export const matchSearch = (current: string, search: string) =>
    new RegExp(search, "i").test(current);
