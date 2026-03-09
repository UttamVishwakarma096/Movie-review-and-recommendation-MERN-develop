import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetMovieById } from '../apis/movies';
import Spinner from '../components/Spinner';
import { getDateFormat } from '../helpers';

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GetMovieById(id);
        if (response.success) {
          setMovie(response.data);
        } else {
          setError(response.message || 'Failed to fetch movie');
        }
      } catch (err) {
        setError(err.message || 'Error fetching movie');
      }
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className='p-4 text-red-500'>{error}</div>;
  if (!movie) return <div className='p-4'>No movie found.</div>;

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-2'>{movie.name}</h2>
      <p className='mb-1'>
        <span className='font-semibold'>Release Date:</span>{' '}
        {getDateFormat(movie.releaseDate)}
      </p>
      <p className='mb-1'>
        <span className='font-semibold'>Genre:</span> {movie.genre}
      </p>
      <p className='mb-1'>
        <span className='font-semibold'>Language:</span> {movie.language}
      </p>
      <p className='mb-1'>
        <span className='font-semibold'>Plot:</span> {movie.plot}
      </p>
      {/* Add more fields as needed, e.g. hero, heroine, director, cast */}
    </div>
  );
};

export default MovieInfo;
