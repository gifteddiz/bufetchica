<template>
  <div>
    <div class="container">
      <nuxt-link to="/menus" class="back">
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
      <form class="edit-menu" @submit.prevent="saveForm">
        <h2 class="edit-menu__h2">Добавление блюда</h2>
        <div class="edit-menu__img">
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            :useCustomSlot="true"
            v-on:vdropzone-max-files-exceeded="vdropzoneMaxFilesExceeded"
            v-on:vdropzone-success="imageUploaded"
          >
            <div class="edit-menu__img-placeholder">
              <div class="edit-menu__img-ico">
                <svg
                  width="100"
                  height="103"
                  viewBox="0 0 100 103"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.834 64.094L41.2506 59.4046C39.584 57.6994 36.2506 57.6994 35.0006 60.2573L28.334 70.0622C27.084 73.0463 28.7506 76.4567 32.084 76.4567H63.7506C67.084 76.4567 69.1673 73.0463 67.5006 70.0622L58.334 54.289C56.6673 51.3049 52.5006 51.3049 50.834 54.7153L45.834 64.094Z"
                    stroke="#C0AF93"
                    stroke-width="3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M83.334 12.9375V29.9897"
                    stroke="#C0AF93"
                    stroke-width="3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M75 21.4639H91.6667"
                    stroke="#C0AF93"
                    stroke-width="3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M62.5001 21.4639H16.3637C11.7803 21.4639 12.5001 25.3006 12.5001 29.99V81.1467C12.5001 85.8361 11.7803 89.6728 16.3637 89.6728H78.1819C82.7652 89.6728 83.3334 85.8361 83.3334 81.1467V42.7792"
                    stroke="#C0AF93"
                    stroke-width="3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="edit-menu__img-text">Добавить изображение</div>
            </div>
          </vue-dropzone>
        </div>
        <div class="edit-menu__input-name">Название</div>
        <div class="edit-menu__input">
          <input type="text" placeholder="Название" v-model="parameters.name" />
        </div>
        <div class="edit-menu__input-name">Состав</div>
        <div class="edit-menu__textarea">
          <textarea placeholder="Состав" v-model="parameters.consist"></textarea>
        </div>
        <div class="edit-menu__input-name">Описание</div>
        <div class="edit-menu__textarea">
          <textarea placeholder="Описание" v-model="parameters.description"></textarea>
        </div>
        <div class="edit-menu__input-name">Энергетическая ценность</div>
        <div class="edit-menu__input">
          <input
            type="text"
            placeholder="Энергетическая ценность"
            v-model="parameters.energy"
            @keypress="isNumber($event)"
          />
        </div>
        <div class="edit-menu__input-name">Белки</div>
        <div class="edit-menu__input">
          <input
            type="text"
            placeholder="Белки"
            v-model="parameters.protein"
            @keypress="isNumber($event)"
          />
        </div>
        <div class="edit-menu__input-name">Углеводы</div>
        <div class="edit-menu__input">
          <input
            type="text"
            placeholder="Углеводы"
            v-model="parameters.carb"
            @keypress="isNumber($event)"
          />
        </div>
        <div class="edit-menu__input-name">Жиры</div>
        <div class="edit-menu__input">
          <input
            type="text"
            placeholder="Жиры"
            v-model="parameters.fats"
            @keypress="isNumber($event)"
          />
        </div>
        <div class="edit-menu__input-name">Вес</div>
        <div class="edit-menu__input">
          <input
            type="text"
            placeholder="Вес"
            v-model="parameters.weight"
            @keypress="isNumber($event)"
          />
        </div>

        <div class="edit-menu__input-name">Аллергены</div>
        <div class="edit-menu__chose">
          <multiselect
            v-model="allergen"
            track-by="id"
            label="name"
            :multiple="true"
            :options="allergenOptions"
            :hide-selected="true"
            :clear-on-select="false"
            selectLabel="Нажмите Enter"
            placeholder="Выберите аллергены"
            @input="updateAllergen"
          ></multiselect>
        </div>

        <div class="edit-menu__input-name">Кол-во порций</div>
        <div class="edit-menu__input">
          <input type="text" placeholder="Кол-во порций" v-model="parameters.portions" />
        </div>

        <div class="edit-menu__input-name">Прием пищи</div>
        <div class="edit-menu__select">
          <select v-model="parameters.daytime">
            <option
              :value="daytime.id"
              v-for="daytime in dayTimeList"
              :key="daytime.id"
            >{{ daytime.name }}</option>
          </select>
        </div>
        <div class="edit-menu__input-name">Тип блюда</div>
        <div class="edit-menu__select">
          <select v-model="parameters.type">
            <option v-for="dishType in dishTypeList" :key="dishType.id">
              {{
              dishType.name
              }}
            </option>
          </select>
        </div>
        <div class="edit-menu__saving" v-if="isSaving">
          <img src="~assets/ajax.gif" />
          <span>Сохранение</span>
        </div>
        <input type="submit" class="edit-menu__btn btn-1" value="Сохранить" v-if="!isSaving" />
        <div class="edit-menu__error" v-if="errors.length" v-html="errors[0]"></div>
      </form>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Multiselect from "vue-multiselect";
import fetchData from "../mixins/fetchData";
import { mapGetters } from "vuex";

export default {
  middleware: "authorized",
  mixins: [fetchData],
  data: function () {
    return {
      dropZoneMounted: false,
      allergen: [],
      isSaving: false,
      errors: [],
    };
  },
  computed: {
    parameters() {
      var data = {};
      if (this.$route.query.id) {
        data = this.$store.getters["menu/getRecipe"](this.$route.query.id);
        if (data) {
          this.setAllergenInitially(data.allergen);
          this.setImageInitially(data.image);
        }
      } else {
        var diet = this.$route.query.diet;
        var currentDay = this.$route.query.day;
        var type = this.$route.query.type;
        data = {
          type: "",
          consist: "",
          energy: "",
          protein: "",
          carb: "",
          weight: "",
          daytime: "",
          portions: "",
          allergen: [],
          fats: "",
          id: "",
          name: "",
          image: "",
          description: "",
          diet: [],
        };
        data.diet.push({
          id: diet,
          days: [currentDay],
        });
        if (type) {
          data.type = type;
        }
      }
      return { ...data };
    },
    ...mapGetters({
      allergenOptions: "menu/allergenList",
      dayTimeList: "menu/dayTimeList",
      dishTypeList: "menu/dishTypeList",
    }),
    dropzoneOptions() {
      return {
        url: "https://order.emcmos.ru/rest/images/",
        thumbnailWidth: 600,
        maxFilesize: 2,
        maxFiles: 1,
        addRemoveLinks: true,
        headers: {
          Authorization: this.$auth.getToken("local"),
        },
        dictRemoveFile: "Удалить файл",
        dictCancelUpload: "Отменить загрузку",
      };
    },
  },
  components: {
    vueDropzone: vue2Dropzone,
    Multiselect,
  },
  methods: {
    saveForm: function () {
      this.isSaving = true;
      this.$store
        .dispatch("menu/editMenu", {
          ...this.parameters,
        })
        .then((response) => {
          this.isSaving = false;

          if (response.data.error) {
            this.errors = response.data.error.error_desc;
          } else {
            this.errors = [];
            this.$router.replace({ path: "/menus" });
          }
        });
    },
    vdropzoneMaxFilesExceeded: function (file) {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$refs.myVueDropzone.addFile(file);
    },
    setAllergenInitially(value) {
      // Преобразует массив со списком id в массив со списком объектов
      var result = [];
      if (!this.allergen.length) {
        value.forEach((element) => {
          var allergenObj = this.allergenOptions.find((allergen) => {
            return parseInt(allergen.id) === parseInt(element);
          });
          result.push(allergenObj);
        });
        this.allergen = result;
      }
    },
    updateAllergen() {
      // Преобразует массив со списком объектов в массив id
      var result = [];
      this.allergen.forEach((allergenObj) => {
        result.push(allergenObj.id);
      });
      this.parameters.allergen = result;
    },
    setImageInitially(url) {
      if (url && url.length) {
        var setValue = () => {
          if (this.dropZoneMounted) {
            var file = { size: 123, name: "", type: "image/jpg" };
            this.$refs.myVueDropzone.removeAllFiles();
            this.$refs.myVueDropzone.manuallyAddFile(file, url);
          } else {
            setTimeout(setValue, 1000);
          }
        };
        setValue();
      }
    },
    imageUploaded(file, response) {
      this.parameters.image = response.path;
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
  mounted: function () {
    this.dropZoneMounted = true;
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
