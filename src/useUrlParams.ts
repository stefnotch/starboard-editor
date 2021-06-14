export function useURLParams() {
  function getParam(key: string) {
    return new URLSearchParams(window.location.search).get(key);
  }
  function setParam(key: string, value: string | undefined) {
    let urlParams = new URLSearchParams(window.location.search);
    if (value) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }
    history.pushState(
      undefined,
      "",
      location.protocol + "//" + location.host + location.pathname + "?" + urlParams + location.hash
    );
  }
  return {
    getParam,
    setParam,
  };
}
