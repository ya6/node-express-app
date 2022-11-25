const express = require ('express')

const app = express()


app.get('/', (req, res)=> {
    res.send('Hi from server')
})

app.listen(3000, ()=> {
    console.log('listening on port 3000');
})