import React, { Component } from 'react';
import { useState } from 'react';
import {observable} from 'mobx';
import {render} from "react-dom";
import {Link} from "react-router-dom";


let nextId = 0;


const myStore = observable({
    initialList: observable.array([
        {
            id: nextId++,
            name: 'Иванов Иван Иванович',
            birthday: '23.11.1994',
            phone: '78932342354',
            email: 'ivan@mail.ru',
            days: 20,
            wage: 2300
        },

        {
            id: nextId++,
            name: 'Иванов Пётр Иванович',
            birthday: '02.02.1987',
            phone: '78278342354',
            email: 'peter@mail.ru',
            days: 15,
            wage: 2400
        },

        {
            id: nextId++,
            name: 'Петров Иван Иванович',
            birthday: '24.03.1993',
            phone: '78932342354',
            email: 'ivan93@mail.ru',
            days: 17,
            wage: 1900
        },

        {
            id: nextId++,
            name: 'Иванов Алексей Иванович',
            birthday: '07.08.1991',
            phone: '78932342354',
            email: 'ivanov91@mail.ru',
            days: 21,
            wage: 2700
        }
    ]),
});

let App = function List() {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState();
    const [phone, setPhone] = useState('');
    const [email, setMail] = useState('');
    const [days, setDays] = useState();
    const [wage, setWage] = useState();
    const [employees, setEmployees] = useState([myStore.initialList]);

    let res = myStore.initialList.map(function (employee) {
        return <tr key={employee.id}>
            <td><Link to={`/user/${employee.id}`}>{employee.name}</Link></td>
            <td>{employee.birthday}</td>
            <td>{employee.phone}</td>
            <td>{employee.email}</td>
            <td>{employee.days}</td>
            <td>{employee.wage}</td>
        </tr>
    });
    return (
        <>
            <table border="1px">
                <thead>
                <tr>
                    <td>Имя</td>
                    <td>Дата рождения</td>
                    <td>Телефон</td>
                    <td>Почта</td>
                    <td>Дни работы</td>
                    <td>Дневная ставка</td>
                </tr>
                </thead>
                <tr>
                    <td><input
                        value={name}
                        onChange={e => setName(e.target.value)}/></td>
                    <td><input
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}/></td>
                    <td><input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}/></td>
                    <td><input
                        value={email}
                        onChange={e => setMail(e.target.value)}/></td>
                    <td><input
                        value={days}
                        onChange={e => setDays(e.target.value)}/></td>
                    <td><input
                        value={wage}
                        onChange={e => setWage(e.target.value)}/></td>
                </tr>
                <tbody>
                {res}
                </tbody>
            </table>

            <h1>Добавить работника:</h1>
            <button onClick={() => {
                myStore.initialList.push({
                    id: nextId++,
                    name: name,
                    birthday: birthday,
                    phone: phone,
                    email: email,
                    days: days,
                    wage: wage
                });

                setName('');
                setBirthday('');
                setPhone('');
                setMail('');
                setDays('');
                setWage('');

            }}>Add
            </button>
            <button onClick={res}>Update</button>
        </>
    );
}

class Employees extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <App />
            </div>
        );
    }
}

export default Employees;
export {myStore};