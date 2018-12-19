const express = require('express')
const path = require('path')

const app = express()
app.get('/*', (req, res, next) => {
    const maxAge =  5
    res.setHeader('Cache-Control', 'public, max-age=' + maxAge)
    res.setHeader("Expires", new Date(Date.now() + maxAge).toUTCString())
    next()
})
app.use(express.static(path.join(__dirname, 'public'), {
    etage: false
}))

if (!module.parent) {
    app.listen(3000, () => {
        console.log('Express started on port 3000')
    })
    
}