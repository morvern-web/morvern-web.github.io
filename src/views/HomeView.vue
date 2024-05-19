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
      >
        <img
          :src="getImgSrc(news.image, news.imgType)"
          class="home-news-image"
          @click="news.url
            ? itemClick(news.url, true)
            : itemClick({ name: `${news.imgType}item`, item: news.imgItem })"
        />
      </div>
    </div>

    <!-- LIVE -->
    <div
      v-if="live.length"
      class="home-live-container"
    >
      <h4 class="home-live-header">
        Upcoming live events:
      </h4>
      <MorvLive
        :entries="live"
        :reverse="true"
      />
    </div>

    <div class="home-media-container">
      <!-- ALBUM -->
      <div class="home-album-container">
        <h4 class="home-album-header">
          Latest music:
        </h4>
        <div class="home-album">
          <h6
            class="home-album-title"
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
        <h4 class="home-video-header">
          Latest video:
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
        <h4 class="home-photo-header">
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
      return this.musicData[0];
    },

    video() {
      return this.videoData[0];
    },

    photo() {
      return null;
    },
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
  min-height: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;

  .home-news-date,
  .home-news-title,
  .home-news-text {
    text-align: center;
  }

  .home-news-image-container {
    width: 100%;
    max-width: 350px;
    margin: 35px auto 0;
    border-radius: 20px;
    cursor: pointer;
    .home-news-image {
      width: 100%;
    }
    .shine-effect();
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
      border-radius: 20px;
      padding: 20px;
      padding-top: 12px;
    }
  }
}

.home-album {
  .home-album-title {
    font-style: italic;
    padding-right: 10px;
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
    border-radius: 20px;
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
    min-height: calc(100% - 20px);
    padding-bottom: 20px;
    line-height: 1.5;
    .home-news-title {
      padding: 15px 0px;
      font-size: 2.5rem;
    }
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
