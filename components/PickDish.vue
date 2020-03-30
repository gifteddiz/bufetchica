<template>
  <div class="pick-dish">
    <div v-if="filteredDishes.length">
      <transition-group name="fade">
        <div
          class="pick-dish__item"
          v-for="dish in filteredDishes"
          :key="dish.id"
          @click="selectDish(dish.id)"
        >
          <div
            class="pick-dish__img"
            :style="'background-image: url(' + dish.image + ')'"
            v-if="dish.image"
          ></div>
          <div class="pick-dish__img" style="background-image: url(/images/default-img.jpg)" v-else></div>
          <div class="pick-dish__title">{{dish.name}}</div>
        </div>
      </transition-group>
    </div>
    <div v-else>В данном дне добавлены все возможные блюда</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import helpers from "~/assets/js/helpers";

export default {
  props: ["diet", "currentDay", "dayDishesID"],
  computed: {
    ...mapGetters({ allDishes: "menu/allDishes" }),
    filteredDishes() {
      var allDishes = helpers.deepCopy(this.allDishes);
      var result = allDishes.filter(el => {
        return !this.dayDishesID.includes(parseInt(el.id));
      });
      return result;
    }
  },
  methods: {
    selectDish(dishId) {
      this.$store.dispatch("menu/addDietDay", {
        diet: this.diet,
        day: this.currentDay,
        dishId: dishId
      });
    }
  }
};
</script>

<style>
</style>