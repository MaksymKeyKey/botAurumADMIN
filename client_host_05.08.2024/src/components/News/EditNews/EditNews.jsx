import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './EditNews.css'; // Импорт стилей

function EditNews() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const textareaRef = useRef(null);

  useEffect(() => {
    const ids = location.state?.item._id;
    axios.get(`http://13.60.26.36/api/getnews/${ids}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setSendDate(formatDate(response.data.sendDate));
      })
      .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    adjustHeight();
  }, [content]);

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

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.put(`http://13.60.26.36/api/news/${id}`, { title, content, sendDate })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <div className="edit-news-container">
      <h1>Edit News</h1>
      <form onSubmit={handleSubmit} className="edit-news-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            ref={textareaRef}
            value={content}
            onChange={e => setContent(e.target.value)}

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
          <label htmlFor="sendDate">Send Date</label>
          <input
            id="sendDate"
            type="date"
            value={sendDate}
            onChange={e => setSendDate(e.target.value)}
            
          />
        </div>
        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
}

export default EditNews;
