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
        <h1 class="page-title__h1">Архив пациентов:</h1>
      </div>
      <div class="addresses">
        <a
          href="#"
          class="addresses__item"
          :class="{ '--active': address === filter.address }"
          v-for="(address, index) in addresses"
          :key="index"
          @click.prevent="addressClick(address)"
        >{{ address }}</a>
      </div>
      <div class="patients-bar">
        <div class="patients-bar__top">Фильтровать:</div>
        <div class="patients-bar__cont">
          <select class="patients-bar__select" v-model="filter.ward">
            <option value>по номеру палаты</option>
            <option v-for="(ward, index) in wards" :key="index" :value="ward">{{ ward }}</option>
          </select>
          <input
            class="patients-bar__input --right"
            placeholder="Поиск по ФИО"
            v-model="filter.name"
          />
        </div>
      </div>

      <PatientList :patients="patients" :itemsPerPage="10" />
    </div>
  </div>
</template>

<script>
import PatientList from "../components/PatientList";
import { mapGetters } from "vuex";

export default {
  middleware: "authorized",
  data: function() {
    return {
      filter: {
        address: "",
        ward: "",
        name: "",
        archived: true
      }
    };
  },
  components: {
    PatientList
  },
  computed: {
    patients() {
      return this.$store.getters["patients/getFilteredPatients"](this.filter);
    },
    ...mapGetters({
      addresses: "patients/getAddresses",
      wards: "patients/getWards"
    })
  },
  methods: {
    addressClick(address) {
      if (this.filter.address === address) {
        this.filter.address = "";
      } else {
        this.filter.address = address;
      }
    }
  },
  created() {
    this.$store.dispatch("patients/fetchArchivedPatients", { self: this });
  }
};
</script>

<style></style>
