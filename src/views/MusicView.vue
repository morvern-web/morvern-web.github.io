<template>
  <main class="music-container">

    <div
      v-for="group, header in entries"
      :key="header"
      class="music-group"
    >
      <h2 class="music-header">{{ header }}</h2>
      <div
        v-for="items in groups(group, header)"
        :key="items[0]?.title"
        class="music-grid"
      >
        <div
          v-for="item in items"
          :key="item.title"
        >
          <div class="album-entry">
            <img
              :src="getImgSrc(item.title)"
              class="album-artwork"
              @click="itemClick(item)"
            />
            <MorvHover
              :item="item"
              @click="itemClick(item)"
            />
          </div>
          <h6
            class="album-title"
            :class="item.type"
            @click="itemClick(item)"
          >
            {{ item.title }}
          </h6>
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
        'Albums & EPs': visible.filter((i) => i.type === 'album' || i.type === 'ep'),
        Singles: visible.filter((i) => i.type === 'single'),
        Live: visible.filter((i) => i.type === 'live'),
      };
    },

    groups() {
      return (group, groupName) => {
        if (groupName !== 'Albums & EPs') {
          return [group];
        }

        return window.innerWidth > 1024
          ? [group.slice(0, 3), group.slice(3)]
          : [group.slice(0, 2), group.slice(2)];
      }
    },
  },

  beforeRouteLeave() {
    this.selectedItem = null;
  },

  mounted() {
    if (this.item) {
      setTimeout(() => {
        const entry = this.entries['Albums & EPs'].find((i) => i.title === this.item)
          || this.entries.Singles.find((i) => i.title === this.item)
          || this.entries.Live.find((i) => i.title === this.item);
        this.itemClick(entry);
      }, 350);
    }
  },
};
</script>

<style lang="less" scoped>
.music-container {
  .music-group {
    .music-grid {
      display: grid;

      .album-entry {
        position: relative;
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

      .album-title {
        @media(pointer: fine) {
          display: none;
        }

        text-align: center;
        color: white;
        cursor: pointer;

        &.album, &.ep, &.live {
          font-style: italic;
        }
      }
    }

    &:first-child {
      .music-grid {
        &:first-of-type {
          .big-grid();
        }

        &:not(:first-of-type) {
          .small-grid();
        }
      }
    }

    &:not(:first-child) {
      margin-top: 50px;
      border-top: 2px solid grey;
      padding-top: 25px;
      .music-grid {
        .small-grid();
      }
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
    margin-bottom: 30px;
  }

  @media (width <= 512px) {
    grid-template-columns: 1fr;
    grid-gap: 25px;
    margin-bottom: 25px;
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
