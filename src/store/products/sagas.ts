import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ProductsActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://walidsultan.net/TBStockApi/api/Products/Category/'

function* handleFetch(data: any) {

  if (data.type === ProductsActionTypes.LOCATION_CHANGED && data.payload.location.pathname.indexOf('categories') < 0) {
    return;
  }

  try {
    // To call async functions, use redux-saga's `call()`.

    let categoryId: string = data.type === ProductsActionTypes.LOCATION_CHANGED ? data.payload.location.pathname.split('/categories/')[1] : data.payload;

    const res = yield call(callApi, 'get', API_ENDPOINT, categoryId)

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(ProductsActionTypes.FETCH_REQUEST, handleFetch)
  yield takeEvery(ProductsActionTypes.LOCATION_CHANGED, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* productsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default productsSaga
