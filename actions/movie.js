import config from '../common/config'
import request from '../common/request'
import * as types from './actionTypes'

export const fetchMovies = feed => {
  return async (dispatch, getState) => {
    let url = config.api.movies
    try {
      const data = await request.get(url)

      if (data && data.success) {
        if (data.data.length > 0) {
          data.data.map(item => item)

          const newMovieList = data.data
          dispatch({
            type: types.FETCH_MOVIES_FULLFILLED,
            payload: {
              movieList: newMovieList,
              movieTotal: data.total,
              isLoadingTail: false,
              isRefreshing: false
            }
          })
        } else {
          dispatch({
            type: types.FETCH_MOVIES_REJECTED,
            payload: {
              isLoadingTail: false,
              isRefreshing: false
            }
          })
        }
      }
    } catch (err) {
      dispatch({
        type: types.FETCH_MOVIES_REJECTED,
        payload: {
          err: err,
          isLoadingTail: false,
          isRefreshing: false
        }
      })
    }
  }
}
