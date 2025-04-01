import React from "react";
import { Card, CardContent, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./index.module.css";

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

const TaskList: React.FC<{ tasks: Task[], toggleTask: (id: string) => void }> = ({ tasks, toggleTask }) => (
    <Card className={styles.taskCard}>
        <CardContent>
            <div className={styles.taskContainer}>
                {tasks.map((task) => (
                    <FormControlLabel
                        key={task.id}
                        control={<Checkbox
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            sx={{
                                color: "#242115",
                                "&.Mui-checked": {
                                    color: "#BA6B2A",
                                },
                                "&:hover": {
                                    backgroundColor: "transparent",
                                }
                            }}
                        />}
                        label={<span className={`${styles.taskText} ${task.completed ? styles.completed : ""}`}>{task.text}</span>}
                    />
                ))}
            </div>
        </CardContent>
    </Card>
);


export default TaskList;
