<template>
  <div>
    <div class="container">
      <div class="page-title --mt">
        <h1 class="page-title__h1">Рацион питания</h1>
      </div>
      <div class="menu-bar">
        <select class="menu-bar__select" v-model="filter.diet">
          <option :value="diet.id" v-for="diet in dietsList" :key="diet.id">
            {{
            diet.name
            }}
          </option>
        </select>
        <a href="#" class="menu-bar__save" @click.prevent="togglePickDish">Добавить существующее</a>
        <nuxt-link
          :to="'/edit-menu?diet='+filter.diet+'&day='+filter.currentDay"
          href="#"
          class="menu-bar__add btn-1"
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
              d="M8 0C8.55228 0 9 0.447715 9 1V7H15C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9H9V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V9H1C0.447715 9 0 8.55228 0 8C0 7.44771 0.447715 7 1 7H7V1C7 0.447715 7.44772 0 8 0Z"
              fill="white"
            />
          </svg>
          <span>Добавить новое блюдо</span>
        </nuxt-link>
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
            <h2 class="menu-title__h2">{{ menudaytime.name }}</h2>
            <div class="menu-title__search" v-if="index === 0">
              <input type="search" placeholder="Поиск по блюдам" v-model="filter.name" />
            </div>
          </div>
          <div
            class="menu-section"
            v-for="(menuType, indexIn) in menudaytime.content"
            :key="indexIn"
          >
            <nuxt-link
              :to="'/edit-menu?diet='+filter.diet+'&day='+filter.currentDay+'&type='+menuType.name"
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
            <div class="menu-section__title">{{ menuType.name }}</div>
            <transition-group name="fade">
              <MenuItem
                v-for="menuItem in menuType.content"
                :key="menuItem.id"
                :parameters="menuItem"
                :currentDay="filter.currentDay"
                :diet="filter.diet"
              />
            </transition-group>
          </div>
        </div>
      </div>
    </div>
    <ModalBlock v-bind:show="showPickDish" v-on:toggleShow="togglePickDish">
      <PickDish :diet="filter.diet" :currentDay="filter.currentDay" :dayDishesID="dayDishesID" />
    </ModalBlock>
  </div>
</template>

<script>
import MenuItem from "../components/MenuItem";
import { mapGetters } from "vuex";
import fetchData from "../mixins/fetchData";
import ModalBlock from "../components/ModalBlock";
import PickDish from "../components/PickDish";

export default {
  middleware: "authorized",
  mixins: [fetchData],
  data: function() {
    return {
      showPickDish: false,
      filter: {
        diet: 1369,
        name: "",
        currentDay: 1
      }
    };
  },
  computed: {
    ...mapGetters({ dietsList: "menu/dietsList" }),
    dayDishesID() {
      var result = [];
      if (this.menu.length) {
        this.menu.forEach(daytime => {
          daytime.content.forEach(type => {
            type.content.forEach(el => {
              result.push(parseInt(el.id));
            });
          });
        });
      }
      return result;
    },
    menu() {
      return this.$store.getters["menu/getMenu"](this.filter);
    }
  },
  components: {
    MenuItem: MenuItem,
    ModalBlock: ModalBlock,
    PickDish: PickDish
  },
  methods: {
    setDay: function(day) {
      this.filter.currentDay = day;
    },
    togglePickDish: function() {
      this.showPickDish = !this.showPickDish;
    }
  }
};
</script>

<style></style>
