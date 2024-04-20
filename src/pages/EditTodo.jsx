import { useContext, useState } from 'react';
import { Button, Container, Dropdown, Form } from 'react-bootstrap';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTodo() {
    const { todos, setTodos } = useContext(TodoContext);

    const navigate = useNavigate();
    const id = parseInt(useParams().id);
    const currentTodo = todos.filter((todo) => todo.id === id)[0];

    const [title, setTitle] = useState(currentTodo.title);
    const [description, setDescription] = useState(currentTodo.description);
    const [status, setStatus] = useState(currentTodo.status);

    function updateTodo(event) {
        event.preventDefault();
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { id, title, description, status };
            }
            return todo;
        });
        setTodos(updatedTodos);
        navigate("/");
    }

    const handleSelect = (eventKey) => {
        setStatus(eventKey);
    }

    return (
        <body className="edit-body">
            <Container>
                <div className="row justify-content-center p-4">
                    <div className="col-6 form-border p-4">
                        <h1 className="my-3"><i className="bi bi-airplane me-2"></i>Edit WanderTask</h1>
                        <Form onSubmit={updateTodo}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    type="text"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    as="textarea"
                                    rows={3}
                                    required
                                />
                            </Form.Group>
                            <Dropdown className="p-2" onSelect={handleSelect}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")} {/* Display the current status formatted */}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="to-do">To-Do</Dropdown.Item>
                                    <Dropdown.Item eventKey="in-progress">In Progress</Dropdown.Item>
                                    <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Button variant="info" type="submit" className="btn-blue ms-2 px-3">
                            <i className="bi bi-upload"></i>  Save
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </body>
    );

}
