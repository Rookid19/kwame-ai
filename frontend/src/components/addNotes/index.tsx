import React, { useState } from "react";
import styles from "./page.module.css";
import { Card } from "@mui/material";
import { fetcher } from "@/services/global/api";
import { toast } from "react-toastify";
import { fetchNotesData } from "@/slices/notesSlice";
import { useDispatch } from "react-redux";

export default function AddNotes() {
  const [newNote, setNewNote] = useState({ title: "", body: "" });
  const dispatch = useDispatch();

  const handleCreateNote = async () => {
    await fetcher<ResponseType>("/add", "POST", newNote)
      .then((data: any) => {
        if (data.status === 201) {
          toast.success(data.data.message, {
            position: "top-center",
          });
          fetchNotes();
        }
        // setNotes([...notes, data])
      })
      .finally(() => {
        setNewNote({
          title: "",
          body: "",
        });
      });
  };

  const fetchNotes = async () => {
    await fetcher("/all").then((res: any) => {
      console.log(res.data);
      dispatch(fetchNotesData(res.data));
    });
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
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
