const https = require('https');


function processJson(req, res) {
        const source = 'https://byui-cse.github.io/cse341-course/lesson03/items.json'

    https.get(source, function(response){
        let body = '';

        response.on('data', function(chunk){
            body += chunk;
        });

        response.on('end', function(){
            let jsonResponse = JSON.parse(body);
            console.log("Got a response: ", jsonResponse);
            let stuff = {data:jsonResponse, path:'/ta03/'}

            res.render('pages/ta03', stuff);

            // var outputFilename = 'my.json';

            //    fs.writeFile(outputFilename, JSON.stringify(jsonResponse, null, 4), function(err) {
            //       if(err) {
            //          console.log(err);
            //       } else {
            //          console.log("JSON saved to " + outputFilename);
            //       }
            //    }); 
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
}

module.exports = {processJson: processJson};

