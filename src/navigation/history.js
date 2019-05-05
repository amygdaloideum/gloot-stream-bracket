import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function navigate(path, replace = false) {
  if (replace) {
    history.replace(`${path === '/' ? '' : path}`);
  } else {
    history.push(`${path === '/' ? '' : path}`);
  }
}

export { history, navigate };
