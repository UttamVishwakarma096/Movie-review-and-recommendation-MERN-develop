import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/loadersSlice';
import { Rate, message } from 'antd';
import { GetAllMovies } from '../../apis/movies';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();
  const getAllMovies = async () => {
    try {
      dispatch(setLoading(true));
      const data = await GetAllMovies();
      setMovies(data.movies);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  console.log('ddd', movies);
  if (!movies || movies.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-[80vh] text-gray-600 gap-4'>
        <h2 className='text-2xl font-semibold'>No movies available yet</h2>
        <p className='text-sm text-gray-500'>
          Once movies are added, you&apos;ll see them listed here.
        </p>
        {user?.isAdmin && (
          <button
            className='bg-primary text-white px-5 py-2 rounded'
            onClick={() => navigate('/admin')}
          >
            Go to Admin to add movies
          </button>
        )}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-600'>
      {movies.map((movie) => {
        return (
          <div
            key={movie?._id}
            className='cursor-pointer'
            onClick={() => navigate(`/movie/${movie?._id}`)}
          >
            <img
              src={movie?.posters[0] || ''}
              alt={movie?.name || 'Movie poster'}
              className='h-44 w-full rounded object-cover'
            />

            <h1 className='text-xl font-semibold text-gray-600 mt-2'>
              {movie?.name}
            </h1>

            <hr className='my-2' />

            <div className='flex justify-between text-sm'>
              <span>Language</span>
              <span className='capitalize'>{movie?.language}</span>
            </div>

            <div className='flex justify-between text-sm mt-1'>
              <span>Rating</span>
              <Rate
                disabled
                defaultValue={movie?.rating || 0}
                allowHalf
                style={{ color: 'darkred' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
