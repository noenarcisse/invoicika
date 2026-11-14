export function extractIdFromURL(url: string): string {
    //weak, code ia c/c
    //ca check truthy mais aucune garantie que le split a pas sorti un arr a len 1, 2, 3
    //et que le -1 va chercher le domain ou protocol
    const id = url.split("/").filter(Boolean).at(-1);
    if (!id) throw new Error("ID couldn't be retrieved");
    return id;
}
