import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './EditSeminar.css'; // Импорт стилей

function EditSeminar() {
    const [title, setTitle] = useState('');
    const [when, setWhen] = useState('');
    const [where, setWhere] = useState('');
    const [cost, setCost] = useState('');
    const [plan, setPlan] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showEmojiPickerCost, setShowEmojiPickerCost] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const textareaRef = useRef(null);
    const textareaRefCost = useRef(null);

    useEffect(() => {
        const ids = location.state?.item._id;
        axios.get(`http://13.60.26.36/api/getseminar/${ids}`)
            .then(response => {
                setTitle(response.data.title)
                setWhen(response.data.when);
                setWhere(response.data.where);
                setCost(response.data.cost);
                setPlan(response.data.plan);
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
    }, [plan]);

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
        axios.put(`http://13.60.26.36/api/seminar/${id}`, {title, when, where, cost, plan })
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
                    <label htmlFor="when">Когда?</label>
                    <input
                        id="when"
                        type="text"
                        value={when}
                        onChange={e => setWhen(e.target.value)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="where">Где?</label>
                    <input
                        id="where"
                        type="text"
                        value={where}
                        onChange={e => setWhere(e.target.value)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cost">Цена</label>
                    <textarea
                        id="plan"
                        ref={textareaRefCost} // Присоединение ссылки
                        value={cost}
                        onChange={e => setCost(e.target.value)}
                        
                    />
                    <button
                        type="button"
                        onClick={() => setShowEmojiPickerCost(!showEmojiPickerCost)}
                        className="emoji-button"
                    >
                        {showEmojiPickerCost ? 'Скрыть эмодзи' : 'Добавить эмодзи'}
                    </button>
                    {showEmojiPickerCost && (
                        <div className="emoji-picker">
                            <Picker data={data} onEmojiSelect={(e)=>addEmoji(e, textareaRefCost, setCost, cost)} />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="plan">План</label>
                    <textarea
                        id="plan"
                        ref={textareaRef} 
                        value={plan}
                        onChange={e => setPlan(e.target.value)}
                        
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
                            <Picker data={data} onEmojiSelect={(e)=>addEmoji(e, textareaRef, setPlan, plan)} />
                        </div>
                    )}
                </div>
                <button type="submit" className="submit-button">Редактировать</button>
            </form>
        </div>
    );
}

export default EditSeminar;
