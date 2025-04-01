import React, { useState, useCallback, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField, Stack } from "@mui/material";
import TaskList from "../TaskList";
import FilterButton from "../FilterButton";
import styles from "./index.module.css";

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

type FilterType = "all" | "incomplete" | "completed";

interface TodoCardProps {
    language: 'ru' | 'en';
    currentDate: string;
}

const TodoCard: React.FC<TodoCardProps> = ({ language, currentDate }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState<FilterType>("all");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log("Загружаем задачи для дня:", currentDate);
        const savedTasks = localStorage.getItem(currentDate);

        if (savedTasks !== null) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                setTasks(parsedTasks);
                console.log("Задачи загружены:", parsedTasks);
            } catch (error) {
                console.error("Ошибка загрузки задач:", error);
                setTasks([]);
            }
        } else {
            console.log("Нет сохраненных задач, создаем пустой список.");
            setTasks([]);
        }

        setIsLoaded(true);
    }, [currentDate]);

    useEffect(() => {
        if (isLoaded) {
            console.log("Сохраняем задачи для дня:", currentDate, tasks);
            localStorage.setItem(currentDate, JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

    const addTask = useCallback(() => {
        if (!newTask.trim()) return;
        const newTaskObj = { id: uuidv4(), text: newTask, completed: false };
        console.log("Добавляем задачу для дня: ", currentDate);

        setTasks(prev => {
            const updatedTasks = [...prev, newTaskObj];
            return updatedTasks;
        });
        setNewTask("");
    }, [newTask, currentDate]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    const toggleTask = useCallback((id: string) => {
        setTasks(prev => prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    }, []);

    const clearCompleted = useCallback(() => {
        const updatedTasks = tasks.filter(task => !task.completed);
        setTasks(updatedTasks);
    }, [tasks]);

    const filteredTasks = useMemo(() => tasks.filter(task => {
        if (filter === "incomplete") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    }), [tasks, filter]);

    return (
        <div className={styles.todoCard}>
            <div className={styles.title}>
                <h1 className={styles.titleText}>
                    {language === 'ru' ? "TO-DO: Пора за работу, мой Лорд!" : "TO-DO: Time to work, my Lord!"}
                </h1>
                <img className={styles.titleImage} src={"/mlord.jpg"} alt={"mlord"} />
            </div>
            <div className={styles.addTask}>
                <TextField
                    variant="standard"
                    value={newTask}
                    onChange={(e) => setNewTask((e.target as HTMLInputElement).value)}
                    placeholder={language === 'ru' ? "Время вписать задачу, Милорд..." : "Time to write a task, My Lord..."}
                    fullWidth
                    className={styles.taskInput}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={addTask} variant="contained" color="primary" fullWidth className={styles.buttonAdd}>
                    {language === 'ru' ? "Добавить" : "Add"}
                </Button>
            </div>

            <TaskList tasks={filteredTasks} toggleTask={toggleTask} />

            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className={styles.stack}>
                <span>{tasks.filter(t => !t.completed).length} {language === 'ru' ? "задач осталось" : "tasks left"}</span>
                <Stack direction="row" spacing={1}>
                    {(["all", "incomplete", "completed"] as FilterType[]).map(f => (
                        <FilterButton
                            key={f}
                            filter={f}
                            currentFilter={filter}
                            setFilter={setFilter}
                            language={language}
                        />
                    ))}
                </Stack>
                <Button variant="outlined" color="secondary" onClick={clearCompleted} className={styles.buttonClear}>
                    {language === 'ru' ? "Очистить выполненные" : "Clear completed"}
                </Button>
            </Stack>
        </div>
    );
};

export default TodoCard;
