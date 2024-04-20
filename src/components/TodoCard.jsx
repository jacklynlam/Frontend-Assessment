import React, { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Card, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CountdownTimer from './CountdownTimer';

export default function TodoCard({ todo }) {

    const { setTodos } = useContext(TodoContext);

    const getInitialDate = () => {
        const savedDate = localStorage.getItem(`countdownEndTime-${todo.id}`);
        return savedDate ? new Date(savedDate) : new Date();
    };

    const [selectedDate, setSelectedDate] = React.useState(getInitialDate());
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        localStorage.setItem(`countdownEndTime-${todo.id}`, date.toISOString());
    };

    const deleteTodo = () => {
        setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id));
        localStorage.removeItem(`countdownEndTime-${todo.id}`)
    };

    const categoryColours = {
        "to-do": "bg-pastel-red text-dark",
        "in-progress": "bg-pastel-orange text-dark",
        "completed": "bg-pastel-green text-dark",
    }

    return (
        <>
            <Card className="my-3 shadow-sm text-center rounded-4">
                <Card.Header className={`${categoryColours[todo.status]} card-header-custom`} as="h5"> {todo.title}</Card.Header>
                <Card.Body>
                    <Card.Title as="h6">{todo.description}</Card.Title>
                    <Card.Text className="mb-4 countdown-style">Countdown: <CountdownTimer endDate={selectedDate} todoId={todo.id} /></Card.Text>
                    <DatePicker className="date-picker-custom mb-3"
                        placeholderText="Select a deadline!"
                        isClearable={true}
                        showTimeSelect
                        dateFormat="dd-MM-yyyy p"
                        minDate={new Date()}
                        selected={selectedDate}
                        onChange={handleDateChange} />
                    <Button variant="outline-primary" href={`todo/${todo.id}`} className="mx-1 action-button">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="outline-danger" onClick={handleShow} className="mx-1 action-button">
                        <i className="bi bi-trash3"></i>
                    </Button>


                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton className="modal-header-custom">
                            <Modal.Title><i className="bi bi-exclamation-triangle-fill me-2"></i>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this? You can&#39;t turn back!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}><i className="bi bi-x-circle me-2"></i>Cancel</Button>
                            <Button variant="danger" onClick={deleteTodo}><i className="bi bi-check-circle me-2"></i>Yes, delete this for me please!
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card >
        </>
    );
}