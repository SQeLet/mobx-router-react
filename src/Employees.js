import React, {Component, useEffect} from 'react';
import { useState } from 'react';
import {observable} from 'mobx';
import {render} from "react-dom";
import {Link} from "react-router-dom";
import {Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';


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
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [days, setDays] = useState('');
    const [wage, setWage] = useState('');

    const [nameDirty, setNameDirty] = useState(false);
    const [birthdayDirty, setBirthdayDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [daysDirty, setDaysDirty] = useState(false);
    const [wageDirty, setWageDirty] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    const [nameError, setNameError] = useState('Имя не может быть пустым.');
    const [birthdayError, setBirthdayError] = useState('Укажите дату рождения!');
    const [phoneError, setPhoneError] = useState('Укажите телефон!');
    const [emailError, setEmailError] = useState('Почта не может быть пустой.');
    const [daysError, setDaysError] = useState('Работник должен отрабатывать хотя бы 1 день!');
    const [wageError, setWageError] = useState('Ставка должна соответсовать МРОТ!');

    useEffect(() =>{
            if (nameError || birthdayError || phoneError || emailError || daysError || wageError){
                setInputValid(false);
            }
            else {
                setInputValid(true);
            }
        }, [nameError, birthdayError, phoneError, emailError, daysError, wageError]);

    const nameHandler = (e) => {
        setName(e.target.value);
        const val = e.target.value;
        if (val !== ''){
            setNameError('');
        }
        else{
            setNameError('Имя не может быть пустым.');
        }
    }

    const birthdayHandler = (e) => {
        setBirthday(e.target.value);
        const re = /^\d{4}-\d{2}-\d{2}$/;
        if (!re.test(String(e.target.value))){
            setBirthdayError('Введите дату рождения!');
        }
        else{
            setBirthdayError('');
        }
    }

    const phoneHandler = (e) => {
        setPhone(e.target.value);
        const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        if (!re.test(String(e.target.value))){
            setPhoneError('Некорректный номер телефона');
        }
        else{
            setPhoneError('');
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Некорректный e-mail');
        }
        else{
            setEmailError('');
        }
    }

    const daysHandler = (e) => {
        setDays(e.target.value);
        const re = /^(3[01]|[12]\d|[1-9])$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setDaysError('Количество дней может быть от 1 до 31.');
        }
        else{
            setDaysError('');
        }
    }

    const wageHandler = (e) => {
        setWage(e.target.value);
        const val = e.target.value;
        if(val > 0){
            setWageError('');
        }
        else{
            setWageError('Ставка должна быть больше 0!');
        }
    }



    const blurHandler = (e) => {
        switch (e.target.name){
            case 'name':
                setNameDirty(true);
                break;

            case 'birthday':
                setBirthdayDirty(true);
                break;

            case 'phone':
                setPhoneDirty(true);
                break;

            case 'email':
                setEmailDirty(true);
                break;

            case 'days':
                setDaysDirty(true);
                break;

            case 'wage':
                setWageDirty(true);
                break;
        }
    }

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
        <div style={{ textAlign: 'center' }}>
            <Container style={{ width: '80%'}}>
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <td>Имя</td>
                    <td>Дата рождения</td>
                    <td>Телефон</td>
                    <td>Почта</td>
                    <td>Дни работы</td>
                    <td>Дневная ставка</td>
                </tr>
                <tr>
                    <td>
                        {(nameDirty && nameError) && <div style={{color:'red'}}>{nameError}</div>}
                        <input type="name" name={"name"}
                               onChange={e => nameHandler(e)}
                               onBlur={e => blurHandler(e)}
                        value={name}
                        onSubmit={e => setName(e.target.value)} /></td>
                    <td>
                        {(birthdayDirty && birthdayError) && <div style={{color:'red'}}>{birthdayError}</div>}
                        <input type={"date"} name={"birthday"}
                               onChange={e => birthdayHandler(e)}
                               onBlur={e => blurHandler(e)}
                        value={birthday}
                        onSubmit={e => setBirthday(e.target.value)} /></td>
                    <td>
                        {(phoneDirty && phoneError) && <div style={{color:'red'}}>{phoneError}</div>}
                        <input type={"tel"} name={"phone"}
                               onChange={e => phoneHandler(e)}
                               onBlur={e => blurHandler(e)}
                        value={phone}
                        onSubmit={e => setPhone(e.target.value)} /></td>
                    <td>
                        {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                        <input type={"email"} name={"email"}
                               onChange={e => emailHandler(e)}
                               onBlur={e => blurHandler(e)}
                        value={email}
                        onSubmit={e => setEmail(e.target.value)} /></td>
                    <td>
                        {(daysDirty && daysError) && <div style={{color:'red'}}>{daysError}</div>}
                        <input type={"text"} name={"days"}
                               onChange={e => daysHandler(e)}
                               onBlur={e => blurHandler(e)}
                        value={days}
                        onSubmit={e => setDays(e.target.value)} /></td>
                    <td>
                        {(wageDirty && wageError) && <div style={{color:'red'}}>{wageError}</div>}
                        <input type={"text"} name={"wage"}
                               onChange={e => wageHandler(e)}
                               onBlur={e => blurHandler(e)}
                        value={wage}
                        onSubmit={e => setWage(e.target.value)} /></td>
                </tr>
                </thead>
                <tbody>
                {res}
                </tbody>
            </Table>
            </Container>
            <h1>Добавить работника:</h1>
            <Button disabled={!inputValid} as={"input"} type={"submit"} value={"Добавить"} variant={"success"} onClick={() => {
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
                setEmail('');
                setDays('');
                setWage('');
            }} />
        </div>
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