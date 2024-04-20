import { useState, useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isRegistering) {
            register();
        } else {
            login();
        }
    };

    const register = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === credentials.username);
        if (userExists) {
            toast.error("Username is already taken. Please choose another one.");
            return;
        }
        users.push(credentials);
        localStorage.setItem('users', JSON.stringify(users));
        toast.success("Registration successful. You can now log in.");
        setIsRegistering(false);
    }

    const login = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === credentials.username && user.password === credentials.password);
        if (userExists) {
            setToken("12345678"); 
            navigate("/");
            toast.success("Login successful");
        } else {
        toast.error("Incorrect username or password.");
        }
    };

    const formVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    
            return (
        <body className="login-body">
                        
            <ToastContainer position="top-center"/>
            <Container>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '70vh' }}>
      
      <div className="welcome-message text-center mb-4">
      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                        transition={{ duration: 1 }}
                        className="text-center mb-4"
                    >
          <h1><i className="bi bi-airplane me-2"></i>Welcome to Wander-List!</h1>
          <h3>Discover and plan your next adventure with us.</h3>
        </motion.div>
      </div>
      <motion.div
                        className="login-form form-container col-md-6 bg-white p-4 border rounded"
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >

                    <h1 className="my-3 text-center">{isRegistering ? "Sign Up for New Adventures!" : "Log In to Unlock New Horizons!"}</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                name="username"
                                type="text"
                                placeholder="Enter username"
                                value={credentials.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={credentials.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                                   <Button variant="primary" className="action-button btn-custom-primary" type="submit">{isRegistering ? "Register. Let's do this!" : "I'm ready to login!"}</Button>
                            <Button variant="secondary" className="btn-custom-secondary" onClick={() => setIsRegistering(!isRegistering)}>
                                {isRegistering ? "Back to Login" : "Need an adventure? Register."}
                            </Button>
                        </div>
                    </Form>
                    </motion.div>
                </div>
                </Container>
                </body>
           
    );}