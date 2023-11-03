import { useContext } from "react";
import { movieContext } from "../../context/MovieContext";

export default function MovieDisplay({ movie }) {
  //function to return loaded JSX

  const { } = useContext(movieContext);
  console.log("checking movie display", movie);


  const loaded = () => {
    return (
      <>
        <h1>Title: {movie.Title}</h1>
        <h2>Genre: {movie.Genre}</h2>
        <img src={movie.Poster} alt={movie.Title} />
        <h2>Release Date: {movie.Year}</h2>
      </>
    );
  };

  //function to return loading JSX
  const loading = () => {
    return <></>;
  };

  //Ternary operator will determine which functions JSX we will return
  return movie ? loaded() : loading();
}