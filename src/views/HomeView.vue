<template>
  <main class="home-container">
    <div class="home-title">
      {{ news?.title?.toUpperCase() }}
    </div>

    <div
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
  max-width: 1280px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;

  .home-date, .home-title, .home-text {
    text-align: center;
  }

  .home-title {
    padding: 20px 0px;
    font-size: 3rem;
    font-weight: bold;
  }

  .home-text {
    padding: 0px 25%;
    font-size: 1.2rem;
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
