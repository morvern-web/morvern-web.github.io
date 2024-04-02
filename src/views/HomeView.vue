<template>
  <main class="home-container">
    <h1 class="home-title">
      {{ news?.title?.toUpperCase() }}
    </h1>

    <h5
      v-html="news?.text"
      class="home-text"
    />
  </main>
</template>

<script>
import JsonData from '@/components/JsonData.vue';

export default {
  mixins: [JsonData],

  computed: {
    news() {
      return this.newsData.find((i) => this.$date(i.date) < this.$date());
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;

  .home-date, .home-title, .home-text {
    text-align: center;
  }
}

@media (width <= 600px) {
  .home-container {
    height: auto;
    min-height: 100%;
    padding-bottom: 20px;
    line-height: 1.5;
    .home-title {
      padding: 15px 0px;
      font-size: 2.5rem;
    }
    .home-text {
      padding: 0;
    }
  }
}
</style>
