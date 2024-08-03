import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NewsList.css'; // Импорт стилей

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://13.60.26.36/api/news')
      .then(response => setNews(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://13.60.26.36/api/news/${id}`)
      .then(() => setNews(news.filter(item => item._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="news-list-container">
      <h1>Список новостей</h1>
      <Link to="/add" className="add-news-link">Добавить новость</Link>
      
      <ul className="news-list">
        {news.map(item => (
          <li key={item._id} className="news-item">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <div className="news-item-actions">
              <Link to={`/edit/${item._id}`} state={{ item }} className="edit-link">Редактировать</Link>
              <button onClick={() => handleDelete(item._id)} className="delete-button">Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsList;
