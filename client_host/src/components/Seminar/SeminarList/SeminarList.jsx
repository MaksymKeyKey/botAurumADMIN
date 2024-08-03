import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SeminarList.css'; // Импорт стилей

function SeminarList() {
  const [seminar, setSeminar] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/seminar')
      .then(response => setSeminar(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="seminar-list-container">
      <h1>Семинар</h1>
      <ul className="seminar-list">
        {seminar.map(item => (
          <li key={item._id} className="seminar-item">
            <p><strong>Тема:</strong> {item.title}</p>
            <p><strong>Когда?:</strong> {item.when}</p>
            <p><strong>Где?:</strong> {item.where}</p>
            <p><strong>Цена:</strong> {item.cost}</p>
            <Link to={`/editseminar/${item._id}`} state={{ item }} className="edit-link">Редактировать</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeminarList;
