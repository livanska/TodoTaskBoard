export const matchSearch = (current: string, search: string) => {
    // const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    console.log(new RegExp(search, "i").test(current));
    return new RegExp(search, "i").test(current);
};
