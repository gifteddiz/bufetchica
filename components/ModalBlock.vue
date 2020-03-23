<template>
  <div>
    <transition name="fade">
      <div class="modal-wrapper" v-if="show" @click.prevent="toggleShow">
        <div class="modal" @click.stop>
          <a href="#" class="modal-close" @click.prevent="toggleShow">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6068 0.294102C11.9973 0.684627 11.9973 1.31779 11.6068 1.70832L1.70726 11.6078C1.31673 11.9983 0.683568 11.9983 0.293043 11.6078C-0.097481 11.2173 -0.0974806 10.5841 0.293043 10.1936L10.1925 0.294102C10.5831 -0.096422 11.2162 -0.096422 11.6068 0.294102Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6066 11.6066C11.2161 11.9971 10.5829 11.9971 10.1924 11.6066L0.292893 1.70711C-0.0976309 1.31658 -0.0976312 0.683417 0.292893 0.292893C0.683417 -0.0976312 1.31658 -0.0976308 1.70711 0.292893L11.6066 10.1924C11.9971 10.5829 11.9971 11.2161 11.6066 11.6066Z"
                fill="white"
              />
            </svg>
          </a>
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["show"],
  methods: {
    toggleShow: function() {
      this.$emit("toggleShow");
    }
  }
};
</script>

<style>
</style>