import { Container, Col, Row } from 'react-bootstrap';
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import TodoCard from '../components/TodoCard';

export default function Home() {
    const todos = useContext(TodoContext).todos;

    console.log(todos);
    const completedTodos = todos.filter(todo => todo.status === 'completed');
    const inProgressTodos = todos.filter(todo => todo.status === 'in-progress');
    const toDoTodos = todos.filter(todo => todo.status === 'to-do');

    return (
        <>
            <body className="body-bg">
                <Container>
                    <h1 className="p-3 title"><i className="bi bi-map me-2 "></i>Your Wander-List!</h1>
                    <h2 className="text-progress mb-2 text-danger">To-Do</h2>

                    <Row>
                        <CardGroup todos={toDoTodos} />
                    </Row>
                    <h2 className="text-progress mb-2 text-warning">In Progress</h2>
                    <Row>
                        <CardGroup todos={inProgressTodos} />
                    </Row>
                    <h2 className="text-progress mb-2 text-success">Completed</h2>
                    <Row>
                        <CardGroup todos={completedTodos} />
                    </Row>
                </Container>
            </body>
        </>
    );
}

function CardGroup({ todos }) {
    return todos.map((todo) => {
        return (
            <Col md={4} key={todo.id}>
                <TodoCard todo={todo} />
            </Col>
        );
    });
}