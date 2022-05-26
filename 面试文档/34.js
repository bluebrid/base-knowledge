// https://cataas.com/#/

function getCatByTags(tags) {
    const baseUrl = `https://cataas.com/api`
    const paramTags = tags ? Array.isArray(tags) ? tags : [tags] : ['']
    const url = `${baseUrl}/cats?tags=${paramTags.join(',')}`
    return fetch(url).then(res => res.json()).then(res => res)
}
getCatByTags(['fail','gif']).then(res => console.log(res))
// cute