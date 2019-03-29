function getHTMLTagText(htmlStr, tagName) {
    let regx = new RegExp(`(<${tagName}>)(^\\1*)</${tageName}>`, 'g')
    let texts = [];
    html.replace(regx, function(match, $1, $2) {
        texts.push($2)
    })
    return texts;
}

console.log(getHTMLTagText('<title>regular expression</title>'), 'title')
// <title>regular expression</title>
// <p>laoyao bye bye</p>
