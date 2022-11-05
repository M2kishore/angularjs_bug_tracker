var express = require('express');
var app = express();
app.use(express.static('public'));
const cors=require('cors');
app.use(cors());

blogs = [
   { id: 1, title: 'Clean House', description: 'clean using thodapam', done: false, priority: "High", status: "Pending" },
   { id: 2, title: 'Cannot Reach page', description: '404 error not able to find', done: false, priority: "Low", status: "Todo" }
];
app.get('/blog', function (req, res) {
   console.log("get all blogs");
   res.send(blogs);
});

app.get('/blog/:id/', function (req, res) {
   let blogId = req.params.id;
   console.log("blog: "+blogId);
   let blog = blogs.filter(blog => blog.id === parseInt(blogId));
   res.send(blog[0]);
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})