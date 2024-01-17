import { Card } from "@mui/material";
import React from "react";
import styles from "./page.module.css";

type Props = {};

export default function ShowNotes({}: Props) {
  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5, 6,7,8].map((item, i) => (
        <Card key={i} className={styles.card}>
          dsfdsfds
        </Card>
      ))}
    </div>
  );
}
