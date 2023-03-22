import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {  BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill, BsFillTagFill, BsCalendar2Fill, BsPeopleFill } from "react-icons/bs"

import MovieCard from "../components/MovieCard"

import "./Movie.css"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Movie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [genre, setGenre] = useState("")
  const [cast, setCast] = useState([])
  const [director, setDirector] = useState("")

  const getMovie = async(url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovie(data)
    setGenre(data.genres[0].name)
  }

  const getCast = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setCast(data.cast)
  }

  const getDirector = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    const director = data.crew.find(member => member.job === "Director")
    if (director) {
      setDirector(director.name)
    }
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  const releaseYear = movie ? new Date(movie.release_date).getFullYear() : null;

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR`
    const castUrl = `${moviesURL}${id}/credits?${apiKey}`
    const directorUrl = `${moviesURL}${id}/credits?${apiKey}`
    
    getMovie(movieUrl)
    getCast(castUrl)
    getDirector(directorUrl)
  }, [])

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsFillTagFill /> Genêro:
            </h3>
            <p>
              {genre}
            </p>
          </div>
          <div className="info">
            <h3>
              <BsCalendar2Fill /> Ano de lançamento:
            </h3>
            <p>{releaseYear}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info">
            <h3>
              <BsPeopleFill /> Elenco:
            </h3>
            <ul>
              {cast.slice(0, 5).map((person) => (
                <li key={person.id}>{person.name}</li>
              ))}
            </ul>
            {director && (
              <div className="director">
                <h3>
                  <BsPeopleFill />Diretor:
                </h3>
                <p>{director}</p>
              </div>
            )}
          </div>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  )
}
  
export default Movie