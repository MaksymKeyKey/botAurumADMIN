import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './EditSchelude.css'; // Импорт стилей

function EditSchelude() {
  const [month, setMonth] = useState('');
  const [schelude, setSchelude] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const textareaRef = useRef(null); // Ссылка на textarea

  useEffect(() => {
    const ids = location.state?.item._id;
    axios.get(`http://13.60.26.36/api/getshelude/${ids}`)
      .then(response => {
        setMonth(response.data.month);
        setSchelude(response.data.schelude);
      })
      .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    // Установка высоты textarea в зависимости от содержимого
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    adjustHeight(); // Корректировка высоты при загрузке
  }, [schelude]);

  const handleSubmit = event => {
    event.preventDefault();
    axios.put(`http://13.60.26.36/api/schelude/${id}`, { month, schelude })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  const addEmoji = e => {
    let emoji = e.native;
    if (textareaRef.current) {
      const cursorPosition = textareaRef.current.selectionStart;
      const textBeforeCursor = schelude.substring(0, cursorPosition);
      const textAfterCursor = schelude.substring(cursorPosition);
      setSchelude(textBeforeCursor + emoji + textAfterCursor);

      // Set cursor position after the inserted emoji
      setTimeout(() => {
        textareaRef.current.selectionStart = cursorPosition + emoji.length;
        textareaRef.current.selectionEnd = cursorPosition + emoji.length;
        textareaRef.current.focus();
      }, 0);
    }
  };

  return (
    <div className="edit-schelude-container">
      <h1>Редактировать расписание</h1>
      <form onSubmit={handleSubmit} className="edit-schelude-form">
        <div className="form-group">
          <label htmlFor="month">Месяц</label>
          <input
            id="month"
            type="text"
            value={month}
            onChange={e => setMonth(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="schelude">Расписание</label>
          <textarea
            id="schelude"
            ref={textareaRef}
            value={schelude}
            onChange={e => setSchelude(e.target.value)} 
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
        <button type="submit" className="submit-button">Редактировать</button>
      </form>
    </div>
  );
}

export default EditSchelude;
