/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotesData, notesData } from "@/slices/notesSlice";
import { fetcher } from "@/services/global/api";

type Props = {};

export default function ShowNotes({}: Props) {
  const [open, setOpen] = React.useState(false);
  const [newNote, setNewNote] = useState<any>({ title: "", body: "", id: "" });

  // Selects notes data from the Redux store.
const notes = useSelector(notesData);

// Dispatch function from Redux to dispatch actions.
const dispatch = useDispatch();

/**
 * Opens the modal for editing a note.
 * @param item - The note item to be edited.
 */
const EditNote = (item: any) => {
  setOpen(true);
  setNewNote({
    title: item.title,
    body: item.body,
    id: item.id,
  });
};

/**
 * Deletes a note.
 * @param item - The note item to be deleted.
 */
const deleteNote = (item: any) => {
  // Calls the delete API endpoint and logs the response.
  fetcher(`/delete/${item.id}`, "DELETE").then((res) => {
    console.log(res);
    // Fetches updated notes after deletion.
    fetchNotes();
  });
};

/**
 * Fetches notes from the server and updates the Redux store.
 */
const fetchNotes = async () => {
  // Calls the fetch API endpoint and logs the response data.
  await fetcher("/all").then((res: any) => {
    console.log(res.data);
    // Dispatches the fetched notes data to the Redux store.
    dispatch(fetchNotesData(res.data));
  });
};

// Fetches notes when the component mounts.
useEffect(() => {
  fetchNotes();
}, []);

// Renders a message when there are no notes available.
if (notes.length === 0) {
  return <div className={styles.info}>No data available yet...</div>;
}


  return (
    <div>
      <BasicModal
        setOpen={setOpen}
        open={open}
        dispatch={dispatch}
        fetchNotes={fetchNotes}
        newNote={newNote}
        setNewNote={setNewNote}
      />
      <div className={styles.container}>
        {notes.map((item: any, i: number) => (
          <Card key={i} className={styles.card}>
            <div className={styles.top}>
              <div
                className={styles.circle}
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <div className={styles.icons}>
                <RiPencilLine
                  size={20}
                  style={{ marginRight: 15 }}
                  onClick={() => {
                    EditNote(item);
                  }}
                />
                <RiDeleteBin6Line size={20} onClick={() => deleteNote(item)} />
              </div>
            </div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.content}>
              {item.body}
              {/* <EllipsisText content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum jkhkjhjkdfgfdgfdgfdgdfggdfgfdgfdgdfgdfdfgdfdfgdgdfdfg hjgg dsfsfdsfdsfdsfsdfsdfdsffdsfdsfsd" /> */}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BasicModal({ setOpen, open, fetchNotes, newNote, setNewNote }: any) {

  // Closes the modal.
const handleClose = () => setOpen(false);

// State to manage the timer for debouncing input changes.
const [timer, setTimer] = useState<NodeJS.Timeout | any>(null);

// State to manage whether the save event has occurred.
const [saveListener, setSaveListener] = useState<any>(false);

// State to display information about the save status.
const [info, setInfo] = useState<any>("");

/**
 * Function to save text to the database.
 */
async function saveTextToDatabase() {
  // Make an API call to save the text to the MySQL database.

  await fetcher<ResponseType>(`/modify/${newNote.id}`, "PUT", newNote)
    .then((data: any) => {
      if (data.status === 200) {
        setInfo("Saved");
        fetchNotes();
      }
      // setNotes([...notes, data])
    })
    .finally(() => {
      // Clear the info message after 4 seconds.
      setTimeout(() => {
        setInfo("");
      }, 4000);
    });
}

/**
 * Handles input changes and triggers the save operation.
 * @param e - The event object containing information about the input change.
 */
const handleInputChange = (e: any) => {
  // Display a "Saving..." message.
  setInfo("Saving...");

  const { name, value } = e.target;

  // Update the newNote state with the latest input values.
  setNewNote((prevNote: any) => ({
    ...prevNote,
    [name]: value,
  }));

  // Reset the timer on each input change.
  clearTimeout(timer);

  // Set a new timer for 10 seconds to debounce input changes.
  setTimer(
    setTimeout(() => {
      // Call your API here using the latest state.
      console.log("Call API with input:", newNote); // Note: Use newNote here

      // Trigger the save operation.
      setSaveListener(!saveListener);
    }, 1000)
  );
};

/**
 * Effect to save the text to the database when the saveListener changes.
 */
useEffect(() => {
  // Check if both title and body are empty before saving.
  if (newNote.title === "" && newNote.body === "") {
    return;
  }

  // Trigger the save operation.
  saveTextToDatabase();
}, [saveListener]);


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {JSON.stringify(newNote)} */}
          <h2>Edit Note</h2>
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
          </div>
          <center className={styles.saving}>{info}</center>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function getRandomColor() {
  const colorsArray: any[] = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
  ];

  const randomIndex = Math.floor(Math.random() * colorsArray.length);
  return colorsArray[randomIndex];
}
