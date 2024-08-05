import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './EditModule.css'; // Импорт стилей

function EditModule() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [cost, setCost] = useState('');
    const [date, setDate] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showEmojiPickerCost, setShowEmojiPickerCost] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const textareaRef = useRef(null);
    const textareaRefCost = useRef(null);

    useEffect(() => {
        const ids = location.state?.item._id;
        axios.get(`http://13.60.26.36/api/getmodule/${ids}`)
            .then(response => {
                setTitle(response.data.title)
                setContent(response.data.content);
                setCost(response.data.cost);
                setDate(response.data.date);
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

        adjustHeight(); // Корректировка высоты при загрузке
    }, [content]);

    useEffect(() => {
        const adjustHeight = () => {
            if (textareaRefCost.current) {
                textareaRefCost.current.style.height = 'auto';
                textareaRefCost.current.style.height = `${textareaRefCost.current.scrollHeight}px`;
            }
        };

        adjustHeight(); // Корректировка высоты при загрузке
    }, [cost]);

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://13.60.26.36/api/module/${id}`, {title, content, date, cost })
            .then(() => navigate('/'))
            .catch(error => console.error(error));
    };


    const addEmoji = (e, ref, set, el) => {
        let emoji = e.native;
        if (ref.current) {
          const cursorPosition = ref.current.selectionStart;
          const textBeforeCursor = el.substring(0, cursorPosition);
          const textAfterCursor = el.substring(cursorPosition);
          set(textBeforeCursor + emoji + textAfterCursor);
    
          // Set cursor position after the inserted emoji
          setTimeout(() => {
            ref.current.selectionStart = cursorPosition + emoji.length;
            ref.current.selectionEnd = cursorPosition + emoji.length;
            ref.current.focus();
          }, 0);
        }
      };

    return (
        <div className="edit-seminar-container">
            <h1>Редактировать событие</h1>
            <form onSubmit={handleSubmit} className="edit-seminar-form">
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
                    <label htmlFor="when">Дата</label>
                    <input
                        id="when"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cost">Цена</label>
                    <textarea
                        id="cost"
                        ref={textareaRefCost} // Присоединение ссылки
                        value={cost}
                        onChange={e => setCost(e.target.value)}
                        
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="plan">Контент</label>
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
                            <Picker data={data} onEmojiSelect={(e)=>addEmoji(e, textareaRef, setContent, content)} />
                        </div>
                    )}
                </div>
                <button type="submit" className="submit-button">Редактировать</button>
            </form>
        </div>
    );
}

export default EditModule;
