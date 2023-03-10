import React from 'react';

function UserCard(props) {
    return (
        <div className="user-card">
            <h2>{props.name}</h2>
            <ul>
                <li>Имя: {props.name}</li>
                <li>Дата рождения: {props.birthday}</li>
                <li>Телефон: {props.phone}</li>
                <li>Email: {props.email}</li>
                <li>Кол-во отработанных дней: {props.days}</li>
                <li>Ставка/день: {props.wage}</li>
            </ul>
        </div>
    );
}

export default UserCard;
