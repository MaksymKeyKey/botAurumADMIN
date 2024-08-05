import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ModulesList.css'; // Импорт стилей

function ModuleList() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios.get('http://13.60.26.36/api/module')
      .then(response => setModules(response.data))
      .catch(error => console.error(error));
  }, []);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

  return (
    <div className="seminar-list-container">
      <h1>Модули</h1>
      <ul className="seminar-list">
        {modules.map(item => (
          <li key={item._id} className="seminar-item">
            <p><strong>Тема:</strong> {item.title}</p>
            <p><strong>Дата:</strong> {formatDate(item.date)}</p>
            <p><strong>Цена:</strong> {item.cost}</p>            
            <Link to={`/editmodule/${item._id}`} state={{ item }} className="edit-link">Редактировать</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuleList;
