import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './AddNews.css'; // Импорт стилей

function AddNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    const newsData = { title, content, sendDate, isUrgent, imageUrl };

    axios.post('http://localhost:5000/api/news', newsData)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  const addEmoji = e => {
    let emoji = e.native;
    if (textareaRef.current) {
      const cursorPosition = textareaRef.current.selectionStart;
      const textBeforeCursor = content.substring(0, cursorPosition);
      const textAfterCursor = content.substring(cursorPosition);
      setContent(textBeforeCursor + emoji + textAfterCursor);

      // Set cursor position after the inserted emoji
      setTimeout(() => {
        textareaRef.current.selectionStart = cursorPosition + emoji.length;
        textareaRef.current.selectionEnd = cursorPosition + emoji.length;
        textareaRef.current.focus();
      }, 0);
    }
  };

  return (
    <div className="add-news-container">
      <h1>Добавить новость</h1>
      <form onSubmit={handleSubmit} className="add-news-form">
        <div className="form-group">
          <label htmlFor="title">Тема</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Контент</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            ref={textareaRef}
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="emoji-button"
          >
            {showEmojiPicker ? 'Скрыть эмодзи' : 'Добавить эмодзи'}
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker">
              <Picker data={data} onEmojiSelect={addEmoji} />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="sendDate">Дата отправки</label>
          <input
            id="sendDate"
            type="date"
            value={sendDate}
            onChange={e => setSendDate(e.target.value)}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="isUrgent">Срочная?</label>
          <input
            id="isUrgent"
            type="checkbox"
            checked={isUrgent}
            onChange={e => setIsUrgent(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Ссылка на картинку</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Добавить</button>
      </form>
    </div>
  );
}

export default AddNews;
