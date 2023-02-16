const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const params = req.body;
    console.log(params);
    res.send('Received params successfully');
});

app.listen(3010, () => {
    console.log('실행중..');
});


module.exports = express;
