const express = require("express")
const cors = require('cors');
const dotenv = require('dotenv')
const path = require("path")
const { router } = require("./router/router");

// ========= ===================
const app = express();
dotenv.config()

// ======= Middle Ware =========
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT

//* --> Route
app.use('/contact', router)

app.use(express.static(path.join(__dirname,"./build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})
app.listen( PORT ,()=>{
    console.log(`Connected to express server ${PORT}`)
})