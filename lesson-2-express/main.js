const express = require('express');
const {userService} = require("./services/user.service");

const app = express();

app.use(express.json()); // for parsing application/json to js object
app.use(express.urlencoded({ extended: true })); // use client requests (body) in different formats

// /*** CRUD ***/
// // C => Create
// // R => Read / Retrieve
// // U => Update
// // D => Delete / Destroy
//
// app.get('/users/:name', (req, res) => {
//     console.log('GET req.params.name: ', req.params.name);
//     console.log('GET req.query: ', req.query);
//
//     res.end('Hello from GET');
// });
//
// app.post('/users', (req, res) => {
//     console.log('POST: ', req.body);
//     res.end('Hello from POST');
// });
//
//  app.put('/users', (req, res) => {
//      res.end('Hello from PUT');
//  });
//
// app.patch('/users', (req, res) => {
//     res.end('Hello from PATCH');
// });
//
// app.delete('/users', (req, res) => {
//     res.end('Hello from DELETE');
// });

app.get('/users', async (req, res) => {
    const users = await userService.getAll();

    res.json(users)
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUsersById(id);

    res.json(user)
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const data = await userService.create(user);
    res.json(data)
});

app.listen(5555, () => console.log('Server is running on port 5555'));





