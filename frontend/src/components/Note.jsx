import { useState } from 'react';

const Note = ({ note, deleteNote, updateNote, updatedNoteMessage }) => {
  const [localNote, setLocalNote] = useState(note);

  const handleContentChange = (event) => {
    setLocalNote({
      ...localNote,
      content: event.target.value
    });
  };

  const handleImportanceChange = () => {
    setLocalNote({
      ...localNote,
      important: !localNote.important
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateNote(localNote);
  };

  const label = localNote.important ? 'Make Not Important' : 'Make Important';

  return (
    <li className='note'>
      <form onSubmit={handleSubmit}>
        <input value={localNote.content} onChange={handleContentChange}/>
        <button type="button" onClick={handleImportanceChange}>
          {label}
        </button>
        <button type="submit">Edit Note</button>
      </form>
      <button onClick={() => deleteNote(localNote.id)}>
        Delete Note
      </button>
      <p>{updatedNoteMessage}</p>
    </li>
  );
};

export default Note;