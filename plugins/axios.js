export default ({ $axios, store }) => {
  $axios.defaults.baseURL = "http://emcq.zapusq.ru";
  if (process.server) {
    return;
  }

  $axios.interceptors.request.use(request => {
    request.baseURL = "http://emcq.zapusq.ru";

    // Get token from auth.js store
    const token = store.state.token;
    console.log(request);
    // Update token axios header
    if (token) {
      request.headers.common["Authorization"] = token;
    }
    return request;
  });
};
