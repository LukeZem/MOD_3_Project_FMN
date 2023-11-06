import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar'
import axios from 'axios'
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
      <Navbar className="sticky-top" />
      <Container fluid className="px-0">
        <Row className="gx-0">
          {/* Left column for Routes, taking up half the viewport height */}
          <Col md={6} className="vh-100 overflow-auto">
            <Routes>
              <Route path='/' element={<MovieReviews />} />
              <Route path='/account' element={<AccountSettings />} />
              {/* Add other routes as needed */}
            </Routes>
          </Col>
          {/* Right column for FindMovies/displayMoves, also taking up half the viewport height */}
          <Col md={6} className="vh-100 overflow-auto">
            <FindMovies />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App
