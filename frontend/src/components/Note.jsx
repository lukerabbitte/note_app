const Note = ({ note, toggleImportance, deleteNote }) => {

  const label = note.important ? 'Make Not Important' : 'Make Important'

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>
        {label}
      </button>
      <button onClick={deleteNote}>
        Delete Note
      </button>
    </li>
  )
}

export default Note