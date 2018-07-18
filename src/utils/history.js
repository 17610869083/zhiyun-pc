import { createHashHistory } from 'history';
const history = createHashHistory();
const location = history.location;
const unlisten = history.listen((location, action) => {
    window.scroll(0,0)
  })
export {
    history,
    location,
    unlisten
}