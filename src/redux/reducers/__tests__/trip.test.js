import trip from '../trip';
import { setPathStep } from '../../actions';
import { tripStatuses } from '../../../constants';

let state;
describe('Test trip reducer', () => {
  beforeEach(() => {
    state = {
      pathStep: 0,
      currentStation: 0,
      nextStation: 1,
      driver: { name: 'driverName', img: '' },
      status: tripStatuses.notStarted
    };
  });

  it('Should set path point and clear current station if passed path point is not qual current station', () => {
    const out = trip(state, setPathStep(1));

    expect(out).toEqual({
      pathStep: 1,
      currentStation: undefined,
      nextStation: 1,
      driver: { name: 'driverName', img: '' },
      status: tripStatuses.notStarted
    });
  });

  it('Should set path point with passed value', () => {
    const out = trip(
      {
        ...state,
        status: tripStatuses.started,
        tripcurrentStation: undefined,
        pathStep: 1
      },
      setPathStep(2)
    );

    expect(out).toEqual({
      pathStep: 2,
      currentStation: undefined,
      nextStation: 1,
      driver: { name: 'driverName', img: '' },
      status: tripStatuses.started
    });
  });
});
