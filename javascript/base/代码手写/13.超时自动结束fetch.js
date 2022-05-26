const createFetch =  ( opts = {}) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const timeSpan = 50000
    const request = () => {
        const baseUrl = 'https://cataas.com/api'
        const paramTags =['fail','gif']
        const url = `${baseUrl}/cats?tags=${paramTags.join(',')}`
        return fetch(url, {
            ...opts,
            signal
        }).then(res => res.json()).then(res => res)
    }

    const timer = new Promise((resolve, reject) => {
        setTimeout(() => {
            abortController.abort()
            reject('timeout')
        }, timeSpan)
    })
    return Promise.race([request(), timer])
}




createFetch().then((val) => {
    console.log(val)
}, (error) => {
    console.log(error)
})