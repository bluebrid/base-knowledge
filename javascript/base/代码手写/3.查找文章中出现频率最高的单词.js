<<<<<<< HEAD
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

=======
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

>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(findMostWord(`This is my first article, the article is about my lift, it is very good.`))