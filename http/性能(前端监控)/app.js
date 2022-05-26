const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = module.exports = express();

// middleware
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public'), {
    etag: true,
    maxAge: 1000
}))


app.post('/monitorPerforence', function (req, res) {
    console.log('Got body:', req.body);
    res.end(JSON.stringify({
        data: 'OK'
    }))
});

if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
