/**
 * Deep clone an object
 * @param a object to be cloned, can be any
 */
export function deepClone(a: any): any{
    const b = JSON.parse(JSON.stringify(a))
    return b;
}