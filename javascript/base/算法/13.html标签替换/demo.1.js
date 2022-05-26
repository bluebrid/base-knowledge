function transform(str) {
    return str.replace(/(=(\w))([^=]*)(=)/g, function (match, $1, $2, $3, $4) {
        return '<' + $2 + '>' + $3 + '</' + $2 + '>';
    })
}

var str = '=gabcd, dsadf ==bsssdff=';
console.log(transform(str));