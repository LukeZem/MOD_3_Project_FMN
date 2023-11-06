import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import { primaryContext } from '../../context/PrimaryProvider';
import { movieContext } from '../../context/MovieContext';


const NavBar = () => {

  const { isLoggedIn } = useContext(primaryContext);
  const { searchTerm, setSearchTerm } = useContext(movieContext);
  const [searchValue, setSearchValue] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(`Searching for ${searchTerm} "${searchValue}"`);
    // replace this console.log with search logic here
    setSearchTerm(searchValue);
    setSearchValue('');
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#"><h1>Movies Critique</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Reviews</Nav.Link>
            <Nav.Link as={Link} to="/movies">Find Movies</Nav.Link>
            {/* {!isLoggedIn ? <Nav.Link as={Link} to="/login">Login</Nav.Link> : <></>} */}
          </Nav>
          <Form className="d-flex" onSubmit={handleFormSubmit}>
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
              name='value'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Button variant="outline-success" type='submit'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar