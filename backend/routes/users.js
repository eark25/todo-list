const express = require('express');
const router = express.Router();
const users = require('../Users');
const uuid = require('uuid');

// get users
router.get('/', (req, res) => res.json(users));

// get 1 user
router.get('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}` })
    };
});

// create user
router.post('/', (req, res) => {
    // res.send(req.body);
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    };
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: 'Please include name and email' });
    };

    users.push(newUser);
    res.send(users);
});

// update user
router.put('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        const upUser = req.body;
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = upUser.name ? upUser.name : user.name;
                user.email = upUser.email ? upUser.email : user.email;

                res.json({ msg: 'User updated', user });
            };
        });
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
    };
});

// delete user
router.delete('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'User deleted',
            users: users.filter(user => user.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
    };
});

module.exports = router;