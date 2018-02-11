import * as types from '../actions/actionTypes'

const initialState = {
  movieTotal: 0,
  movieList: [],
  isLoadingTail: false,
  isRefreshing: false,
  popup: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT:
      return {
        ...state,
        popup: {
          title: action.payload.title,
          content: action.payload.content
        }
      }
    case types.HIDE_ALERT:
      return {
        ...state,
        popup: null
      }
    case types.FETCH_MOVIES_START:
      return {
        ...state,
        isLoadingTail: action.payload.isLoadingTail,
        isRefreshing: action.payload.isRefreshing
      }
    case types.FETCH_MOVIES_FULLFILLED:
      return {
        ...state,
        movieList: action.payload.movieList,
        movieTotal: action.payload.movieTotal,
        isLoadingTail: action.payload.isLoadingTail,
        isRefreshing: action.payload.isRefreshing
      }
    case types.FETCH_MOVIES_REJECTED:
      return {
        ...state,
        err: action.payload.err,
        isLoadingTail: action.payload.isLoadingTail,
        isRefreshing: action.payload.isRefreshing
      }
    default:
      return state
  }
}
