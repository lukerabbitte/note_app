import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import { v4 as uuidv4 } from 'uuid';


const App = () => { 

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [stringSearch, setStringSearch] = useState(false)
  const [stringToSearch, setStringToSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        console.log(`Response is the following: \n${response.data}`)
        setNotes(response.data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()  // avoid page refresh
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: uuidv4()
    }
    const isDuplicate = notes.some(note => note.content === noteObject.content) // 'some' will return as soon as a match is found
    if (!isDuplicate) {
      setNotes(notes.concat(noteObject))
      noteService
        .create(noteObject)
        .then(response => {
          setNotes(notes.concat(response.data))
          setNewNote('')
        })
    }
    else {
      alert('Cannot add duplicate note!')
    }
  }

  const updateNote = (updatedNote) => {
    noteService
      .update(updatedNote.id, updatedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== updatedNote.id ? note : response.data));
      })
      .catch(error => {
        alert('An error occurred while updating the note');
      });
  };

  const deleteNote = id => {
    noteService
      .deleteNote(id)
      .then(response => {
        console.log(response)
        setNotes(notes.filter(n => n.id !== id))
      })
      .catch(error => {
        setErrorMessage(
          `The note with id ${id} and content '${note.content}' could not be deleted`
        );
        setTimeout(() => {
          setErrorMessage(null) 
        }, 5000);
      })
  }

  const handleInputChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleStringSearch = (event) => {
    setStringToSearch(event.target.value)
    setStringSearch(true)
  }

  const filterByImportance = () => {
    setShowAll(!showAll)
  }

  const getFilteredNotes = (notes) => {
    const filters = {
      showAll: note => showAll || note.important === true,
      stringSearch: note => !stringSearch || note.content.includes(stringToSearch), // or operator cuts off if first operand is true
      // Add more filters here as needed
    };
    return notes.filter(note => Object.values(filters).every(filter => filter(note)));
  }
  
  const filteredNotes = getFilteredNotes(notes);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div class='substring-search'>
        <input value={stringToSearch} onChange={handleStringSearch}/>
        🔍
      </div>
      {/* 
      <div>
        <button onClick={filterByImportance}>
          Show {showAll ? 'Important' : 'All' }
        </button>
      </div>
    */}
      <ul class='notes'>
        {filteredNotes.map(note => 
          <Note 
            key={note.id} 
            note={note}
            deleteNote={() => deleteNote(note.id)} 
            updateNote={updateNote}
          />
        )}
      </ul>
      <form class='add-note-form' onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange}/>
        <button type="submit">Post Tweet</button>
      </form>
      <Footer />
    </div>
  )
}

export default App