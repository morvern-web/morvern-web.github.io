<template>
  <main class="home-container">

    <!-- NEWS -->
    <div class="home-news-container">
      <h1 class="home-news-title">
        {{ news?.title?.toUpperCase() }}
      </h1>

      <h5
        v-html="news?.text"
        class="home-news-text"
      />

      <div
        v-if="news?.image"
        class="home-news-image-container"
        :class="[
          news.imgType,
          { 'clickable': news.imgUrl || news.imgItem },
        ]"
      >
        <img
          :src="getImgSrc(news.image, news.imgType)"
          class="home-news-image"
          @click="news.imgUrl
            ? itemClick(news.imgUrl, true)
            : news.imgItem
              ? itemClick({ name: `${news.imgType}item`, item: news.imgItem })
              : null"
        />
      </div>

      <div
        class="home-news-archive"
        @click="itemClick('news')"
      >
        See more >>
      </div>

      <div
        class="home-news-more"
        :style="`opacity:${1 - Math.min(scrollPosition / 100, 1)};`"
      >
        ⌄
      </div>
    </div>

    <!-- LIVE -->
    <div
      v-if="live.length"
      class="home-live-container"
    >
      <h4
        class="home-live-header"
        @click="itemClick('live')"
      >
        Upcoming live events
      </h4>
      <MorvLive
        :entries="live"
        :reverse="true"
      />
    </div>

    <div class="home-media-container">
      <!-- ALBUM -->
      <div class="home-album-container">
        <h4
          class="home-album-header"
          @click="itemClick('music')"
        >
          Latest music
        </h4>
        <div class="home-album">
          <h6
            class="home-album-title"
            :class="album?.type"
            @click="itemClick({ name: 'musicitem', item: album.title })"
          >
            {{ album?.title }}
          </h6>
          <div class="home-album-artwork-container">
            <img
              :src="album ? getImgSrc(album?.title, 'music') : null"
              class="home-album-artwork"
              @click="itemClick({ name: 'musicitem', item: album.title })"
            />
          </div>
        </div>
      </div>

      <!-- VIDEO -->
      <div class="home-video-container">
        <h4
          class="home-video-header"
          @click="itemClick('videos')"
        >
          Latest video
        </h4>
        <div class="home-video">
          <h6
            class="home-video-title"
              @click="itemClick({ name: 'videositem', item: video.title })"
          >
            {{ video?.title }}
          </h6>
          <div class="home-video-artwork-container">
            <img
              :src="video ? getImgSrc(video?.title, 'video') : null"
              class="home-video-artwork"
              @click="itemClick({ name: 'videositem', item: video.title })"
            />
          </div>
        </div>
      </div>

      <!-- PHOTO -->
      <div
        v-if="photo"
        class="home-photo-container"
      >
        <h4
          class="home-photo-header"
          @click="itemClick('photos')"
        >
          Latest photo:
        </h4>
        <div class="home-photo">
          <h6
            class="home-photo-title"
            @click="itemClick({ name: 'photositem', item: photo.title })"
          >
            {{ photo?.title }}
          </h6>
          <div class="home-photo-artwork-container">
            <img
              :src="photo ? getImgSrc(photo?.title, 'photo') : null"
              class="home-photo-artwork"
              @click="itemClick({ name: 'photositem', item: photo.title })"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import MediaMixin from '@/components/MediaMixin.js';

export default {
  name: 'HomeView',

  mixins: [MediaMixin],

  data() {
    return {
      scrollPosition: null,
    };
  },

  computed: {
    news() {
      return this.newsData.find((i) => this.$date(i.date) < this.$date());
    },

    live() {
      return this.liveData.filter((i) =>
        this.$date(i.date).add(1, 'days') > this.$date() && this.$date(i.announced) < this.$date()
      );
    },

    album() {
      return this.musicData.filter((i) => !i.hidden && (this.$date(i.date) <= this.$date()))[0];
    },

    video() {
      return this.videoData.filter((i) => !i.hidden && (this.$date(i.date) <= this.$date()))[0];
    },

    photo() {
      return null;
    },
  },

  mounted() {
    const container = document.querySelector('.content-container');
    container.addEventListener('scroll', () => {
      this.scrollPosition = container.scrollTop;
    }, { passive: true });
  },

  methods: {
    itemClick(route, isUrl = false) {
      if (isUrl) {
        window.open(route, '_blank');
        return;
      }
      this.$emit('routeChange', route);
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.home-news-container {
  position: relative;
  min-height: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .home-news-date,
  .home-news-title,
  .home-news-text {
    color: white;
    text-align: center;
  }

  .home-news-title {
    padding-top: 0;
  }

  .home-news-archive {
    display: none;
    cursor: pointer;
    padding-top: 1.5rem;
    text-align: center;
    &:hover {
      color: white;
    }
  }

  .home-news-image-container {
    width: 80%;
    max-width: 350px;
    margin: 35px auto 0;
    border-radius: 10px;
    .home-news-image {
      width: 100%;
      border-radius: 10px;
    }
    &.music {
      max-width: 250px;
    }
    &.clickable {
      cursor: pointer;
      .shine-effect();
    }
  }

  .home-news-more {
    display: none;
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    pointer-events: none;
    @media(pointer: coarse) {
      display: none;
    }
  }
}

.home-live-container,
.home-media-container {
  border-top: 2px solid grey;
  min-height: 275px;
  padding-top: 75px;
  padding-bottom: 75px;
  .home-live-header,
  .home-album-header,
  .home-video-header,
  .home-photo-header {
    color: white;
    cursor: pointer;
  }
  .home-live-header {
    padding-bottom: 10px;
  }
}

.home-media-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  padding-bottom: 50px;
  .home-album-container,
  .home-video-container,
  .home-photo-container {
    .home-album,
    .home-video,
    .home-photo {
      width: 100%;
      background-color: fade(black, 50%);
      border-radius: 10px;
      padding: 20px;
      padding-top: 12px;
    }
  }
}

.home-album {
  .home-album-title {
    padding-right: 10px;
    &:not(.single) {
      font-style: italic;
    }
  }
}

.home-album,
.home-video,
.home-photo {
  .home-album-title,
  .home-video-title,
  .home-photo-title {
    text-align: center;
    color: white;
    padding-bottom: 10px;
    cursor: pointer;
  }
  .home-album-artwork-container,
  .home-video-artwork-container,
  .home-photo-atrwork-container {
    width: fit-content;
    height: fit-content;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid grey;
    .shine-effect();
    .home-album-artwork,
    .home-video-artwork,
    .home-photo-artwork {
      display: block;
      width: 100%;
      margin: auto;
      cursor: pointer;
    }
  }
}

@media (width <= 1024px) {
  .home-media-container {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 35px;
  }
}

@media (width <= 512px) {
  .home-news-container {
    min-height: calc(100% - 10px);
    margin-bottom: 35px;
    .home-news-text {
      padding: 0;
    }
  }
  .home-live-container,
  .home-media-container {
    min-height: 175px;
    padding-top: 25px;
    padding-bottom: 35px;
  }
  .home-media-container {
    grid-template-columns: 1fr;
  }
}
</style>
