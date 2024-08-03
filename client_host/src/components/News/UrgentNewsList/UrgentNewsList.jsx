import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UrgentNewsList() {
  const [urgentNews, setUrgentNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news/urgent')
      .then(response => setUrgentNews(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Urgent Список новостей</h1>
      <ul>
        {urgentNews.map((item, index) => (
          <li key={index}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <p>Send Date: {item.sendDate}</p>
            <p>Urgent: {item.isUrgent ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrgentNewsList;
