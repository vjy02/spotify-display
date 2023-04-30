export function catchErrors (fn)  {
    return function(...args) {
      return fn(...args).catch((err) => {
        console.error(err);
      })
    }
}