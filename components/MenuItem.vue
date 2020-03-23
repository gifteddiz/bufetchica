<template>
  <div class="menu-item">
    <div
      class="menu-item__img"
      :style="'background-image: url(' + parameters.image + ')'"
      @click="toggleModal"
    ></div>
    <div class="menu-item__content">
      <div class="menu-item__title" @click="toggleModal">{{ parameters.name }}</div>
      <ul class="menu-item__list">
        <li>
          Аллергены:
          <strong>{{ allergenParsed }}</strong>
        </li>
        <li>
          Энергетическая ценность:
          <strong>{{ parameters.energy }} ккал</strong>
        </li>
        <li>
          Вес:
          <strong>{{ parameters.weight }} г</strong>
        </li>
        <li>
          Белки:
          <strong>{{ parameters.protein }} г</strong>
        </li>
        <li>
          Углеводы:
          <strong>{{ parameters.carb }} г</strong>
        </li>
        <li>
          Жиры:
          <strong>{{ parameters.fats }} г</strong>
        </li>
      </ul>
      <div
        class="menu-item__text"
        v-if="parameters.description"
      >{{ parameters.description.substring(0, 200) }}</div>
    </div>
    <div class="menu-item__controls">
      <a
        href="#"
        class="menu-item__controls-item"
        @click.prevent="removeDishFromDay(parameters.id)"
      >
        <div class="menu-item__controls-item-ico">
          <svg
            width="24"
            height="30"
            viewBox="0 0 24 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2392 11.0445C15.8218 11.0445 15.4835 11.3828 15.4835 11.8003V24.1937C15.4835 24.6108 15.8218 24.9494 16.2392 24.9494C16.6567 24.9494 16.995 24.6108 16.995 24.1937V11.8003C16.995 11.3828 16.6567 11.0445 16.2392 11.0445Z"
              fill="#B06666"
              stroke="#B06666"
              stroke-width="0.2"
            />
            <path
              d="M8.50193 11.0445C8.08451 11.0445 7.74619 11.3828 7.74619 11.8003V24.1937C7.74619 24.6108 8.08448 24.9494 8.50193 24.9494C8.91938 24.9494 9.25767 24.6108 9.25767 24.1937V11.8003C9.25767 11.3828 8.91935 11.0445 8.50193 11.0445Z"
              fill="#B06666"
              stroke="#B06666"
              stroke-width="0.2"
            />
            <path
              d="M6.76238 4.30991H3.50507H3.50505C2.19665 4.31018 1.09147 5.28056 0.922055 6.5778L0.922052 6.57782C0.756246 7.84969 1.5403 9.04864 2.7624 9.41162V25.4918C2.7624 26.4707 3.12128 27.3926 3.75162 28.0557C4.37932 28.7208 5.25284 29.0984 6.16703 29.1H6.1672H18.5739H18.5741C19.4885 29.0984 20.362 28.7208 20.9895 28.0557C21.6198 27.3926 21.9787 26.4707 21.9787 25.4918V9.41162C23.2008 9.04864 23.9849 7.84969 23.8191 6.57782L23.8191 6.5778C23.6497 5.28056 22.5445 4.31018 21.2361 4.30991H17.9787L17.9787 3.5908C17.9787 3.59068 17.9787 3.59057 17.9787 3.59045V3.59024H17.8787L6.76238 4.30991ZM8.27386 3.59024H8.27386L8.27385 3.58897C8.26984 3.2746 8.39341 2.97199 8.61656 2.75003L8.6166 2.74999C8.83944 2.52808 9.14275 2.40612 9.45747 2.41154V2.41156H9.4592L15.2819 2.41157L15.2837 2.41154C15.5984 2.40612 15.9017 2.52808 16.1245 2.74999L16.1246 2.75006C16.3477 2.97174 16.4713 3.27457 16.4673 3.58897H16.4673V3.59024V4.30991H8.27386V3.59024ZM18.5739 27.5885H6.1672C5.11025 27.5885 4.27387 26.6796 4.27387 25.4918V9.4935H20.4673V25.4918C20.4673 26.6796 19.6309 27.5885 18.5739 27.5885ZM3.50507 5.82138H21.2361C21.8327 5.82138 22.3164 6.30504 22.3164 6.90171C22.3164 7.49837 21.8327 7.98203 21.2361 7.98203H3.50507C2.9084 7.98203 2.42474 7.49837 2.42474 6.90171C2.42474 6.30504 2.9084 5.82138 3.50507 5.82138Z"
              fill="#B06666"
              stroke="#B06666"
              stroke-width="0.2"
            />
            <path
              d="M12.3706 11.0445C11.9532 11.0445 11.6148 11.3828 11.6148 11.8003V24.1937C11.6148 24.6108 11.9531 24.9494 12.3706 24.9494C12.788 24.9494 13.1263 24.6108 13.1263 24.1937V11.8003C13.1263 11.3828 12.788 11.0445 12.3706 11.0445Z"
              fill="#B06666"
              stroke="#B06666"
              stroke-width="0.2"
            />
          </svg>
        </div>
        <div class="menu-item__controls-item-text --red">Удалить</div>
      </a>
      <nuxt-link :to="'/edit-menu?id=' + parameters.id" class="menu-item__controls-item">
        <div class="menu-item__controls-item-ico">
          <svg
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.1895 1.81237C23.7789 -0.604123 19.8588 -0.604123 17.4483 1.81237L1.42189 17.8328C1.29659 17.9581 1.21903 18.1192 1.19516 18.2923L0.00779774 27.0871C-0.0280022 27.3377 0.0614976 27.5883 0.23453 27.7613C0.383697 27.9105 0.592529 28 0.801362 28C0.837162 28 0.872962 28 0.908762 27.994L9.60814 26.8604C10.0497 26.8007 10.3599 26.395 10.3003 25.9534C10.2406 25.5119 9.83487 25.2016 9.39334 25.2613L1.74409 26.2518L2.57346 20.1181L9.02937 26.574C9.17854 26.7231 9.38737 26.8126 9.5962 26.8126C9.80504 26.8126 10.0139 26.7291 10.163 26.574L26.1895 10.5535C27.3589 9.38405 28.0033 7.83272 28.0033 6.17996C28.0033 4.5272 27.3589 2.97587 26.1895 1.81237ZM17.7586 3.78136L20.4495 6.47232L5.82528 21.0966L3.13432 18.4056L17.7586 3.78136ZM9.60217 24.8675L6.97088 22.2362L21.5951 7.61195L24.2264 10.2432L9.60217 24.8675ZM25.3482 9.09168L18.9101 2.65367C19.7276 1.97944 20.7479 1.6095 21.8219 1.6095C23.045 1.6095 24.1906 2.08684 25.0558 2.94603C25.921 3.80523 26.3923 4.95679 26.3923 6.17996C26.3923 7.25992 26.0224 8.27425 25.3482 9.09168Z"
              fill="#617AA0"
            />
          </svg>
        </div>
        <div class="menu-item__controls-item-text --blue">Редактировать</div>
      </nuxt-link>
    </div>
    <ModalBlock v-bind:show="showModal" v-on:toggleShow="toggleModal">
      <div class="menu-item-modal">
        <div class="menu-item-modal__img" style="background-image: url(/images/food-2.jpg)"></div>
        <div class="menu-item-modal__content">
          <div class="menu-item-modal__title">{{ parameters.name }}</div>
          <ul class="menu-item-modal__list">
            <li>
              Аллергены:
              <strong>{{ allergenParsed }}</strong>
            </li>
            <li>
              Энергетическая ценность:
              <strong>{{ parameters.energy }} ккал</strong>
            </li>
            <li>
              Вес:
              <strong>{{ parameters.weight }} г</strong>
            </li>
            <li>
              Белки:
              <strong>{{ parameters.protein }} г</strong>
            </li>
            <li>
              Углеводы:
              <strong>{{ parameters.carb }} г</strong>
            </li>
            <li>
              Жиры:
              <strong>{{ parameters.fats }} г</strong>
            </li>
          </ul>
          <div class="menu-item-modal__text">{{ parameters.description }}</div>
        </div>
        <div class="menu-item-modal__controls">
          <a
            href="#"
            class="menu-item-modal__controls-item"
            @click.prevent="removeDishFromDay(parameters.id)"
          >
            <div class="menu-item-modal__controls-item-ico">
              <svg
                width="24"
                height="30"
                viewBox="0 0 24 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2392 11.0445C15.8218 11.0445 15.4835 11.3828 15.4835 11.8003V24.1937C15.4835 24.6108 15.8218 24.9494 16.2392 24.9494C16.6567 24.9494 16.995 24.6108 16.995 24.1937V11.8003C16.995 11.3828 16.6567 11.0445 16.2392 11.0445Z"
                  fill="#B06666"
                  stroke="#B06666"
                  stroke-width="0.2"
                />
                <path
                  d="M8.50193 11.0445C8.08451 11.0445 7.74619 11.3828 7.74619 11.8003V24.1937C7.74619 24.6108 8.08448 24.9494 8.50193 24.9494C8.91938 24.9494 9.25767 24.6108 9.25767 24.1937V11.8003C9.25767 11.3828 8.91935 11.0445 8.50193 11.0445Z"
                  fill="#B06666"
                  stroke="#B06666"
                  stroke-width="0.2"
                />
                <path
                  d="M6.76238 4.30991H3.50507H3.50505C2.19665 4.31018 1.09147 5.28056 0.922055 6.5778L0.922052 6.57782C0.756246 7.84969 1.5403 9.04864 2.7624 9.41162V25.4918C2.7624 26.4707 3.12128 27.3926 3.75162 28.0557C4.37932 28.7208 5.25284 29.0984 6.16703 29.1H6.1672H18.5739H18.5741C19.4885 29.0984 20.362 28.7208 20.9895 28.0557C21.6198 27.3926 21.9787 26.4707 21.9787 25.4918V9.41162C23.2008 9.04864 23.9849 7.84969 23.8191 6.57782L23.8191 6.5778C23.6497 5.28056 22.5445 4.31018 21.2361 4.30991H17.9787L17.9787 3.5908C17.9787 3.59068 17.9787 3.59057 17.9787 3.59045V3.59024H17.8787L6.76238 4.30991ZM8.27386 3.59024H8.27386L8.27385 3.58897C8.26984 3.2746 8.39341 2.97199 8.61656 2.75003L8.6166 2.74999C8.83944 2.52808 9.14275 2.40612 9.45747 2.41154V2.41156H9.4592L15.2819 2.41157L15.2837 2.41154C15.5984 2.40612 15.9017 2.52808 16.1245 2.74999L16.1246 2.75006C16.3477 2.97174 16.4713 3.27457 16.4673 3.58897H16.4673V3.59024V4.30991H8.27386V3.59024ZM18.5739 27.5885H6.1672C5.11025 27.5885 4.27387 26.6796 4.27387 25.4918V9.4935H20.4673V25.4918C20.4673 26.6796 19.6309 27.5885 18.5739 27.5885ZM3.50507 5.82138H21.2361C21.8327 5.82138 22.3164 6.30504 22.3164 6.90171C22.3164 7.49837 21.8327 7.98203 21.2361 7.98203H3.50507C2.9084 7.98203 2.42474 7.49837 2.42474 6.90171C2.42474 6.30504 2.9084 5.82138 3.50507 5.82138Z"
                  fill="#B06666"
                  stroke="#B06666"
                  stroke-width="0.2"
                />
                <path
                  d="M12.3706 11.0445C11.9532 11.0445 11.6148 11.3828 11.6148 11.8003V24.1937C11.6148 24.6108 11.9531 24.9494 12.3706 24.9494C12.788 24.9494 13.1263 24.6108 13.1263 24.1937V11.8003C13.1263 11.3828 12.788 11.0445 12.3706 11.0445Z"
                  fill="#B06666"
                  stroke="#B06666"
                  stroke-width="0.2"
                />
              </svg>
            </div>
            <div class="menu-item-modal__controls-item-text --red">Удалить</div>
          </a>
          <nuxt-link :to="'/edit-menu?id=' + parameters.id" class="menu-item-modal__controls-item">
            <div class="menu-item-modal__controls-item-ico">
              <svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.1895 1.81237C23.7789 -0.604123 19.8588 -0.604123 17.4483 1.81237L1.42189 17.8328C1.29659 17.9581 1.21903 18.1192 1.19516 18.2923L0.00779774 27.0871C-0.0280022 27.3377 0.0614976 27.5883 0.23453 27.7613C0.383697 27.9105 0.592529 28 0.801362 28C0.837162 28 0.872962 28 0.908762 27.994L9.60814 26.8604C10.0497 26.8007 10.3599 26.395 10.3003 25.9534C10.2406 25.5119 9.83487 25.2016 9.39334 25.2613L1.74409 26.2518L2.57346 20.1181L9.02937 26.574C9.17854 26.7231 9.38737 26.8126 9.5962 26.8126C9.80504 26.8126 10.0139 26.7291 10.163 26.574L26.1895 10.5535C27.3589 9.38405 28.0033 7.83272 28.0033 6.17996C28.0033 4.5272 27.3589 2.97587 26.1895 1.81237ZM17.7586 3.78136L20.4495 6.47232L5.82528 21.0966L3.13432 18.4056L17.7586 3.78136ZM9.60217 24.8675L6.97088 22.2362L21.5951 7.61195L24.2264 10.2432L9.60217 24.8675ZM25.3482 9.09168L18.9101 2.65367C19.7276 1.97944 20.7479 1.6095 21.8219 1.6095C23.045 1.6095 24.1906 2.08684 25.0558 2.94603C25.921 3.80523 26.3923 4.95679 26.3923 6.17996C26.3923 7.25992 26.0224 8.27425 25.3482 9.09168Z"
                  fill="#617AA0"
                />
              </svg>
            </div>
            <div class="menu-item-modal__controls-item-text --blue">Редактировать</div>
          </nuxt-link>
        </div>
      </div>
    </ModalBlock>
  </div>
</template>

<script>
import ModalBlock from "../components/ModalBlock";
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      showModal: false
    };
  },
  computed: {
    ...mapGetters({ allergenOptions: "menu/allergenList" }),
    allergenParsed() {
      var result = [];
      this.parameters.allergen.forEach(allergenId => {
        var name = this.allergenOptions.find(allergenObj => {
          return allergenObj.id === allergenId;
        }).name;
        result.push(name);
      });
      return result.join(", ");
    }
  },
  components: {
    ModalBlock: ModalBlock
  },
  props: ["parameters", "diet", "currentDay"],
  methods: {
    toggleModal: function() {
      this.showModal = !this.showModal;
    },
    removeDishFromDay(dishId) {
      this.$store.dispatch("menu/removeDietDay", {
        diet: this.diet,
        day: this.currentDay,
        dishId: dishId
      });
    }
  }
};
</script>

<style></style>
