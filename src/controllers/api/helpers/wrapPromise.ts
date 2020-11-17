export const wrapPromise = (fn: Function, cb: Function) => {
    Promise.resolve(fn()) 
        .then(res => cb(res))
        .catch(err => console.log(err))
}