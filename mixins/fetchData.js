export default {
  data: function() {
    return {
      isLoading: true
    };
  },
  created() {
    if (!this.$store.getters["patients/getPatients"].length) {
      var patientsLoaded = false;
      var menusLoaded = false;
      var checkIfLoaded = () => {
        if (patientsLoaded && menusLoaded) this.isLoading = false;
      };
      this.$store
        .dispatch("patients/fetchPatients", { self: this })
        .then(() => {
          patientsLoaded = true;
          checkIfLoaded();
        });
      this.$store.dispatch("menu/fetchMenu", { self: this }).then(() => {
        menusLoaded = true;
        checkIfLoaded();
      });
    } else {
      this.isLoading = false;
    }
  }
};
