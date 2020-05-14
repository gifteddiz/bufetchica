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
      <div class="page-title">
        <h1 class="page-title__h1">
          {{ getPatientObj().surname }} {{ getPatientObj().name }}
          {{ getPatientObj().patronymic }}
        </h1>
      </div>
      <div class="patient-info">
        <div class="patient-info__item">Палата № {{ getPatientObj().ward }}</div>
        <div class="patient-info__item">{{ getPatientObj().hospitalization }}</div>
        <div class="patient-info__item">id{{ getPatientObj().id }}</div>
        <div class="patient-info__item">Дата добавления 12:23 02.02.2020</div>
      </div>
      <div class="menu-bar">
        <select class="menu-bar__select" v-model="filter.diet" disabled>
          <option :value="diet.id" v-for="diet in dietsList" :key="diet.id">
            {{
            diet.name
            }}
          </option>
        </select>
        <!-- <a href="#" class="menu-bar__save">Сохранить диету</a> -->
      </div>
      <div class="menu-day">
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': filter.currentDay === 1 }"
          @click.prevent="setDay(1)"
        >Понедельник</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': filter.currentDay === 2 }"
          @click.prevent="setDay(2)"
        >Вторник</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': filter.currentDay === 3 }"
          @click.prevent="setDay(3)"
        >Среда</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': filter.currentDay === 4 }"
          @click.prevent="setDay(4)"
        >Четверг</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': filter.currentDay === 5 }"
          @click.prevent="setDay(5)"
        >Пятница</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': filter.currentDay === 6 }"
          @click.prevent="setDay(6)"
        >Суббота</a>
        <a
          href="#"
          class="menu-day__item"
          :class="{ '--active': filter.currentDay === 7 }"
          @click.prevent="setDay(7)"
        >Воскресенье</a>
      </div>
      <div class="menu-day-time-wrapper">
        <div v-for="(menudaytime, index) in menu" :key="index">
          <div class="menu-title">
            <h2 class="menu-title__h2">{{ dayTimeIdToName( menudaytime.name ) }}</h2>
            <div class="menu-title__search" v-if="index === 0">
              <input type="search" placeholder="Поиск по блюдам" v-model="filter.name" />
            </div>
          </div>
          <div class="menu-section">
            <nuxt-link
              :to="'/edit-menu?diet='+filter.diet+'&day='+filter.currentDay"
              class="menu-section__add btn-1"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M-4.37114e-08 8C-6.78525e-08 7.44772 0.447715 7 1 7L15 7C15.5523 7 16 7.44771 16 8C16 8.55228 15.5523 9 15 9L1 9C0.447715 9 -1.95703e-08 8.55228 -4.37114e-08 8Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C8.55228 0 9 0.447715 9 1V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V1C7 0.447715 7.44772 0 8 0Z"
                  fill="white"
                />
              </svg>
            </nuxt-link>
            <!-- <div class="menu-section__title">{{ menuType.name }}</div> -->
            <transition-group name="fade">
              <MenuItemSelect
                v-for="menuItem in menudaytime.content"
                :key="menuItem.id"
                :parameters="menuItem"
                :selectedInDay="getPatientObj().selected[(filter.currentDay-1)]"
                :patient="getPatientObj()"
                :day="filter.currentDay"
              />
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItemSelect from "../components/MenuItemSelect";
import { mapMutations, mapGetters } from "vuex";
import fetchData from "../mixins/fetchData";

export default {
  middleware: "authorized",
  mixins: [fetchData],
  data: function() {
    return {
      showPickDish: false,
      parameters: {},
      filter: {
        diet: 0,
        name: "",
        currentDay: 1
      }
    };
  },
  components: {
    MenuItemSelect: MenuItemSelect
  },
  computed: {
    ...mapGetters({
      dietsList: "menu/dietsList",
      dayTimeList: "menu/dayTimeList"
    }),
    menu() {
      return this.$store.getters["menu/getMenu"](this.filter);
    }
  },
  methods: {
    setDay: function(day) {
      this.filter.currentDay = day;
    },
    dayTimeIdToName(id) {
      // Возвращает название времени дня
      var result = "";
      var dayTimeObj = {};

      dayTimeObj = this.dayTimeList.find(el => {
        return el.id === id;
      });
      if (typeof dayTimeObj !== "undefined") result = dayTimeObj.name;

      return result;
    },
    getPatientObj() {
      return {
        ...this.$store.getters["patients/getPatient"](this.$route.query.id)
      };
    }
  },
  created() {
    // Выбор первой диеты в селекте
    var setDiet = () => {
      if (this.isLoading) {
        setTimeout(setDiet, 200);
      } else {
        this.filter.diet = this.getPatientObj().diet;
        console.log(this.getPatientObj());
      }
    };
    setDiet();
  }
};
</script>

<style></style>
