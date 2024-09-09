const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// File path for notes
const notesFilePath = path.join(__dirname, 'notes.json');

// Load notes from JSON file
function loadNotes() {
    if (fs.existsSync(notesFilePath)) {
        const data = fs.readFileSync(notesFilePath);
        return JSON.parse(data);
    }
    return [];
}

// Save notes to JSON file
function saveNotes(notes) {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}

// Landing page
app.get('/', (req, res) => {
    res.render('index');
});

// Notes page
app.get('/notes', (req, res) => {
    const notes = loadNotes();
    res.render('notes', { notes, note: null });
});

// Save a new note
app.post('/save-note', (req, res) => {
    const { id, title, text } = req.body;
    let notes = loadNotes();
    if (id) {
        // Update existing note
        notes = notes.map(note => note.id === id ? { id, title, text } : note);
    } else {
        // Add new note
        notes.push({ id: uuidv4(), title, text });
    }
    saveNotes(notes);
    res.redirect('/notes');
});

// Delete a note
app.post('/delete-note', (req, res) => {
    const { id } = req.body;
    let notes = loadNotes();
    notes = notes.filter(note => note.id !== id);
    saveNotes(notes);
    res.redirect('/notes');
});

// Get note details
app.get('/note/:id', (req, res) => {
    const { id } = req.params;
    const notes = loadNotes();
    const note = notes.find(note => note.id === id);
    res.render('notes', { notes, note });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



