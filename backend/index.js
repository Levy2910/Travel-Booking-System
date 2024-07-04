const express = require("express");
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

require("dotenv").config();

const connectDB = require("./db/index");
connectDB();

app.use("/api", require("./routes/route"));



const PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server Is Running at bajska PORT: ${PORT}`);
    }
});