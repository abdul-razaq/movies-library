import { getPopularMovies } from '../../../api/themoviedb';

export const actionTypes = {
	GET_POPULAR_MOVIES: 'GET_POPULAR_MOVIES',
};

function getPopularMovies() {
  return async function(dispatch, getState) {
    try {
      const popularMovies = await getPopularMovies();
      dispatch({
        type: actionTypes.GET_POPULAR_MOVIES,
        payload: {
          
        },
      });
    } catch (error) {
      
    }
  }
}
