import { actionTypes } from '../../actions/movies';

const initialState = {
	movies: [],
	error: '',
};

export default function moviesReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_POPULAR_MOVIES:
			return {
				movies: action.payload.movies,
				error: '',
			};
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
		default:
			return state;
	}
}
