import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ScheludeList.css'; // Импорт стилей

function ScheludeList() {
  const [schelude, setSchelude] = useState([]);

  useEffect(() => {
    axios.get('http://13.60.26.36/api/schelude')
      .then(response => setSchelude(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="schelude-list-container">
      <h1>Список месяцев</h1>
      <ul className="schelude-list">
        {schelude.map(item => (
          <li key={item._id} className="schelude-item">
            <h2>{item.month}</h2>
            <p>{item.schelude}</p>
            <Link to={`/editshelude/${item._id}`} state={{ item }} className="edit-link">Редактировать</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheludeList;
