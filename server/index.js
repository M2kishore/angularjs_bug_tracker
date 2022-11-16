var express = require('express');
const mongoose = require('mongoose')
var app = express();
app.use(express.static('public'));
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/bug')
  .then(res => {
    console.log("Connected to mongodb.")
  })
  .catch(error => console.log(error));

const Bug = require('./Bug.js');

// let bugs = [
//    { id: '1', title: 'Clean House', description: 'clean using thodapam', done: false, priority: "High", status: "Pending" },
//    { id: '2', title: 'Cannot Reach page', description: '404 error not able to find', done: false, priority: "Low", status: "Todo" }
// ];
app.get('/bug', function (req, res) {
   // console.log("get all bugs");
   // res.send(bugs);
   Bug
    .find({})
    .then(bug => {
      res.status(200).json(bug)
      console.log(bug);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err.message});
    })
});

app.get('/bug/:id/', function (req, res) {
   let bugId = req.params.id;
   console.log("bug: " + bugId);
   let bug = bugs.filter(bug => bug.id === parseInt(bugId));
   res.send(bug[0]);
});

app.post('/bug', function (req, res) {
   // console.log(req.body);
   // bugs.push({
   //    id: req.body.id,
   //    title: req.body.title,
   //    description: req.body.description,
   //    priority: req.body.priority,
   //    status: req.body.status,
   //    done: false
   // })
   // res.send();
   const bug = new Bug({
      ...req.body
    })
  
    bug
      .save()
      .then(savedBug => {
        res.status(201).json(savedBug)
      })
      .catch(err => { 
        console.log(err)
        res.status(400).json({ error: err.message});
      })
});
app.delete('/bug/:id', (req, res) => {
   // let bugId = req.params.id;
   // let filteredBugs = bugs.filter((bug => {
   //    return bug.id != bugId;
   // }));
   // bugs = [...filteredBugs]
   // console.log(bugs);
   // res.send();
   Bug.findOneAndDelete({id:req.params.id}).then(bug => {
      res.status(200).json(bug)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err.message })
    })
});

app.put('/bug/:id', (req, res) => {
   // let bugId = req.params.id;
   // console.log("put"+req.body);
   // bugs.filter((bug) => {
   //    console.log(bug.id+" "+bugId);
   //    if (bug.id == bugId) {
   //       bug.title = req.body.title;
   //       bug.description = req.body.description;
   //       bug.priority = req.body.priority;
   //       bug.status = req.body.status;
   //    }
   // });
   // res.send();
   let bugId = req.params.id;
   const bug = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
    }
    Bug.findOneAndUpdate({id:bugId}, bug, { new: true })
      .then(updatedBug => {
        res.json(updatedBug)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err.message })
      })
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})