import { useState, useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const register = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(credentials);
        localStorage.setItem('users', JSON.stringify(users));
        setIsRegistering(false); // Switch back to login after registering
    };

    const login = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === credentials.username && user.password === credentials.password);
        
        if (userExists) {
            setToken("12345678"); // Set a token for the logged-in user
            navigate("/");
        } else {
            alert("Incorrect username or password.");
        }
    };
    return (
        <body className="login-body">
            <Container>
                <div className="row justify-content-center p-4">
                    <div className="col-6 form-border p-4">
                        <h1 className="my-3 text-center qhajustify-content-center">Adventure awaits! Log in to unlock new horizons.</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    We&#39;ll never share your email with anyone else! Promise!
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={login}>Login</Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </body>
    );
}