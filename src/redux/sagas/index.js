import {
  all,
  call,
  fork,
  put,
  putResolve,
  takeEvery,
  take,
  delay,
  spawn,
  select
} from 'redux-saga/effects';
import {
  endTrip,
  setPathStep,
  setStation,
  boardBooking,
  dropoffBooking
} from '../actions';
import { path, stationsIdx, stations } from '../../data';
import {
  bookingWithPickupStation,
  bookingWithDropoffStation,
  currentPathStepSelector,
  tripStatusSelector
} from '../selectors';
import { tripStatuses } from '../../constants';

const TOTAL_TIME = 3 * 60 * 1000;
const STATION_WAIT_TIME = 10000;
const POINT_DELAY =
  (TOTAL_TIME - STATION_WAIT_TIME * stationsIdx.length - 2) /
  (path.length - stationsIdx.length);

function* handleSetPathStep(action) {
  const { pathStep } = action;

  if (stationsIdx.includes(pathStep)) {
    const { id } = stations.find(({ pos }) => pos === pathStep) || {};

    if (Number.isInteger(id)) {
      yield putResolve(setStation(id, id + 1));

      yield fork(handleBoarding);
      yield fork(handleDropoff);
    }
  }
}

function* handleBoarding() {
  const bookingsToBoard = yield select(bookingWithPickupStation);
  for (let i in bookingsToBoard) {
    const { id } = bookingsToBoard[i];
    yield put(boardBooking(id));
  }
}

function* handleDropoff() {
  const bookingsToDropoff = yield select(bookingWithDropoffStation);

  for (let i in bookingsToDropoff) {
    const { id } = bookingsToDropoff[i];
    yield put(dropoffBooking(id));
  }
}

function* watchSetPathStep() {
  yield takeEvery('SET_PATH_STEP', handleSetPathStep);
}

function* watchStartTrip() {
  while (true) {
    const action = yield take(['START_TRIP', 'persist/REHYDRATE']);

    const tripStatus = yield select(tripStatusSelector);

    // To resume the trip in case the state was rehydrated and the trip status is started
    if (action.type === 'START_TRIP' || tripStatus === tripStatuses.started) {
      let pathStep = yield select(currentPathStepSelector);
      while (pathStep < path.length - 1) {
        yield put(setPathStep(pathStep));
        // if station point wait for a while
        if (stationsIdx.includes(pathStep)) {
          yield delay(STATION_WAIT_TIME);
        } else {
          yield delay(POINT_DELAY);
        }
        pathStep++;
      }
      yield put(setPathStep(pathStep));

      yield put(endTrip());
    }
  }
}

export default function* rootSaga() {
  const sagas = [watchSetPathStep, watchStartTrip];

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
