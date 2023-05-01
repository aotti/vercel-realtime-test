// DATABASE = SUPABASE
// REALTIME = SWR / PUSHER
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 3000
const monopoliRoute = require('./routes/monopoliRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(monopoliRoute)
app.use(cors())

// app.get('/home', (req, res)=>{
//     res.render('home', {db: 'connected to database'})
// })

app.listen(port, ()=>{ console.log(`listening to port ${port}`) })