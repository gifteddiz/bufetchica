<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="@/assets/ajax.gif" alt="Loading..." />
    </div>
    <div class="container" v-if="!isLoading">
      <nuxt-link to="/patients" class="back">
        <svg
          width="13"
          height="21"
          viewBox="0 0 13 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.2071 0.292893C12.5977 0.683417 12.5977 1.31658 12.2071 1.70711L3.41424 10.5L12.2071 19.2929C12.5977 19.6834 12.5977 20.3166 12.2071 20.7071C11.8166 21.0976 11.1834 21.0976 10.7929 20.7071L0.585815 10.5L10.7929 0.292893C11.1834 -0.0976311 11.8166 -0.0976311 12.2071 0.292893Z"
            fill="black"
          />
        </svg>
        <span>Назад</span>
      </nuxt-link>
      <form class="edit-patient" @submit.prevent="saveForm">
        <h2 class="edit-patient__h2">Информация о пациенте</h2>
        <div v-if="!urlId">
          <div class="edit-patient__input-name">E-mail</div>
          <div class="edit-patient__input">
            <input type="email" placeholder="Имя" v-model="parameters.email" />
          </div>
          <div class="edit-patient__input-name">Пароль</div>
          <div class="edit-patient__input">
            <input type="text" placeholder="Имя" v-model="parameters.password" />
          </div>
        </div>
        <div class="edit-patient__input-name">Имя</div>
        <div class="edit-patient__input">
          <input type="text" placeholder="Имя" v-model="parameters.name" />
        </div>
        <div class="edit-patient__input-name">Фамилия</div>
        <div class="edit-patient__input">
          <input type="text" placeholder="Фамилия" v-model="parameters.surname" />
        </div>
        <div class="edit-patient__input-name">Отчество</div>
        <div class="edit-patient__input">
          <input type="text" placeholder="Отчество" v-model="parameters.patronymic" />
        </div>
        <div class="edit-patient__input-name">Дата рождения</div>
        <div class="edit-patient__input">
          <input
            type="text"
            placeholder="Дата рождения"
            v-model="parameters.birthdate"
            v-mask="{ mask: '99/99/9999' }"
          />
        </div>
        <div class="edit-patient__input-name">Адрес</div>
        <div class="edit-patient__select">
          <select v-model="parameters.address">
            <option>ул Щепкина 35</option>
            <option>Орловский пер 7</option>
          </select>
        </div>
        <div class="edit-patient__input-name">Дата поступления</div>
        <div class="edit-patient__input">
          <input
            type="text"
            placeholder="Дата поступления"
            v-model="parameters.arrivaldate"
            v-mask="{ mask: '99/99/9999' }"
          />
        </div>
        <div class="edit-patient__input-name">Номер палаты</div>
        <div class="edit-patient__input">
          <input type="text" placeholder="Номер палаты" v-model="parameters.ward" />
        </div>
        <div class="edit-patient__input-name">Диета</div>
        <div class="edit-patient__select">
          <select v-model="parameters.diet">
            <option v-for="diet in dietsList" :key="diet.id" :value="diet.id">
              {{
              diet.name
              }}
            </option>
          </select>
        </div>
        <div class="edit-patient__input-name">Завтрак</div>
        <div class="edit-patient__select">
          <select v-model="parameters.breakfast">
            <option value="100">01:00</option>
            <option value="200">02:00</option>
            <option value="300">03:00</option>
            <option value="400">04:00</option>
            <option value="500">05:00</option>
            <option value="600">06:00</option>
            <option value="700">07:00</option>
            <option value="800">08:00</option>
            <option value="900">09:00</option>
            <option value="1000">10:00</option>
            <option value="1100">11:00</option>
            <option value="1200">12:00</option>
            <option value="1300">13:00</option>
            <option value="1400">14:00</option>
            <option value="1500">15:00</option>
            <option value="1600">16:00</option>
            <option value="1700">17:00</option>
            <option value="1800">18:00</option>
            <option value="1900">19:00</option>
            <option value="2000">20:00</option>
            <option value="2100">21:00</option>
            <option value="2200">22:00</option>
            <option value="2300">23:00</option>
            <option value="2400">24:00</option>
          </select>
        </div>
        <div class="edit-patient__input-name">Обед</div>
        <div class="edit-patient__select">
          <select v-model="parameters.lunch">
            <option value="100">01:00</option>
            <option value="200">02:00</option>
            <option value="300">03:00</option>
            <option value="400">04:00</option>
            <option value="500">05:00</option>
            <option value="600">06:00</option>
            <option value="700">07:00</option>
            <option value="800">08:00</option>
            <option value="900">09:00</option>
            <option value="1000">10:00</option>
            <option value="1100">11:00</option>
            <option value="1200">12:00</option>
            <option value="1300">13:00</option>
            <option value="1400">14:00</option>
            <option value="1500">15:00</option>
            <option value="1600">16:00</option>
            <option value="1700">17:00</option>
            <option value="1800">18:00</option>
            <option value="1900">19:00</option>
            <option value="2000">20:00</option>
            <option value="2100">21:00</option>
            <option value="2200">22:00</option>
            <option value="2300">23:00</option>
            <option value="2400">24:00</option>
          </select>
        </div>
        <div class="edit-patient__input-name">Полдник</div>
        <div class="edit-patient__select">
          <select v-model="parameters.hightea">
            <option value="100">01:00</option>
            <option value="200">02:00</option>
            <option value="300">03:00</option>
            <option value="400">04:00</option>
            <option value="500">05:00</option>
            <option value="600">06:00</option>
            <option value="700">07:00</option>
            <option value="800">08:00</option>
            <option value="900">09:00</option>
            <option value="1000">10:00</option>
            <option value="1100">11:00</option>
            <option value="1200">12:00</option>
            <option value="1300">13:00</option>
            <option value="1400">14:00</option>
            <option value="1500">15:00</option>
            <option value="1600">16:00</option>
            <option value="1700">17:00</option>
            <option value="1800">18:00</option>
            <option value="1900">19:00</option>
            <option value="2000">20:00</option>
            <option value="2100">21:00</option>
            <option value="2200">22:00</option>
            <option value="2300">23:00</option>
            <option value="2400">24:00</option>
          </select>
        </div>
        <div class="edit-patient__input-name">Ужин</div>
        <div class="edit-patient__select">
          <select v-model="parameters.dinner">
            <option value="100">01:00</option>
            <option value="200">02:00</option>
            <option value="300">03:00</option>
            <option value="400">04:00</option>
            <option value="500">05:00</option>
            <option value="600">06:00</option>
            <option value="700">07:00</option>
            <option value="800">08:00</option>
            <option value="900">09:00</option>
            <option value="1000">10:00</option>
            <option value="1100">11:00</option>
            <option value="1200">12:00</option>
            <option value="1300">13:00</option>
            <option value="1400">14:00</option>
            <option value="1500">15:00</option>
            <option value="1600">16:00</option>
            <option value="1700">17:00</option>
            <option value="1800">18:00</option>
            <option value="1900">19:00</option>
            <option value="2000">20:00</option>
            <option value="2100">21:00</option>
            <option value="2200">22:00</option>
            <option value="2300">23:00</option>
            <option value="2400">24:00</option>
          </select>
        </div>
        <div class="edit-patient__input-name">Кисломолочные продукты</div>
        <div class="edit-patient__select">
          <select v-model="parameters.sourmilk">
            <option value="100">01:00</option>
            <option value="200">02:00</option>
            <option value="300">03:00</option>
            <option value="400">04:00</option>
            <option value="500">05:00</option>
            <option value="600">06:00</option>
            <option value="700">07:00</option>
            <option value="800">08:00</option>
            <option value="900">09:00</option>
            <option value="1000">10:00</option>
            <option value="1100">11:00</option>
            <option value="1200">12:00</option>
            <option value="1300">13:00</option>
            <option value="1400">14:00</option>
            <option value="1500">15:00</option>
            <option value="1600">16:00</option>
            <option value="1700">17:00</option>
            <option value="1800">18:00</option>
            <option value="1900">19:00</option>
            <option value="2000">20:00</option>
            <option value="2100">21:00</option>
            <option value="2200">22:00</option>
            <option value="2300">23:00</option>
            <option value="2400">24:00</option>
          </select>
        </div>
        <div class="edit-patient__input-name">Госпитализация</div>
        <div class="edit-patient__select">
          <select v-model="parameters.hospitalization">
            <option>Амбулаторно</option>
          </select>
        </div>
        <div class="edit-patient__input-name">Прием пищи</div>
        <div class="edit-patient__select">
          <select v-model="parameters.eating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
        </div>
        <div class="edit-patient__saving" v-if="isSaving">
          <img src="~assets/ajax.gif" />
          <span>Сохранение</span>
        </div>
        <input type="submit" class="edit-patient__btn btn-1" value="Сохранить" v-if="!isSaving" />
        <div class="edit-patient__error" v-if="errors.length" v-html="errors[0]"></div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import fetchData from "../mixins/fetchData";

export default {
  middleware: "auth",
  mixins: [fetchData],
  data: function() {
    return {
      isSaving: false,
      errors: []
    };
  },
  computed: {
    ...mapGetters({ dietsList: "menu/dietsList" }),
    urlId() {
      return this.$route.query.id;
    },
    parameters() {
      var data = {};
      if (this.$route.query.id) {
        data = this.$store.getters["patients/getPatient"](this.$route.query.id);
      } else {
        data = {
          email: "",
          password: "",
          name: "",
          surname: "",
          patronymic: "",
          birthdate: "",
          address: "",
          arrivaldate: "",
          ward: "",
          diet: "",
          breakfast: "",
          lunch: "",
          hightea: "",
          dinner: "",
          sourmilk: "",
          hospitalization: "",
          eating: "",
          archived: false,
          selected: [[], [], [], [], [], [], []]
        };
      }
      return { ...data };
    }
  },
  methods: {
    saveForm: function() {
      this.isSaving = true;
      this.$store
        .dispatch("patients/editPatient", { ...this.parameters })
        .then(response => {
          this.isSaving = false;
          if (response.data.error) {
            this.errors = response.data.error.error_desc;
          } else {
            this.errors = [];
          }
        });
    },
    ...mapMutations({ editPatient: "patients/editPatient" })
  }
};
</script>

<style></style>
