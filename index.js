const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors())

let notes = [
	{
		id: 1,
		content: "HTML is easy",
		important: true
	},
	{
		id: 2,
		content: "Browser can execute only JavaScript",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true
	}
]

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	console.log(id)
	const note = notes.find(note => {
		console.log(note.id, typeof note.id, id, typeof id, note.id === id)
		return note.id === id
	})
	console.log(note)

	if (note) {
		res.json(note)
	} else {
		res.status(404).end()
	}
})

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	notes = notes.filter(note => note.id !== id)

	res.status(204).end()
})

const generateId = () => {
	const maxId = notes.length > 0
	? Math.max(...notes.map(n => n.id))
	: 0

	return maxId
}

app.post('/api/notes', (req, res) => {
	const body = req.body

	if (!body.content) {
		return response.status(400).json({
			error: 'content missing'
		})
	}

	const note = {
		id: generateId(),
		content: body.content,
		important: body.important || false
	}
	console.log(note.id + " generated")

	notes = notes.concat(note)
	res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>  {
	console.log(`Server running on port ${PORT}`)
})