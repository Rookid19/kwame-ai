import React from "react";
import styles from "./page.module.css";
import { Card } from "@mui/material";

export default function AddNotes() {
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
            // value={newNote.title}
            // onChange={handleInputChange}
          />
        </div>
        <div className={styles.textarea_wrapper}>
          <div className={styles.label}>Body</div>
          <textarea
            name="body"
            className={styles.textarea}

            // value={newNote.body}
            // onChange={handleInputChange}
          />
        </div>
        <button className={styles.button}>Add notes</button>
      </div>
      </div>
    </Card>
  );
}
