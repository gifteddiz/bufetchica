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
  plugins: ["~plugins/vuemask.client.js"],
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    baseURL: "http://andrey-medvedev.ru/dev/bufcrud"
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/wp-json/jwt-auth/v1/token",
            method: "post",
            propertyName: "token"
          },
          user: {
            url: "/wp-json/wp/v2/users/me",
            method: "get",
            propertyName: "name"
          },
          logout: false
        }
      }
    }
  }
};
