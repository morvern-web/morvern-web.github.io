<template>
  <transition name="fade-transition">
    <div
      v-if="showBg"
      class="overlay-bg"
    >
      <transition :name="transitionType">
        <div
          v-if="showOverlay"
          class="overlay-container"
        >
          <div class="overlay">
            <div class="overlay-content">
              <slot />
            </div>
          </div>

          <div
            class="overlay-close-btn"
            @click="closeOverlay"
          />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MorvOverlay',

  data() {
    return {
      showBg: false,
      showOverlay: false,
      transitionType: 'slide-up-transition',
    };
  },

  mounted() {
    this.showBg = true;
    setTimeout(() => { this.showOverlay = true; }, 50);
    setTimeout(() => { this.transitionType = 'slide-down-transition'; }, 100);
  },

  methods: {
    closeOverlay() {
      this.showOverlay = false;
      setTimeout(() => { this.showBg = false; }, 250);
      setTimeout(() => { this.$emit('closeOverlay'); }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.overlay-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px;
  background: fade(black, 80%);
  display: flex;
  flex-direction: column;

  .overlay-container {
    position: relative;
    flex: 1 0 1%;
    max-height: 550px;
    width: 90%;
    max-width: 1000px;
    margin: auto;
    background: fade(grey, 70%);
    border-radius: 20px;
    padding: 25px;
    overflow: hidden;

    .overlay {
      height: 100%;
      overflow: hidden;
      .overlay-content {
        height: 100%;
        overflow: scroll;
      }
    }

    .overlay-close-btn {
      position: absolute;
      cursor: pointer;
      height: 30px;
      width: 30px;
      top: 15px;
      right: 15px;
      background-color: grey;
      border: 1px solid grey;
      border-radius: 5px;

      &:hover {
        background-color: white;
      }

      &:after {
        display: block;
        content: '';
        height: 100%;
        width: 100%;
        background-color: black;

        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
        mask-position: center;
        mask-repeat: no-repeat;
        mask-size: contain;

        -webkit-mask-image: url('@/assets/icons/closemodal.svg');
        mask-image: url('@/assets/icons/closemodal.svg');
      }
    }
  }
}


@media (width <= 600px) {
  .overlay-bg {
    padding: 15px 0px;
    .overlay-container {
      flex: unset;
      max-height: 95%;
      width: 95%;
      padding: 15px 10px;
      .overlay-close-btn {
        height: 25px;
        width: 25px;
        top: 10px;
        right: 10px;
      }
    }
  }
}


@media (height <= 600px) {
  .overlay-bg {
    padding: 10px 0px;
    .overlay-container {
      padding: 10px 15px;
    }
  }
}
</style>
