import { useContext } from "react";
import { movieContext } from "../../context/MovieContext";
import { Button, Card } from "react-bootstrap";

export default function MovieDisplay({ movies }) {
  //function to return loaded JSX

  console.log("checking movie display", movies);


  const loaded = () => {
    return (
      <>
        {movies.map((movie, index) => ( // Ensure the use of arrow function and brackets here
          <Card key={movie.imdbID} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movie.Poster} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Year}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  };

  //function to return loading JSX
  const loading = () => {
    return <></>;
  };

  //Ternary operator will determine which functions JSX we will return
  return !movies.length == 0 ? loaded() : loading();
}