<template>
  <div>
    <PatientBlock
      v-bind:parameters="patient"
      v-for="patient in patients.slice(offsetItems, offsetItems + itemsPerPage)"
      :key="patient.id"
    />
    <div class="pagination" v-if="pages > 1">
      <a
        href="#"
        class="pagination__back"
        v-if="page !== 1"
        @click.prevent="pageSwitch(parseInt(page) - 1)"
      >
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.7437 20L0.743752 10L10.7438 -2.19103e-07L13.25 2.5L5.74375 10L13.25 17.5L10.7437 20Z"
            fill="#8E7E63"
          />
        </svg>
      </a>
      <a
        href="#"
        class="pagination__item"
        v-for="(pageNum, index) in pages"
        :class="{ '--active': page === pageNum }"
        :key="index"
        @click.prevent="pageSwitch(pageNum)"
        >{{ pageNum }}</a
      >
      <a
        href="#"
        class="pagination__next"
        v-if="page !== pages"
        @click.prevent="pageSwitch(parseInt(page) + 1)"
      >
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.25625 0L13.2562 10L3.25625 20L0.75 17.5L8.25625 10L0.75 2.5L3.25625 0Z"
            fill="#8E7E63"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import PatientBlock from "../components/PatientBlock";

export default {
  components: {
    PatientBlock
  },
  computed: {
    page: function() {
      var page = 1;
      if (this.$route.query.page) page = this.$route.query.page;
      return page;
    },
    pages: function() {
      return Math.ceil(this.patients.length / this.itemsPerPage);
    },
    offsetItems: function() {
      return (this.page - 1) * this.itemsPerPage;
    }
  },
  props: ["patients", "itemsPerPage"],
  methods: {
    pageSwitch(page) {
      this.$router.push({ path: this.$route.path, query: { page: page } });
    }
  }
};
</script>

<style></style>
