import produce from 'immer';
import getRandomUser from '../../data/usres';
import { tripStatuses } from '../../constants';

const { name: driverName, img: driverImg } = getRandomUser();

const INITIAL_STATE = {
  pathStep: 0,
  currentStation: 0,
  nextStation: 1,
  driver: { name: driverName, img: driverImg },
  status: tripStatuses.notStarted,
  startDate: undefined
};
const trip = produce((draft = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'START_TRIP':
      draft.status = tripStatuses.started;
      draft.startDate = action.startDate;
      break;
    case 'END_TRIP':
      draft.status = tripStatuses.ended;
      break;
    case 'SET_PATH_STEP':
      draft.pathStep = action.pathStep;
      if (action.pathStep !== draft.currentStation) {
        draft.currentStation = undefined;
      }
      break;
    case 'SET_STATION':
      draft.currentStation = action.currentStation;
      draft.nextStation = action.nextStation;
      break;
    case 'RESET_TRIP':
      return INITIAL_STATE;
    default:
      return draft;
  }
});

export default trip;
