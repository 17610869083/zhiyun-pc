import { createHashHistory } from 'history';
const history = createHashHistory();
const location = history.location;

export {
    history,
    location
}