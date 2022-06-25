const sleep = async (timeSpan) => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, timeSpan)
    })
}
async function main  () {
    console.log('start')
    await sleep(1000 * 2)
    console.log('end')
}
main()