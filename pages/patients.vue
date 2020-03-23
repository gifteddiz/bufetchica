<template>
  <div>
    <div class="container">
      <div class="page-title --mt">
        <nuxt-link to="/edit-patient" class="page-title__add btn-1">
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
              d="M8 0C8.55228 0 9 0.447715 9 1V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V1C7 0.447715 7.44772 0 8 0Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 8C16 8.55228 15.5523 9 15 9L1 9C0.447716 9 -2.41411e-08 8.55228 0 8C2.41411e-08 7.44771 0.447716 7 1 7L15 7C15.5523 7 16 7.44772 16 8Z"
              fill="white"
            />
          </svg>
        </nuxt-link>
        <h1 class="page-title__h1">Пациенты:</h1>
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
            <option v-for="(ward, index) in wards" :key="index" :value="ward">
              {{
              ward
              }}
            </option>
          </select>
          <input class="patients-bar__input" placeholder="Поиск по ФИО" v-model="filter.name" />
          <nuxt-link to="/patients-archive" class="patients-bar__archive">
            <div class="patients-bar__archive-ico">
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.38159 6.24512C9.15862 6.24512 8.97791 6.42583 8.97791 6.64881V14.2785C8.97791 14.5013 9.15862 14.6822 9.38159 14.6822C9.60457 14.6822 9.78528 14.5013 9.78528 14.2785V6.64881C9.78528 6.42583 9.60457 6.24512 9.38159 6.24512Z"
                  fill="#B06666"
                />
                <path
                  d="M4.61817 6.24512C4.39519 6.24512 4.21448 6.42583 4.21448 6.64881V14.2785C4.21448 14.5013 4.39519 14.6822 4.61817 14.6822C4.84114 14.6822 5.02185 14.5013 5.02185 14.2785V6.64881C5.02185 6.42583 4.84114 6.24512 4.61817 6.24512Z"
                  fill="#B06666"
                />
                <path
                  d="M1.14654 5.13177V15.0778C1.14654 15.6656 1.3621 16.2177 1.73866 16.6138C2.11349 17.011 2.63513 17.2365 3.18106 17.2375H10.8189C11.365 17.2365 11.8867 17.011 12.2613 16.6138C12.6379 16.2177 12.8535 15.6656 12.8535 15.0778V5.13177C13.602 4.93308 14.0871 4.20991 13.9869 3.4418C13.8867 2.67385 13.2324 2.09938 12.4578 2.09923H10.391V1.59462C10.3933 1.17027 10.2256 0.762801 9.92515 0.463032C9.62475 0.16342 9.21665 -0.00341614 8.79231 5.30412e-05H5.20769C4.78335 -0.00341614 4.37525 0.16342 4.07485 0.463032C3.77445 0.762801 3.60666 1.17027 3.60903 1.59462V2.09923H1.54218C0.767607 2.09938 0.113351 2.67385 0.0130595 3.4418C-0.0870738 4.20991 0.397981 4.93308 1.14654 5.13177V5.13177ZM10.8189 16.4301H3.18106C2.49085 16.4301 1.95391 15.8372 1.95391 15.0778V5.16725H12.0461V15.0778C12.0461 15.8372 11.5092 16.4301 10.8189 16.4301ZM4.4164 1.59462C4.41372 1.38442 4.49635 1.1821 4.64553 1.03371C4.79454 0.885326 4.99733 0.8038 5.20769 0.807427H8.79231C9.00267 0.8038 9.20546 0.885326 9.35447 1.03371C9.50365 1.18194 9.58628 1.38442 9.5836 1.59462V2.09923H4.4164V1.59462ZM1.54218 2.9066H12.4578C12.8591 2.9066 13.1845 3.23192 13.1845 3.63324C13.1845 4.03456 12.8591 4.35987 12.4578 4.35987H1.54218C1.14086 4.35987 0.815545 4.03456 0.815545 3.63324C0.815545 3.23192 1.14086 2.9066 1.54218 2.9066V2.9066Z"
                  fill="#B06666"
                />
                <path
                  d="M7 6.24512C6.77703 6.24512 6.59631 6.42583 6.59631 6.64881V14.2785C6.59631 14.5013 6.77703 14.6822 7 14.6822C7.22298 14.6822 7.40369 14.5013 7.40369 14.2785V6.64881C7.40369 6.42583 7.22298 6.24512 7 6.24512Z"
                  fill="#B06666"
                />
              </svg>
            </div>
            <div class="patients-bar__archive-text">Архив пациентов</div>
          </nuxt-link>
        </div>
      </div>
      <PatientList :patients="patients" :itemsPerPage="10" />
    </div>
  </div>
</template>

<script>
import PatientList from "../components/PatientList";
import { mapGetters } from "vuex";
import fetchData from "../mixins/fetchData";

export default {
  middleware: "authorized",
  mixins: [fetchData],
  data: function() {
    return {
      filter: {
        address: "",
        ward: "",
        name: "",
        archived: false
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
  }
};
</script>

<style></style>
