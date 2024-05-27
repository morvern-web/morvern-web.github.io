<template>
  <main class="music-container">

    <div
      v-for="items, header in entries"
      :key="header"
      class="music-group"
    >
      <h2 class="music-header">{{ header }}</h2>
      <div class="music-grid">
        <div
          v-for="item in items"
          :key="item.title"
          class="album-entry"
        >
          <img
            :src="getImgSrc(item.title)"
            class="album-artwork"
            @click="itemClick(item)"
          />
        </div>
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
import MediaMixin from '@/components/MediaMixin.js';

export default {
  name: 'MusicView',

  mixins: [MediaMixin],

  props: {
    item: {
      type: String,
      default: null,
      required: false,
    },
  },

  computed: {
    entries() {
      const visible = this.musicData.filter((i) => {
        const showDate = i.announced ? i.announced : i.date;
        return !i.hidden && (this.$date(showDate) <= this.$date());
      });
      return {
        Albums: visible.filter((i) => i.type === 'album'),
        Singles: visible.filter((i) => i.type === 'single'),
        Live: visible.filter((i) => i.type === 'live'),
      };
    },
  },

  beforeRouteLeave() {
    this.selectedItem = null;
  },

  mounted() {
    if (this.item) {
      setTimeout(() => {
        const entry = this.entries.Albums.find((i) => i.title === this.item)
          || this.entries.Singles.find((i) => i.title === this.item)
          || this.entries.Live.find((i) => i.title === this.item);
        this.itemClick(entry);
      }, 400);
    }
  },
};
</script>

<style lang="less" scoped>
.music-container {
  .music-group {
    &:not(:first-child) {
      margin-top: 50px;
      border-top: 2px solid grey;
      padding-top: 25px;
    }
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
        border-radius: 10px;
        border: 1px solid grey;
        .shine-effect();

        .album-artwork {
          display: block;
          width: 100%;
          margin: auto;
        }
      }
    }
  }
}


@media (width <= 1024px) {
  .music-container {
    .music-group {
      .music-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 35px;
      }
    }
  }
}


@media (width <= 512px) {
  .music-container {
    .music-group {
      &:not(:first-child) {
        margin-top: 35px;
      }
      .music-grid {
        grid-template-columns: unset;
        grid-gap: 25px;
      }
    }
  }
}
</style>
