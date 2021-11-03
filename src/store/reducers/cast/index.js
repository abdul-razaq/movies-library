import { actionTypes } from '../../actions/cast';

const initialState = {
	loading: true,
	error: '',
	castDetails: {},
};

export default function castReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_CAST_LOADING:
			return {
				...state,
				loading: true,
			};
		case actionTypes.UNSET_CAST_LOADING:
			return {
				...state,
				loading: false,
			};
		case actionTypes.SET_CAST_ERROR:
			return {
				...state,
				error: action.payload.error,
			};
		case actionTypes.UNSET_CAST_ERROR:
			return {
				...state,
				error: '',
			};
		case actionTypes.GET_CAST_DETAILS:
			return {
				...state,
				castDetails: action.payload.cast,
			};
		case actionTypes.CLEAR_CAST_DETAILS:
			return {
				...state,
				castDetails: {},
			};
		default:
			return state;
	}
}
