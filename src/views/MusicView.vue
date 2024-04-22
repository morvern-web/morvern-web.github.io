<template>
  <main class="music-container">
    <div class="music-grid">
      <div
        v-for="album in albums"
        class="album-entry"
      >
        <img
          :src="getImgSrc(album.title)"
          class="album-artwork"
          @click="itemClick(album)"
        />
      </div>
    </div>

    <transition name="fade-in">
      <div
        v-if="selectedItem"
        class="album-overlay-container"
      >
        <MorvAlbum
          :album="selectedItem"
          @closeOverlay="selectedItem = null"
        />
      </div>
    </transition>
  </main>
</template>

<script>
import MediaMixin from '@/components/MediaMixin.vue';

export default {
  name: 'Music',

  mixins: [MediaMixin],

  computed: {
    albums() {
      return this.musicData.filter((i) => !i.hidden);
    },
  },

  beforeRouteLeave() {
    this.selectedItem = null;
  },
};
</script>

<style lang="less" scoped>
.music-container {
  .music-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;

    .album-entry {
      cursor: pointer;
      width: fit-content;
      height: fit-content;
      margin: auto;
      margin-top: 0;
      overflow: hidden;
      border-radius: 20px;
      .shine-effect();

      .album-artwork {
        display: block;
        width: 100%;
        margin: auto;
      }
    }
  }
}


@media (width <= 1024px) {
  .music-container {
    .music-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 35px;
    }
  }
}


@media (width <= 512px) {
  .music-container {
    .music-grid {
      grid-template-columns: unset;
      grid-gap: 25px;
    }
  }
}
</style>
