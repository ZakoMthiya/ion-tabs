let express = require('express')
let app = express();

let bodyPasrser = require('body-parser');
let backendPort = 8300;

let mock = {
    userData: require('./mock/userData.json'),
    feedData: require('./mock/feedData.json'),
    feedDelete: require('./mock/feedDelete.json')
};

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Methods'
    );
    next();
});

app.use(bodyPasrser.json());
app.use(bodyPasrser.text());
app.use(
    bodyPasrser.urlencoded({
        extended: true
    })
);

app.listen(backendPort, function () {
    console.log('Express server listening on port ' + backendPort);

});

app.post('/login', function (req, res, next) {
    let data = JSON.parse(req.body);
    let username = data.username;
    let password = data.password;

    if (username === 'ZakoMthiya' && password === 'Password') {
        return res.status(200).json(mock.userData);
    }
    else {
        return res.status(200).send('{"error": {"text": "Incorrect username and password"}}');
    }
});

app.post('/feed', function (req, res, next) {
    let data = JSON.parse(req.body);
    let token = data.token;
    let user_id = data.user_id;

    if (token && user_id === '1') {
        return res.status(200).json(mock.feedData);
    }
    else {
        return res.status(200).send('{"error": {"text": "Restricted section"}}');
    }
});

app.post('/feedUpdate', function (req, res, next) {
    
    let data = JSON.parse(req.body);
    let created = Date.now() / 1000;
    if (data.token && data.user_id === "1" && data.feed) {
        return res.status(200).send({
            feedData: {
                feed_id: '1094',
                feed: data.feed,
                user_id_fk: '1',
                created: created
            }
        });
    }
    else {
        return res.status(401).send('Unauthorized Access');
    }
});

app.post('/feedDelete', function (req, res, next) {
    let data = JSON.parse(req.body);
    if (data.token && data.user_id === '1') {
        return res.status(200).json(mock.feedDelete);
    }
    else {
        return res.status(401).send('Unauthorized Access');
    }
})