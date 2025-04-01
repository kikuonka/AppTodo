import './App.css';
import TodoCard from "./components/TodoCard";
import { useState } from "react";
import { Button } from "@mui/material";

const getCurrentDate = (): string => {
    return new Date().toISOString().slice(0, 10);
};

function App() {
    const [language, setLanguage] = useState<'ru' | 'en'>(() => localStorage.getItem('language') as 'ru' | 'en' || 'ru');
    const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());

    const toggleLanguage = () => {
        const newLanguage = language === 'ru' ? 'en' : 'ru';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const changeDate = (direction: 'next' | 'previous') => {
        const date = new Date(currentDate);
        if (direction === 'next') {
            date.setDate(date.getDate() + 1);
        } else {
            date.setDate(date.getDate() - 1);
        }

        const newDate = date.toISOString().slice(0, 10);
        setCurrentDate(newDate);
    };

    return (
        <>
            <div className="container">
                <div className="language-button">
                    <Button onClick={toggleLanguage} variant="outlined">
                        {language === 'ru' ? 'EN' : 'RU'}
                    </Button>
                </div>

                <div className="date-navigation">
                    <button className="date-button" onClick={() => changeDate('previous')}>&lt;</button>
                    <button className="date-button" onClick={() => changeDate('next')}>&gt;</button>
                </div>

                <div className="date-display">
                    {language === 'ru' ? 'Текущий день: ' : 'Current Date: '} {currentDate}
                </div>

                <TodoCard language={language} currentDate={currentDate} />
            </div>
        </>
    );
}

export default App;
