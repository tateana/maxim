const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


exports.oxford = functions.https.onRequest((request, response) => {
    if (request.method === 'OPTIONS') {
        response.set("Access-Control-Allow-Origin", "*");
        response.set("Access-Control-Allow-Methods", "GET, POST");
        response.status(200).send();
    }

    const axios = require("axios");
    const url = `https://od-api.oxforddictionaries.com/api/v1${request.path}`
    console.log(url)

    const headers = {
        'Accept': "application/json",
        'app_id': "3566db7d",
        'app_key': "1168bdb378f7f221abc002ff1583aa19"
    }

    axios.get(url, { headers }).then(result => {
        response.set("Access-Control-Allow-Origin", "*");
        response.set("Access-Control-Allow-Methods", "GET, POST");
        response.status(200).send(result.data);
        return;
    }).catch(error => response.status(500).send(error));

});
