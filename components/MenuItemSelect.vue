<template>
  <transition name="fade">
    <div class="menu-item-select">
      <div class="menu-item-select__img" :style="'background-image: url(' + parameters.image + ')'"></div>
      <div class="menu-item-select__content">
        <div class="menu-item-select__title">{{ parameters.name }}</div>
        <div
          class="menu-item-select__text"
          v-if="parameters.description"
        >{{ parameters.description.substring(0, 200) }}</div>
      </div>
      <div class="menu-item-select__controls">
        <div class="menu-item-select__controls-qty">
          <input type="text" v-model.number="dishValues.qty" @input="updateSelectedArray" />
        </div>
        <a
          href="#"
          class="menu-item-select__controls-chose"
          @click.prevent="toggleSelect();updateSelectedArray();"
        >
          <span class="menu-item-select__controls-chose-option" v-if="dishValues.selected">
            <svg
              width="46"
              height="45"
              viewBox="0 0 46 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31 17L20 28L15 23"
                stroke="#629771"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="1"
                y="44"
                width="43"
                height="44"
                transform="rotate(-90 1 44)"
                stroke="#629771"
                stroke-width="2"
              />
            </svg>
          </span>
          <span class="menu-item-select__controls-chose-option" v-else>
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 22L29 22" stroke="#8E7E63" stroke-width="2" stroke-linecap="round" />
              <path d="M22 15V29" stroke="#8E7E63" stroke-width="2" stroke-linecap="round" />
              <rect
                x="1"
                y="43"
                width="42"
                height="42"
                transform="rotate(-90 1 43)"
                stroke="#8E7E63"
                stroke-width="2"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["parameters", "selectedInDay", "patient", "day"],
  data: function () {
    return {};
  },
  computed: {
    ...mapGetters({
      getSelectedDishes: "patients/getSelectedDishes",
    }),
    dishValues() {
      var val = this.getSelectedDishes[parseInt(this.day) - 1][
        parseInt(this.parameters.id)
      ];
      if (val) {
        return {
          selected: true,
          qty: this.getSelectedDishes[parseInt(this.day) - 1][
            this.parameters.id
          ],
        };
      } else {
        return {
          selected: false,
          qty: 1,
        };
      }
    },
  },
  methods: {
    toggleSelect: function () {
      this.dishValues.selected = !this.dishValues.selected;
    },
    updateSelectedArray: function () {
      this.$store.commit("patients/UPDATE_SELECTED_DISHES", {
        userID: this.patient.id,
        recipeId: this.parameters.id,
        day: this.day,
        qty: this.dishValues.qty,
        selected: this.dishValues.selected,
      });
    },
  },
};
</script>

<style></style>
