/**
 *  查找文章中出现频率最高的单词
 * @param {*} article 
 * @returns 
 */
function findMostWord(article) {
  let words = article.split(/\s+/)
  let res = 0
  let resWord = ''
  words.reduce((map, word) => {
    map[word] = map[word] ? map[word] + 1 : 1
    if (map[word] > res) {
      res = map[word]
      resWord = word
    }
    return map
  }, {})
  return resWord
}

console.log(findMostWord(`This is my first article, the article is about my lift, it is very good.`))