function usePath() {
  const path = window.location.pathname.split('/')[1];
  const setPath = (path) => {
    window.history.pushState(null, null, path);
  };
  return [path, setPath];
}

export default usePath;
