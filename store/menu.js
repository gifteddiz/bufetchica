import Vue from "vue";
// import axios from "axios";
import helpers from "~/assets/js/helpers";

export const state = () => ({
  menu: [],
  diets: [],
  allergen: [],
  daytime: [],
  type: []
});

export const mutations = {
  FETCH_MENU(state, menu) {
    state.diets = menu.diets;
    state.menu = menu.menu;
    state.allergen = menu.allergen;
    state.daytime = menu.daytime;
    state.type = menu.type;
  },
  EDIT_RECIPE(state, payload) {
    // Заменяет рецепт с указанным payload.id на объект переданный в payload.recipe
    var elIndex;
    elIndex = state.menu.findIndex(
      menu => parseInt(menu.id) === parseInt(payload.id)
    );
    if (elIndex !== -1) {
      Vue.set(state.menu, elIndex, payload.recipe);
    }
  },
  CREATE_RECIPE(state, payload) {
    var tempRandID = parseInt(Math.random() * 1000);
    payload.id = tempRandID;
    payload.recipe.id = tempRandID;
    state.menu.push(payload.recipe);
  }
};

export const actions = {
  fetchMenu({ commit }, { self }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("http://emcq.zapusq.ru/rest/diets/")
        .then(response => {
          commit("FETCH_MENU", response.data);
          resolve(true);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    });
  },
  editMenu({ commit }, payload) {
    // Редактирует или создаёт блюдо в меню
    // Принимает объект блюда
    var url;
    var newDish = false;
    if (payload.id) {
      url = "http://emcq.zapusq.ru/rest/dish/" + payload.id + "/";
    } else {
      url = "http://emcq.zapusq.ru/rest/dish/";
      newDish = true;
    }

    return new Promise((resolve, reject) => {
      this.$axios
        .post(url, {
          dish: payload
        })
        .then(function(response) {
          if (!response.data.error) {
            if (newDish) {
              commit("CREATE_RECIPE", {
                id: response.data.dish.id,
                recipe: { id: response.data.dish.id, ...payload }
              });
            } else {
              commit("EDIT_RECIPE", {
                id: payload.id,
                recipe: { ...payload }
              });
            }
          }

          resolve(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  },
  addDietDay({ commit, getters, dispatch }, payload) {
    // Добавляет диету и день к блюду
    // payload.diet payload.day payload.dishId
    var dish = helpers.deepCopy(getters.getRecipe(payload.dishId));
    var addDiet = true;
    var addDay = false;

    if (dish.diet.length) {
      dish.diet.forEach(element => {
        if (parseInt(element.id) === parseInt(payload.diet)) {
          addDiet = false;
          addDay = true;
          element.days.forEach(elDay => {
            if (parseInt(elDay) === parseInt(payload.day)) {
              addDay = false;
            }
          });
        }
      });
    }

    if (addDiet) {
      dish.diet.push({
        id: payload.diet,
        days: [payload.day]
      });
    }
    if (addDay) {
      dish.diet.forEach(element => {
        if (parseInt(element.id) === parseInt(payload.diet)) {
          console.log(payload.day);
          element.days.push(payload.day);
        }
      });
    }
    dispatch("editMenu", dish);
  },
  removeDietDay({ commit, getters, dispatch }, payload) {
    // Убирает день из диеты у блюда
    // payload.diet payload.day payload.dishId
    var dish = helpers.deepCopy(getters.getRecipe(payload.dishId));

    dish.diet.forEach((diet, dietIndex) => {
      if (parseInt(diet.id) === parseInt(payload.diet)) {
        diet.days.forEach((day, dayIndex) => {
          if (parseInt(day) === payload.day) {
            diet.days.splice(dayIndex, 1);
            if (!diet.days.length) {
              dish.diet.splice(dietIndex, 1);
            }
          }
        });
      }
    });

    dispatch("editMenu", dish);
  }
};

export const getters = {
  getMenu: state => filter => {
    // Возвращает полное меню в структурированном виде
    // номер диеты - Время приёма пищи - Тип блюда
    // filter.diet filter.name filter.currentDay

    let result = [];

    // Фильтруем по выбранной диете и дню
    let dietMenu = state.menu.filter(element => {
      var show = false;
      if (element.diet.length) {
        element.diet.forEach((el, ind) => {
          if (parseInt(el.id) === parseInt(filter.diet)) {
            el.days.forEach(elDay => {
              if (parseInt(elDay) === parseInt(filter.currentDay)) show = true;
            });
          }
        });
      }
      return show;
    });

    // Фильтруем по имени
    let dietMenuTemp;
    if (filter.name) {
      dietMenuTemp = dietMenu.filter(element => {
        return element.name.toLowerCase().includes(filter.name.toLowerCase());
      });
      if (dietMenuTemp.length) dietMenu = dietMenuTemp;
    }

    dietMenu.forEach(element => {
      // Наполняем временем приёма (завтрак, обед)
      if (
        result.findIndex(el => {
          return el.name === element.daytime;
        }) === -1
      ) {
        result.push({
          name: element.daytime,
          content: []
        });
      }

      // Наполняем типом блюда (горячее, супы)
      // Индекс времени дня
      var indexdaytime = result.findIndex(el => {
        return el.name === element.daytime;
      });

      if (
        result[indexdaytime].content.findIndex(el => {
          return el.name === element.type;
        }) === -1
      ) {
        result[indexdaytime].content.push({
          name: element.type,
          content: []
        });
      }

      // Наполняем рецептами
      // Индекс типа
      var indexType = result[indexdaytime].content.findIndex(el => {
        return el.name === element.type;
      });
      result[indexdaytime].content[indexType].content.push({
        ...element
      });
    });
    return result;
  },
  allDishes: state => {
    return state.menu;
  },
  getRecipe: state => id => {
    // Возвращает рецепт с указанным id
    var result, tmpResult;
    tmpResult = state.menu.find(menu => parseInt(menu.id) === parseInt(id));
    if (tmpResult) result = { ...tmpResult };
    return result;
  },
  dietsList(state) {
    if (!state.diets.length) return [];
    return state.diets;
  },
  allergenList(state) {
    if (!state.allergen.length) return [];
    return state.allergen;
  },
  dayTimeList(state) {
    if (!state.daytime.length) return [];
    return state.daytime;
  },
  dishTypeList(state) {
    if (!state.type.length) return [];
    return state.type;
  }
};
