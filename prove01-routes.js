const express = require('express');
const fs = require('fs');
const router = express.Router();

const users = ['User 1', 'User 2'];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write(
            '<body><h1>Prove 01 - Create a User</h1><form action="/create-user" method="POST"><label for="username">Create new user</label><br><input type="text" name="username"><button type="submit">Save to users list</button></form>'
        );
        res.write('<br><a href="./users">Click to see list of users</a></body>')
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body><h1>List of Users</h1><ul>');
        // Loop through the users using for...of loop to populate list.
        for (const user of users) {
            res.write(`<li>${user}</li>`);
        }
        res.write('</ul><br><a href="./">Click here to go back to create new user</a></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]); // username=whatever-the-user-entered
            users.push(parsedBody.split('=')[1]);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/users');
        res.end();
    }
}

module.exports.handler = requestHandler;