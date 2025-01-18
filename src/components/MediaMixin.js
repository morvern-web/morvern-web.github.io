export default {
  name: 'MediaData',

  data() {
    return {
      selectedItem: null,
    };
  },

  methods: {
    getImgSrc(img, type = 'music') {
      const filename = `${img.toLowerCase().replace(/[\s.,?'()0-9]/g, '')}.jpg`;

      const path = (type === 'video')
        ? `../assets/videos/${filename}`
        : `../assets/${type}/${filename}`;

      const modules = import.meta.glob('../assets/*/*', { eager: true });

      return modules[path].default;
    },

    itemClick(item) {
      if (item === this.selectedItem) {
        return this.selectedItem = null;
      }
      this.selectedItem = item;
    },
  },
};
