import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import useLocalStorage from 'use-local-storage';
import Home from './pages/Home';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import AddTodoModal from './pages/AddTodo';
import EditTodoModal from './pages/EditTodo';
import BucketList from './pages/BucketList';
import { AuthContext } from './AuthContext';
import RequireAuth from './components/RequireAuth';
import { TodoContext } from './contexts/TodoContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

function Layout() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  const [showModalAdd, setShowModalAdd] = useState(false);
  const closeModalAdd = () => setShowModalAdd(false);
  const openModalAdd = () => setShowModalAdd(true);

  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {
        isLoginPage ?
          <Navbar className="custom-navbar" variant="light">
            <Container>
              <Navbar.Brand href="/" className="brand-logo"><i className="bi bi-compass me-1"></i>Wander-List</Navbar.Brand>
            </Container>
          </Navbar>
          : <>
            <Navbar className="custom-navbar" variant="light">
              <Container>
                <Navbar.Brand href="/" className="brand-logo"><i className="bi bi-compass me-1"></i>Wander-List</Navbar.Brand>
                <nav className="navbar navbar-expand-lg">
                  <div className="container-fluid">
                    <ul className="navbar-nav">
                      <li className="nav-item me-4">
                        <a className="nav-link active" aria-current="page" href="/"><i className="bi bi-geo me-1"></i>Home</a>
                      </li>
                      <li className="nav-item me-4">
                        <a className="nav-link" onClick={openModalAdd}><i className="bi bi-file-earmark-plus me-1"></i>Add New WanderTask</a>
                      </li>
                      <li className="nav-item me-4">
                        <a className="nav-link" href="/bucketlist"><i className="bi bi-globe-asia-australia me-1"></i>Bucket List</a>
                      </li>
                    </ul>
                    <Nav className="justify-content-end">
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button></Nav>
                  </div>
                </nav>
              </Container>
            </Navbar>
            <AddTodoModal show={showModalAdd} handleClose={closeModalAdd} />
          </>
      }
      <Outlet />
    </>
  );
}

export default function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [todos, setTodos] = useLocalStorage("todos", []);

  const updateTodoStatus = (todoId, status) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, status } : todo
    );
    setTodos(updatedTodos);
  }
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <TodoContext.Provider value={{ todos, setTodos, updateTodoStatus }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <RequireAuth>
                  <Home />
                </RequireAuth>}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/add" element={
                <RequireAuth>
                  <AddTodoModal />
                </RequireAuth>}
              />
              <Route path="todo/:id" element={
                <RequireAuth>
                  <EditTodoModal />
                </RequireAuth>}
              />
              <Route path="/bucketlist" element={
                <RequireAuth>
                  <BucketList />
                </RequireAuth>} 
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TodoContext.Provider>
    </AuthContext.Provider>
  );
}