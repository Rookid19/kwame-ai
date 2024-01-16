import axios from "axios";
import React, { useEffect, useState } from "react";

function Notes({}) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", body: "" });

  useEffect(() => {
    // Fetch all notes when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleCreateNote = async () => {
    try {
      await axios.post("http://localhost:3000/notes", newNote);
      fetchNotes(); // Refresh the notes after creating a new one
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };
  return (
    <div>
      <div>
        <h1>Notes App</h1>
        <div>
          <h2>Create a New Note</h2>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              name="body"
              value={newNote.body}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleCreateNote}>Create Note</button>
        </div>
        <div>
          <h2>All Notes</h2>
          <ul>
            {notes.map((note: any) => (
              <li key={note.id}>
                <strong>{note.title}</strong>: {note.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Notes;
