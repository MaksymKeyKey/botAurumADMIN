import React from "react";
import { Link } from "react-router-dom";
import './MainPage.css'; // Подключение CSS-стилей

const MainPage = () => {
    return (
        <div className="container">
            <Link className="link" to={'/news'}>Новости</Link>
            <Link className="link" to={'/schelude'}>Расписание</Link>
            <Link className="link" to={'/seminar'}>Актуальные события</Link>
            <Link className="link" to={'/modules'}>Модули</Link>
            <Link className="link" to={'/users'}>Пользователи</Link>
        </div>
    )
}

export default MainPage;
