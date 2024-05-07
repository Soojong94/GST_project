// middleware.js
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const express = require('express');

const applyMiddlewares = function(app) {
    app.use(cors({origin: 'http://localhost:3000', credentials: true}));
    app.use(session({
        secret: '121212',
        resave: false,
        saveUninitialized: true,
        cookie: {httpOnly: true,},}));

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(bodyParser.json());
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send('Server Error');
    });

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')},
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + Date.now() + ext)}});
    
    const upload = multer({ storage: storage });
    app.use('/uploads', express.static('uploads'));

    return upload;
}

module.exports = { applyMiddlewares };