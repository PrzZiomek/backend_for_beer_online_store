
export const promiseWrapper = (fn: () => Promise<{}>, cb: Function) => {
    Promise.resolve(fn()) 
        .then(res => cb(res))
        .catch(err => console.log(err))
}