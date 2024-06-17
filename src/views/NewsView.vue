<template>
  <main class="news-container">
    <div
      v-for="news in newsItems"
      :key="news.date"
      class="news-item-container"
    >
      <div class="news-item">
        <h6 class="news-item-date">
          {{ $date(news.date).format('DD MMMM YYYY') }}
        </h6>

        <h2 class="news-item-title">
          {{ news.title.toUpperCase() }}
        </h2>

        <h6
          v-html="news.text"
          class="news-item-text"
        />

        <div
          v-if="news.body"
          class="news-item-body"
          v-html="news.body"
        />

        <div
          v-if="news.image"
          class="news-item-image-container"
        >
          <img
            :src="getImgSrc(news.image, news.imgType)"
            class="news-item-image"
            @click="news.url
              ? itemClick(news.url, true)
              : itemClick({ name: `${news.imgType}item`, item: news.imgItem })"
          />
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
    newsItems() {
      return this.newsData.filter((i) => this.$date(i.date) <= this.$date());
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
.news-container {
  min-height: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .news-item-container {
    &:not(:first-child) {
      padding-top: 25px;
    }
    &:not(:last-child) {
      padding-bottom: 25px;
      border-bottom: 2px solid grey;
    }

    .news-item {
      background-color: fade(black, 50%);
      padding: 25px 15px 35px;
      border-radius: 10px;

      .news-item-date,
      .news-item-title,
      .news-item-text,
      .news-item-body {
        margin: 0 10%;
        text-align: center;
      }

      .news-item-date {
        padding-bottom: 10px;
      }

      .news-item-title,
      .news-item-text {
        color: white;
      }

      .news-item-body {
        padding-top: 25px;
        font-size: 1.1rem;
      }

      .news-item-image-container {
        width: 100%;
        max-width: 350px;
        margin: 35px auto 0;
        border-radius: 10px;
        cursor: pointer;
        .news-item-image {
          width: 100%;
          border-radius: 10px;
        }
        .shine-effect();
      }
    }
  }
}

@media (width <= 512px) {
  .news-container {
    min-height: calc(100% - 20px);
    padding-bottom: 20px;
    line-height: 1.5;
    .news-item-container {
      .news-item {
        .news-item-title {
          padding: 15px 0px;
          font-size: 2.5rem;
        }
        .news-item-text {
          padding: 0;
        }
      }
    }
  }
}
</style>
