import { actionTypes } from '../../actions/shelf';

const initialState = {
	favorites: [],
	watching: [],
};

export default function shelfReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_SHELF_MOVIES:
			const { favorites, watching } = action.payload;
			return {
				favorites,
				watching,
			};
		case actionTypes.ADD_MOVIE_TO_SHELF:
			return {
				...state,
				[action.payload.shelfType]: action.payload[action.payload.shelfType],
			};
		case actionTypes.REMOVE_MOVIE_FROM_SHELF:
			return {
				...state,
				[action.payload.shelfType]: action.payload[action.payload.shelfType],
			};
		default:
			return state;
	}
}
