import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'
import { primaryContext } from './context/PrimaryProvider'
import MovieReviews from './pages/MovieReviews'
import FindMovies from './pages/FindMovies'
import AccountSettings from './pages/AccountSettings'
import { movieContext } from './context/MovieContext'
import Login_SignUp from './pages/Login_SignUp'


function App() {


  const { movie, setMovie, searchTerm } = useContext(movieContext);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(primaryContext);

  // if (!isLoggedIn) {
  //   return <Login_SignUp />;
  // }


  return (
    <>
      <NavBar className="sticky-top" />
      <Container fluid>
        <Row>
          <Col md={12} className="vh-100 overflow-auto">
            <Routes>
              <Route path='/' element={<MovieReviews />} />
              <Route path='/movies' element={<FindMovies />} />
              {/* Add other routes as needed */}
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App
