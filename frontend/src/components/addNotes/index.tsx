import React, { useState } from "react";
import styles from "./page.module.css";
import { Card } from "@mui/material";
import { fetcher } from "@/services/global/api";
import { toast } from "react-toastify";
import { fetchNotesData } from "@/slices/notesSlice";
import { useDispatch } from "react-redux";

export default function AddNotes() {
 // State to manage the details of a new note.
const [newNote, setNewNote] = useState({ title: "", body: "" });

// Dispatch function from Redux to dispatch actions.
const dispatch = useDispatch();

/**
 * Handles the creation of a new note.
 */
const handleCreateNote = async () => {
  // Make an API call to add a new note.
  await fetcher<ResponseType>("/add", "POST", newNote)
    .then((data: any) => {
      if (data.status === 201) {
        // Display a success toast message.
        toast.success(data.data.message, {
          position: "top-center",
        });

        // Fetch updated notes after successful creation.
        fetchNotes();
      }
      // setNotes([...notes, data])
    })
    .finally(() => {
      // Reset the newNote state after creating a note.
      setNewNote({
        title: "",
        body: "",
      });
    });
};

/**
 * Fetches notes from the server and updates the Redux store.
 */
const fetchNotes = async () => {
  // Make an API call to fetch all notes.
  await fetcher("/all").then((res: any) => {
    console.log(res.data);
    // Dispatch the fetched notes data to the Redux store.
    dispatch(fetchNotesData(res.data));
  });
};

/**
 * Handles input changes for creating a new note.
 * @param e - The event object containing information about the input change.
 */
const handleInputChange = (e: any) => {
  const { name, value } = e.target;

  // Update the newNote state with the latest input values.
  setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
};

  return (
    <Card variant="outlined" className={styles.card}>
      <div className={styles.variantContainer}>
        <h1 className={styles.title}>Add Notes</h1>
        <div className={styles.container}>
          <div className={styles.input_containner}>
            <div className={styles.label}>Title</div>
            <input
              type="text"
              name="title"
              className={styles.custom_input}
              value={newNote.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.textarea_wrapper}>
            <div className={styles.label}>Body</div>
            <textarea
              name="body"
              className={styles.textarea}
              value={newNote.body}
              onChange={handleInputChange}
            />
          </div>
          <button className={styles.button} onClick={handleCreateNote}>
            Add notes
          </button>
        </div>
      </div>
    </Card>
  );
}
