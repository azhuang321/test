export const getNimInstance = async () => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('test')
        },1000)
    });
};
