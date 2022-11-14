var express = require('express');
var app = express();
app.use(express.static('public'));
const cors=require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors());

let bugs = [
   { id: 1, title: 'Clean House', description: 'clean using thodapam', done: false, priority: "High", status: "Pending" },
   { id: 2, title: 'Cannot Reach page', description: '404 error not able to find', done: false, priority: "Low", status: "Todo" }
];
app.get('/bug', function (req, res) {
   console.log("get all bugs");
   res.send(bugs);
});

app.get('/bug/:id/', function (req, res) {
   let bugId = req.params.id;
   console.log("bug: "+bugId);
   let bug = bugs.filter(bug => bug.id === parseInt(bugId));
   res.send(bug[0]);
});

app.post('/bug', function (req, res) {
   console.log(req.body);
   bugs.push({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      done: false
   })
   res.send();
});
app.delete('/bug/:id', (req, res) => {
   let bugId = req.params.id;
   let filteredBugs = bugs.filter((bug=>{
      return bug.id != bugId;
   }));
   bugs = [...filteredBugs]
   console.log(bugs);
   res.send();
 });

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})