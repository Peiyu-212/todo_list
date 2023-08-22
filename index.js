import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }))
const todoList = [];
app.get("/today", (req, res) => {
  const today = new Date();
  const data = {
    today: today.toDateString(),
    todoList: todoList.filter(item => item.date === today.toISOString().split('T')[0])
  };
  res.render("index.ejs", data);
  console.log(today.toISOString().split('T')[0])
})

app.get("/work", (req, res) => {
  const data = {
    today: 'Work List',
    todoList: todoList
  };
  res.render("index.ejs", data);
})

app.post("/add", (req, res) => {
  todoList.push({'task': req.body['task'], 'date': req.body['date']})
  const data = {
    today: new Date().toDateString(),
    todoList: todoList
  };
  
  console.log(todoList)
  res.render("index.ejs", data)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
