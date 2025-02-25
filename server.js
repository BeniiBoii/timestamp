// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

const mySecret = process.env['PORT']



// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?",(req,res)=>{
const date = req.params.date;
let newDate;
if(!date){
  newDate=new Date()
}else{
  if(!isNaN(date)){
newDate=new Date(parseInt(date))
}else{
  newDate=new Date(date)
}
  }
  if(newDate.toString()==="Invalid Date"){
res.json({error: newDate.toString()})
  }else{
    res.json({unix:newDate.getTime(),utc:newDate.toUTCString()})
  }
  })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
