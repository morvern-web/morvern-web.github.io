<template>
  <div class="live-date-container">
    <div
      v-for="show in shows"
      :key="show.date"
      class="live-date-entry"
    >
      <span class="live-entry-date">
        {{ $date(show.date).format('DD MMM') }} -
      </span>
      <span class="live-entry-venue">
        {{ show.venue }} - {{ show.location }}
      </span>
      <span
        v-if="show.info"
        class="live-entry-lineup"
        v-html="` - ${show.info}`"
      />
      <a v-if="show.link" :href="show.link" target="_blank" rel="external" class="live-entry-link" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MorvLive',

  props: {
    entries: {
      type: Array,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    shows() {
      const entries = this.entries.filter((i) => !i.hidden);

      if (!this.reverse) {
        return entries;
      }

      let tmp = [];
      const sortArr = Object.keys(entries).sort().reverse();
      sortArr.forEach((i) => { tmp.push(entries[i]); });
      return tmp;
    },
  },

  methods: {
    handleLinkClick(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style lang="less" scoped>
.live-date-entry {
  position: relative;
  background-color: fade(black, 50%);
  color: white;
  font-size: 1.1rem;
  padding: 10px 15px;
  padding-right: 50px;
  border-bottom: 1px dotted grey;
  &:first-child {
    border-top: 2px solid grey;
  }
  &:last-child {
    border-bottom: 2px solid grey;
  }
}

.live-entry-link {
  position: absolute;
  top: 9px;
  right: 10px;
  height: 24px;
  width: 24px;
  background-color: grey;
  border-radius: 50%;
  cursor: pointer;

  &:before {
    display: block;
    content: '';
    position: absolute;
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    top: 2px;
    left: 2px;
    background-color: black;

    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    -webkit-mask-image: url('@/assets/icons/info.svg');

    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-image: url('@/assets/icons/info.svg');
  }
}

@media (width <= 600px) {
  .live-date-entry {
    padding: 10px;
    padding-right: 40px;
  }
  .live-entry-link {
    top: 7px;
    right: 7px;
  }
}

@media (pointer: fine) {
  .live-entry-link {
    &:hover {
      background-color: white;
    }
  }
}
</style>
