const express = require('express')
const compression = require('compression')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var cors = require('cors');

module.exports = () => {
    const app = express();
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride('_method'));
    app.use(cors());
    app.use(express.static(process.cwd() + '/public'));
    require('../api/router')(app);

    return app;
}