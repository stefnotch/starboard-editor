export function useURLParams() {
  function getParam(key: string) {
    return new URLSearchParams(window.location.search).get(key);
  }
  function setParam(key: string, value: string) {
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    history.pushState(
      undefined,
      "",
      location.protocol +
        "//" +
        location.host +
        location.pathname +
        "?" +
        urlParams +
        location.hash
    );
  }
  return {
    getParam,
    setParam,
  };
}
