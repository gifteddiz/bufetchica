export default ({ $axios, store }) => {
  $axios.defaults.baseURL = "https://order.emcmos.ru";
  if (process.server) {
    return;
  }

  $axios.interceptors.request.use(request => {
    request.baseURL = "https://order.emcmos.ru";

    // Get token from auth.js store
    const token = store.state.token;
    // Update token axios header
    if (token) {
      request.headers.common["Authorization"] = token;
    }
    return request;
  });
};
