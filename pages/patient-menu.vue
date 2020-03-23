<template>
  <div>
    <div class="container">
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
      <div class="page-title">
        <h1 class="page-title__h1">
          {{ parameters.surname }} {{ parameters.name }}
          {{ parameters.patronymic }}
        </h1>
      </div>
      <div class="patient-info">
        <div class="patient-info__item">Палата № {{ parameters.ward }}</div>
        <div class="patient-info__item">{{ parameters.hospitalization }}</div>
        <div class="patient-info__item">id{{ parameters.id }}</div>
        <div class="patient-info__item">Дата добавления 12:23 02.02.2020</div>
      </div>
      <div class="menu-bar">
        <select class="menu-bar__select" v-model="parameters.diet">
          <option v-for="n in dietsQty" :key="n" :value="parseInt(n)">Диета №{{ n }}</option>
        </select>
        <a href="#" class="menu-bar__save">Сохранить диету</a>
      </div>
      <div class="menu-day">
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': currentDay === 1 }"
          @click.prevent="setDay(1)"
        >Понедельник</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': currentDay === 2 }"
          @click.prevent="setDay(2)"
        >Вторник</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': currentDay === 3 }"
          @click.prevent="setDay(3)"
        >Среда</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': currentDay === 4 }"
          @click.prevent="setDay(4)"
        >Четверг</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': currentDay === 5 }"
          @click.prevent="setDay(5)"
        >Пятница</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': currentDay === 6 }"
          @click.prevent="setDay(6)"
        >Суббота</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': currentDay === 7 }"
          @click.prevent="setDay(7)"
        >Воскресенье</a>
      </div>
      <div class="menu-day-time-wrapper" v-for="(menudaytime, index) in menu" :key="index">
        <div class="menu-title">
          <h2 class="menu-title__h2">{{ menudaytime.name }}</h2>
          <div class="menu-title__search" v-if="index === 0">
            <input type="search" placeholder="Поиск по блюдам" v-model="filterName" />
          </div>
        </div>
        <div class="menu-section" v-for="(menuType, indexIn) in menudaytime.content" :key="indexIn">
          <div class="menu-section__title">{{ menuType.name }}</div>
          <MenuItemSelect
            v-for="menuItem in menuType.content"
            :key="menuItem.id"
            :parameters="menuItem"
            :selectedInDay="parameters.selected[(currentDay-1)]"
            :patient="parameters"
            :day="currentDay"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItemSelect from "../components/MenuItemSelect";
import { mapMutations, mapGetters } from "vuex";

export default {
  middleware: "authorized",
  data: function() {
    return {
      currentDay: 1,
      filterName: "",
      parameters: {
        id: null,
        name: "",
        surname: "",
        patronymic: "",
        birthdate: "",
        address: null,
        arrivaldate: "",
        ward: null,
        diet: null,
        breakfast: null,
        lunch: null,
        hightea: null,
        dinner: null,
        sourmilk: null,
        hospitalization: "",
        eating: null,
        archived: false,
        selected: [[], [], [], [], [], [], []]
      }
    };
  },
  components: {
    MenuItemSelect: MenuItemSelect
  },
  computed: {
    ...mapGetters({ dietsQty: "menu/dietsQty" }),
    menu() {
      return this.$store.getters["menu/getMenu"](this.filter);
    },
    filter: function() {
      return {
        diet: this.parameters.diet,
        name: this.filterName
      };
    }
  },
  methods: {
    setDay: function(day) {
      this.currentDay = day;
    }
  },
  created: function() {
    if (this.$route.query.id) {
      this.parameters = {
        ...this.$store.getters["patients/getPatient"](this.$route.query.id)
      };
    }
  }
};
</script>

<style></style>
