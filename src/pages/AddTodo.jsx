import { useContext, useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { TodoContext } from '../contexts/TodoContext';


export default function AddTodoModal({ show, handleClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("to-do");

    const { setTodos } = useContext(TodoContext);

    const handleSelect = (eventKey) => {
        setStatus(eventKey);
    };

    function handleAddTodo(event) {
        event.preventDefault();

        setTodos(currentTodos => [
            ...(Array.isArray(currentTodos) ? currentTodos : []),
            { id: Date.now(), title, description, status },
        ]);
        setTitle("");
        setDescription("");
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <div className="p-4 ">
                    <Modal.Header closeButton className="text-center">
                        <h2 className="fw-light "><i className="bi bi-airplane me-2"></i>Let the adventure begin! What&#39;s on your Wander-List today?</h2>
                    </Modal.Header>
                    <Form onSubmit={handleAddTodo}>
                        <Form.Group className="my-3 fw-medium" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                type="text"
                                placeholder="Book flight tickets"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 fw-medium" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                as="textarea"
                                rows={3}
                                placeholder={`1. Monitor flight prices\n2. Redeem air miles\n3. Check for ticket promos`}
                                required
                            />
                        </Form.Group>

                        <Dropdown className="p-2" onSelect={handleSelect}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="to-do">To-Do</Dropdown.Item>
                                <Dropdown.Item eventKey="in-progress">In Progress</Dropdown.Item>
                                <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Button variant="info" type="submit" className="ms-2 px-3">
                            <i className="bi bi-upload"></i> Save
                        </Button>
                    </Form>
                </div>
            </Modal>
        </>)
}
