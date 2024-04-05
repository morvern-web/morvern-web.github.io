<template />

<script>
export default {
  name: 'JsonData',

  data() {
    return {
      aboutData: [],
      linkData: [],
      liveData: [],
      musicData: [],
      newsData: [],
      videoData: [],
    };
  },

  mounted() {
    [
      'aboutData',
      'linkData',
      'liveData',
      'musicData',
      'newsData',
      'videoData',
    ].forEach((i) => {
      this.getData(i);
    });
  },

  methods: {
    getData(type) {
      if (!type) {
        return;
      }

      const json = (type === 'musicData')
        ? import.meta.glob('../content/music/*.json')
        : (type === 'liveData')
          ? import.meta.glob('../content/live/*.json')
          : (type === 'videoData')
            ? import.meta.glob('../content/videos.json')
            : (type === 'aboutData')
              ? import.meta.glob('../content/about.json')
              : (type === 'linkData')
                ? import.meta.glob('../content/links.json')
                : import.meta.glob('../content/news/*.json');

      for (const path in json) {
        json[path]().then((mod) => {

          if (!Array.isArray(mod.default)) {
            this[type].push(mod.default);
          } else {
            mod.default.forEach((i) => { this[type].push(i); });
          }

          this[type].sort((a, b) => {
            return (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0;
          });
        });
      }
    },
  },
};
</script>
