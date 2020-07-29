import Vue from "vue";
// import axios from "axios";
import helpers from "~/assets/js/helpers";

export const state = () => ({
  patients: [],
  archived: [],
  address: []
});

export const mutations = {
  EDIT_PATIENT(state, params) {
    const index = state.patients.findIndex(patient => patient.id === params.id);
    if (index === -1) {
      state.patients.push(params.patient);
    } else {
      Vue.set(state.patients, index, params.patient);
    }
  },
  FETCH_PATIENTS(state, patients) {
    state.patients = patients.patients;
    state.address = patients.address;
  },
  FETCH_ARCHIVED_PATIENTS(state, patients) {
    state.archived = patients.patients;
  }
};

export const actions = {
  fetchPatients({ commit }, { self }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("http://order.emcmos.ru/rest/patients/")
        .then(response => {
          commit("FETCH_PATIENTS", response.data);
          resolve(true);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    });
  },
  fetchArchivedPatients({ commit }, { self }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("http://order.emcmos.ru/rest/patients-archive/")
        .then(response => {
          commit("FETCH_ARCHIVED_PATIENTS", response.data);
          resolve(true);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    });
  },
  editPatient({ commit }, payload) {
    // Редактирует данные пациента, принимает объект пациента
    var url;
    var newPatient = false;
    if (payload.id) {
      url = "http://order.emcmos.ru/rest/patient/" + payload.id + "/";
    } else {
      url = "http://order.emcmos.ru/rest/patient/";
      newPatient = true;
    }
    return new Promise((resolve, reject) => {
      this.$axios
        .post(url, {
          patient: payload
        })
        .then(function(response) {
          if (!response.data.error) {
            if (newPatient) {
              commit("EDIT_PATIENT", {
                id: response.data.patient.id,
                patient: { id: response.data.patient.id, ...payload }
              });
            } else {
              commit("EDIT_PATIENT", {
                id: payload.id,
                patient: { ...payload }
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
  toggleRecipeSelect({ state, dispatch }, payload) {
    // Переключает наличие блюда в меню пользователя
    // payload.userID payload.recipeId payload.day
    const userIndex = state.patients.findIndex(
      patient => patient.id === payload.userID
    );
    var newPatientObj = helpers.deepCopy(state.patients[userIndex]);
    var dayIndex = payload.day - 1;

    var recipeIndexPatient = newPatientObj.selected[dayIndex].findIndex(
      el => el === payload.recipeId
    );

    if (recipeIndexPatient === -1) {
      newPatientObj.selected[dayIndex].push(payload.recipeId);
    } else {
      newPatientObj.selected[dayIndex].splice(recipeIndexPatient, 1);
    }

    dispatch("editPatient", newPatientObj);
  }
};

export const getters = {
  getPatients(state) {
    // Возвращает всех неархивных пациентов
    return state.patients.filter(patient => !patient.archived);
  },
  getArchivedPatients(state) {
    // Возвращает всех архивных пациентов
    return state.patients.filter(patient => patient.archived);
  },
  getPatient: state => id => {
    return state.patients.find(
      patient => parseInt(patient.id) === parseInt(id)
    );
  },
  getAddresses(state) {
    var result = [];
    if (!state.address.length) return result;
    result = state.address;
    return result;
  },
  getWards(state) {
    return isArchived => {
      var result = [];
      var patientsArr = [];

      if (isArchived) {
        patientsArr = state.archived;
      } else {
        patientsArr = state.patients;
      }

      if (!patientsArr.length) return result;
      patientsArr.forEach(element => {
        if (
          result.findIndex(el => {
            return el === element.ward;
          }) === -1
        )
          result.push(element.ward);
      });
      return result.sort((a, b) => {
        return parseInt(a - b);
      });
    };
  },
  getFilteredPatients: state => filter => {
    var patients = [];
    if (!state.patients.length && !state.archived.length) return patients;

    if (filter.archived) {
      patients = state.archived;
    } else {
      patients = state.patients;
    }

    if (filter.address) {
      patients = patients.filter(patient => patient.address == filter.address);
    }
    if (filter.ward) {
      patients = patients.filter(patient => patient.ward == filter.ward);
    }
    if (filter.name) {
      patients = patients.filter(patient => {
        var name = (
          patient.name +
          patient.surname +
          patient.patronymic
        ).toString();
        return name.toLowerCase().includes(filter.name.toLowerCase());
      });
    }
    return patients;
  }
};
