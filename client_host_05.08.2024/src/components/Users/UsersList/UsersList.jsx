import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UsersList.css';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState({});

    useEffect(() => {
        axios.get('http://13.60.26.36/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleCommentChange = (userId, value) => {
        setComments(prevComments => ({ ...prevComments, [userId]: value }));
        
        // Send the PUT request to update the comment
        axios.put(`http://13.60.26.36/api/users/${userId}/coment`, { coment: value })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div className="users-list-container">
            <h1>Список пользователей</h1>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Дата прибытия</th>
                        <th>Дата последнего взаимодействия</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Имя пользователя</th>
                        <th>Номер телефона</th>
                        <th>Направление</th>
                        <th>Формат обучения</th>
                        <th>Оплата за модуль №1</th>
                        <th>Оплата за модуль №2</th>
                        <th>Оплата за модуль №3</th>
                        <th>Оплата за весь курс</th>
                        <th>Дата навчання Модуль 1</th>
                        <th>Дата навчання Модуль 2</th>
                        <th>Дата навчання Модуль 3</th>
                        <th>Дата навчання Полный курс</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>

                            <td style={{ width: "100px" }}>{formatDate(user.arrival_date) || 'N/A'}</td>
                            <td style={{ width: "100px" }}>{user.last_interaction_format || 'N/A'}</td>
                            <td >{user.first_name || 'N/A'}</td>
                            <td >{user.last_name || 'N/A'}</td>
                            <td >{user.username || 'N/A'}</td>
                            <td >{user.contact || 'N/A'}</td>
                            <td >{user.first_question === 'want_to_participate_in_events' ? 'Хочу участвовать в событиях' : user.first_question === 'want_to_be_rehabilitologist' ? 'Хочу быть реабилитологом': user.first_question === 'want_to_upgrade_qualification' ? 'Хочу повысить квалификацию':''}</td>
                            <td >{user.second_question || 'N/A'}</td>
                            <td  className={user.payment_status_module_1 === 'Paid' ? 'Оплачено' : 'not-paid'}>
                                {user.payment_status_module_1 === 'Paid' ? 'Оплачено' : 'Не оплачено'}
                            </td>
                            <td data-label="Payment Status Module 2" className={user.payment_status_module_2 === 'Paid' ? 'Оплачено' : 'not-paid'}>
                                {user.payment_status_module_2 === 'Paid' ? 'Оплачено' : 'Не оплачено'}
                            </td>
                            <td  className={user.payment_status_module_3 === 'Paid' ? 'Оплачено' : 'not-paid'}>
                                {user.payment_status_module_3 === 'Paid' ? 'Оплачено' : 'Не оплачено'}
                            </td>
                            <td className={user.payment_status_all_course === 'Paid' ? 'Оплачено' : 'not-paid'}>
                                {user.payment_status_all_course === 'Paid' ? 'Оплачено' : 'Не оплачено'}
                            </td>
                            <td>{user.date_learn_module_1 || 'N/A'}</td>
                            <td>{user.date_learn_module_2 || 'N/A'}</td>
                            <td>{user.date_learn_module_3 || 'N/A'}</td>
                            <td>{user.date_learn_all_course || 'N/A'}</td>
                            <td data-label="Comments">
                                <textarea
                                    value={comments[user._id] || ''}
                                    onChange={(e) => handleCommentChange(user._id, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;
