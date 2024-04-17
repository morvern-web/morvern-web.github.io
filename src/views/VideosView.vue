<template>
  <main class="video-container">
    <div class="video-grid">
      <div v-for="video in videos">
        <div class="video-entry">
          <img
            :src="getImgSrc(video.title, 'video')"
            class="video-artwork"
            @click="itemClick(video)"
          />
        </div>
        <h6 class="video-title">
          {{ video.title }}
        </h6>
      </div>
    </div>

    <transition name="fade-in">
      <div
        v-if="selectedItem"
        class="video-overlay-container"
      >
        <MorvVideo
          :id="selectedItem.id"
          @closeOverlay="selectedItem = null"
        />
      </div>
    </transition>
  </main>
</template>

<script>
import MediaMixin from '@/components/MediaMixin.vue';

export default {
  name: 'Videos',

  mixins: [MediaMixin],

  computed: {
    videos() {
      return this.videoData.filter((i) => !i.hidden);
    },
  },

  beforeRouteLeave() {
    this.selectedItem = null;
  },
};
</script>

<style lang="less" scoped>
.video-container {
  .video-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;

    .video-entry {
      cursor: pointer;
      overflow: hidden;
      border-radius: 20px;
      .shine-effect();

      .video-artwork {
        display: block;
        width: 100%;
      }
    }

    .video-title {
      text-align: center;
      color: white;
    }
  }
}


@media (width <= 1024px) {
  .video-container {
    .video-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 35px;
    }
  }
}


@media (width <= 512px) {
  .video-container {
    .video-grid {
      grid-template-columns: unset;
      grid-gap: 25px;
    }
  }
}
</style>
