const express = require('express');
const bodyParser = require('body-parser');
const EventEmitter = require("events");
const event = new EventEmitter();
const app = express();
const PORT = process.env.PORT || 3030


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
let todoTasks= [];



app.get('/', (req , res ) => {
    res.render("index.ejs" , {todoTasks});
});


app.post("/" , (req , res ) =>{
      const newTask = req.body.task;
      const newItem = { id: todoTasks.length , text: newTask };
      todoTasks.push(newItem);
    res.redirect('/');
});

app.post('/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    todoTasks = todoTasks.filter(item => item.id !== itemId);
    res.redirect('/');
  });




app.listen(PORT , () => {
    console.log(`Server is live on ${PORT} !`);
});
