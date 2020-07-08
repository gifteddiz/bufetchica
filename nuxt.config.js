module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "bufetchica",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  mode: "spa",
  css: [{ src: "~/scss/style.scss", lang: "scss" }],
  plugins: ["~plugins/vuemask.client.js", "~plugins/axios.js"],
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    baseURL: "http://emcq.zapusq.ru"
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/rest/me",
            method: "post",
            propertyName: "token"
          },
          user: {
            url: "/rest/me",
            method: "get",
            propertyName: "name"
          },
          logout: false
        }
      }
    }
  },
  router: {
    base: "/bufet/"
  }
};
