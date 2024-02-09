import { useState } from 'react';

const Note = ({ note, deleteNote, updateNote }) => {
  const [localNote, setLocalNote] = useState(note);
  const [updatedNoteMessage, setUpdatedNoteMessage] = useState(null);

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
    setUpdatedNoteMessage('Updated!');
    setTimeout(() => {
      setUpdatedNoteMessage(null)
    }, 2000);
  };

  const label = localNote.important ? 'Make Not Important' : 'Make Important';

  return (
    <li class='note'>
      <form class='edit-note-form' onSubmit={handleSubmit}>
        <input value={localNote.content} onChange={handleContentChange}/>
        <button type="button" onClick={handleImportanceChange}>
          {label}
        </button>
        <button type="submit">Update Note</button>
      </form>
      <button class='delete-note-button' onClick={() => deleteNote(localNote.id)}>
        Delete Note
      </button>
      <p>{updatedNoteMessage}</p>
    </li>
  );
};

export default Note;