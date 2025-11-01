<template>
  <main class="video-container">
    <div
      v-for="group in videos"
      :key="group[0]?.title"
      class="video-grid"
    >
      <div
        v-for="video in group"
        :key="video.title"
      >
        <div class="video-entry">
          <img
            :src="getImgSrc(video?.title, 'video')"
            class="video-artwork"
            @click="itemClick(video)"
          />
          <MorvHover
            :item="video"
            type="video"
            @click="itemClick(video)"
          />
        </div>
        <h6
          class="video-title"
          @click="itemClick(video)"
        >
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
import MediaMixin from '@/components/MediaMixin.js';

export default {
  name: 'VideosView',

  mixins: [MediaMixin],

  props: {
    item: {
      type: String,
      default: null,
      required: false,
    },
  },

  computed: {
    videos() {
      const filtered = this.videoData.filter((i) => !i.hidden && (this.$date(i.date) <= this.$date()));

      return window.innerWidth > 1024
        ? [filtered.slice(0, 3), filtered.slice(3)]
        : [filtered.slice(0, 2), filtered.slice(2)];
    },
  },

  beforeRouteLeave() {
    this.selectedItem = null;
  },

  mounted() {
    if (this.item) {
      setTimeout(() => {
        const video = this.videos.find((i) => i.title === this.item);
        this.itemClick(video);
      }, 350);
    }
  },
};
</script>

<style lang="less" scoped>
.video-container {
  .video-grid {
    display: grid;

    &:first-of-type {
      .big-grid();
    }
    &:not(:first-of-type) {
      .small-grid();
    }

    .video-entry {
      cursor: pointer;
      overflow: hidden;
      border-radius: 10px;
      border: 1px solid grey;
      .shine-effect();

      .video-artwork {
        display: block;
        width: 100%;
      }
    }

    .video-title {
      @media(pointer: fine) {
        display: none;
      }

      text-align: center;
      color: white;
      cursor: pointer;
    }
  }
}


.big-grid() {
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 35px;
  margin-bottom: 30px;

  @media (width <= 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }

  @media (width <= 512px) {
    grid-template-columns: 1fr;
    grid-gap: 25px;
  }
}


.small-grid() {
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  margin-bottom: 25px;

  @media (width <= 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 25px;
  }

  @media (width <= 512px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
}
</style>
