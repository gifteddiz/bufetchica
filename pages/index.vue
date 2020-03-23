<template>
  <div class="auth">
    <form class="auth__panel" @submit.prevent="login" novalidate>
      <h1 class="auth__h1">Авторизация</h1>
      <div class="auth__fieldset">
        <div class="auth__label">Ваш e-mail</div>
        <div class="auth__input">
          <input
            type="email"
            placeholder="example@mail.ru"
            v-model="userEmail"
            @keyup="validate"
          />
        </div>
        <div class="auth__input-error" v-if="error.email">
          {{ error.email }}
        </div>
      </div>
      <div class="auth__fieldset">
        <div class="auth__label">Ваш пароль</div>
        <div class="auth__input">
          <input
            type="password"
            placeholder="*********"
            v-model="userPass"
            @keyup="validate"
          />
        </div>
        <div class="auth__input-error" v-if="error.password">
          {{ error.password }}
        </div>
      </div>
      <!-- <label class="auth__remember">
        <input type="checkbox" />
        <div class="auth__remember-label">Запомнить пользователя</div>
      </label> -->
      <input
        type="submit"
        class="auth__submit btn-1"
        value="Войти"
        :disabled="processing"
      />
      <div class="auth__input-error" v-if="error.total">
        {{ error.total }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      userEmail: "",
      userPass: "",
      error: {
        email: "",
        password: "",
        total: ""
      },
      processing: false
    };
  },
  middleware: "guest",
  methods: {
    async login() {
      if (!this.validate()) return false;
      this.processing = true;
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.userEmail,
            password: this.userPass
          }
        });
        this.$router.push("/patients");
      } catch (e) {
        this.error.total = e.response.data.message;
      }
      this.processing = false;
    },
    validate() {
      this.error = {
        email: "",
        password: "",
        total: ""
      };
      if (!this.validEmail(this.userEmail))
        this.error.email = "Неверный формат e-mail";
      if (!this.userEmail.length)
        this.error.email = "E-mail не может быть пустым";
      if (!this.userPass.length)
        this.error.password = "Пароль не может быть пустым";

      if (this.error.email || this.error.password) {
        return false;
      } else {
        return true;
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style></style>
