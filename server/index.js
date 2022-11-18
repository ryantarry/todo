const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require("./models/Todo");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

app.post('/addtodo', async (req, res) => {
	const entry = req.body.todo;

	const todo = new TodoModel({todo: entry});
	await todo.save();
	res.send('inserted data')
		});

app.get('/read', async (req, res) => {
	TodoModel.find({}, (err, result) => {
		if (err) {
			res.send(err)
		} else {
			res.send(result)
		}
	})
});

app.delete('/delete/:id', async (req, res) => {
	const id = mongoose.Types.ObjectId(req.params.id.trim());
	await TodoModel.findByIdAndDelete(id).exec()
	res.send("deleted")
});




app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});


