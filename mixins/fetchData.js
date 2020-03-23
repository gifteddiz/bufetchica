export default {
  data: function() {
    return {
      isLoading: true
    };
  },
  created() {
    if (!this.$store.getters["patients/getPatients"].length) {
      this.$store
        .dispatch("patients/fetchPatients", { self: this })
        .then(() => {
          this.isLoading = false;
        });
      this.$store.dispatch("menu/fetchMenu", { self: this }).then(() => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
};
