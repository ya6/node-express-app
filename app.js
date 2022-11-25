const express = require ('express');
const chalk = require ('chalk');
const debug = require('debug')('app');
const morgan = require ('morgan')

const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res)=> {
    res.send('Hi from server')
});

app.listen(3000, ()=> {
    // console.log('listening on port 3000');
    debug('listening on port '+ chalk.green('3000'));
});