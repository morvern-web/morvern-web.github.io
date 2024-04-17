<template>
  <main class="live-container">
    <div
      v-for="(dateGroup, groupHeader) in groupedDates"
      class="live-group"
    >
      <h2 class="live-group-header">
        {{ groupHeader }}:
      </h2>

      <div
        v-if="!dateGroup[0]"
        class="live-group-empty live-date-entry"
      >
        <span>We have not announced any upcoming shows at this time. </span>
        <span>Check back often for updates.</span>
      </div>

      <div
        v-for="group in dateGroup"
        class="live-date-group"
      >
        <div v-for="(shows, dateHeader) in group">
          <h4 class="live-date-header">
            {{ dateHeader }}
          </h4>

          <MorvLive
            :entries="shows"
            :reverse="(groupHeader === 'Upcoming')"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Live',

  data() {
    return {
      groupedDates: {},
    };
  },

  mounted() {
    setTimeout(() => {
      const tmp = {};

      this.liveData.forEach((i) => {
        if (i.announced && this.$date(i.announced) > this.$date()) {
          return;
        }

        const date = this.$date(i.date);
        const group = (date > this.$date()) ? 'Upcoming' : 'Previous';
        const year = date.format('YYYY');

        if (!tmp[group]) {
          tmp[group] = {};
        }
        if (!tmp[group][year]) {
          tmp[group][year] = [];
        }
        tmp[group][year].push(i);
      });

      this.groupedDates['Upcoming'] = [tmp['Upcoming']];
      this.groupedDates['Previous'] = [];

      const sortArr = Object.keys(tmp['Previous']).sort().reverse();
      sortArr.forEach((i) => {
        this.groupedDates['Previous'].push({ [i]: tmp['Previous'][i] });
      });
    }, 10);
  },

  methods: {
    handleLinkClick(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style lang="less" scoped>
.live-container {
  .live-group {
    &:not(:last-child) {
      padding-bottom: 25px;
      border-bottom: 2px solid grey;
      margin-bottom: 40px;
    }

    .live-date-group {
      margin-bottom: 25px;
    }
  }
}

.live-group-empty {
  position: relative;
  background-color: fade(black, 50%);
  color: white;
  font-size: 1.1rem;
  padding: 10px 15px;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  display: flex;
  flex-wrap: wrap;
  :first-child {
    padding-right: 5px;
  }
}
</style>
