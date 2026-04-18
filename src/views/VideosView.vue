<template>
  <main class="video-container">
    <div
      v-for="group, header in videos"
      :key="group[0]?.title"
      class="video-group"
    >
      <h2 class="video-header">{{ header }}</h2>
      <div
        v-for="items in groups(group, header)"
        :key="items[0]?.title"
        class="video-grid"
      >
        <div
          v-for="video in items"
          :key="video.title"
        >
          <div class="video-entry">
            <img
              :src="getImgSrc(video?.image || video?.title, 'video')"
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

  data() {
    return {
      groupHeaders: {
        promo: 'Promo videos',
        other: 'More',
      },
    };
  },

  computed: {
    videos() {
      const filtered = this.videoData.filter((i) => !i.hidden &&
        (this.$date(i.announced || i.date) <= this.$date()));

      return {
        [this.groupHeaders.promo]: filtered.filter((i) => !i.notPromo),
        [this.groupHeaders.other]: filtered.filter((i) => !!i.notPromo),
      };
    },

    groups() {
      return (group, groupName) => {
        if (groupName !== this.groupHeaders.promo) {
          return [group];
        }

        return window.innerWidth > 1024
          ? [group.slice(0, 3), group.slice(3)]
          : window.innerWidth > 512
            ? [group.slice(0, 2), group.slice(2)]
            : [group.slice(0, 1), group.slice(1)];
      }
    },
  },

  beforeRouteLeave() {
    this.selectedItem = null;
  },

  activated() {
    if (this.item) {
      setTimeout(() => { this.openItem(this.item); }, 100);
    }
  },

  methods: {
    openItem(itemTitle) {
      setTimeout(() => {
        const video = this.videos[this.groupHeaders.promo].find((i) =>
          i.title === itemTitle)
          || this.videos[this.groupHeaders.other].find((i) =>
            i.title === itemTitle);

        this.itemClick(video);
      }, 350);
    },
  },
};
</script>

<style lang="less" scoped>
.video-container {
  .video-group {
    .video-grid {
      display: grid;

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

    &:first-child {
      .video-grid {
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
      .video-grid {
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
