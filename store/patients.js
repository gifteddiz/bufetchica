import Vue from "vue";
import axios from "axios";

export const state = () => ({
  patients: []
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
  },
  toggleRecipeSelect(state, params) {
    // Переключает наличие блюда в меню пользователя
    // params.userID params.recipeId params.day
    const userIndex = state.patients.findIndex(
      patient => patient.id === params.userID
    );
    var newPatientObj = { ...state.patients[userIndex] };

    var recipeIndexPatient = newPatientObj.selected[params.day].findIndex(
      el => el === params.recipeId
    );

    if (recipeIndexPatient === -1) {
      newPatientObj.selected[params.day].push(params.recipeId);
    } else {
      newPatientObj.selected[params.day].splice(recipeIndexPatient, 1);
    }
  }
};

export const actions = {
  fetchPatients({ commit }, { self }) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://emcq.zapusq.ru/rest/patients/")
        .then(response => {
          commit("FETCH_PATIENTS", response.data);
          resolve(true);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    });
  },
  editPatient({ commit }, payload) {
    var url;
    var newPatient = false;
    if (payload.id) {
      url = "http://emcq.zapusq.ru/rest/patient/" + payload.id + "/";
    } else {
      url = "http://emcq.zapusq.ru/rest/patient/";
      newPatient = true;
    }
    return new Promise((resolve, reject) => {
      axios
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
    if (!state.patients.length) return result;
    state.patients.forEach(element => {
      if (
        result.findIndex(el => {
          return el === element.address;
        }) === -1
      )
        result.push(element.address);
    });
    return result.sort();
  },
  getWards(state) {
    var result = [];
    if (!state.patients.length) return result;
    state.patients.forEach(element => {
      if (
        result.findIndex(el => {
          return el === element.ward;
        }) === -1
      )
        result.push(element.ward);
    });
    return result.sort();
  },
  getFilteredPatients: state => filter => {
    var patients = [];
    if (!state.patients.length) return patients;
    patients = state.patients.filter(
      patient => patient.archived === filter.archived
    );

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
