<template>
  <main class="live-container">
    <div
      v-for="(dateGroup, groupHeader) in groupedDates"
      class="live-group"
    >
      <h2 class="live-group-header">
        {{ groupHeader }}
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

          <div
            v-for="show in shows"
            class="live-date-entry"
          >
            <span class="live-entry-date">
              {{ $date(show.date).format('DD MMM YYYY') }} -
            </span>
            <span class="live-entry-venue">
              {{ show.venue }} - {{ show.location }}
            </span>
            <span
              v-if="show.info"
              class="live-entry-lineup"
              v-html="` - ${show.info}`"
            />
            <div
              v-if="show.link"
              class="live-entry-link"
              @click="handleLinkClick(show.link)"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JsonData from '@/components/JsonData.vue';

export default {
  mixins: [JsonData],

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

      .live-date-header {
        border-bottom: 2px solid grey;
      }
    }

    .live-date-entry {
      position: relative;
      background-color: fade(black, 50%);
      color: white;
      font-size: 1.1rem;
      padding: 10px 15px;
      padding-right: 50px;
      border-bottom: 1px dotted grey;
      &:last-child {
        border-bottom: 2px solid grey;
      }
      &.live-group-empty {
        border-top: 2px solid grey;
        border-bottom: 2px solid grey;
        display: flex;
        flex-wrap: wrap;
        :first-child {
          padding-right: 5px;
        }
      }
    }
  }
}

.live-entry-link {
  position: absolute;
  top: 12px;
  right: 10px;
  height: 25px;
  width: 25px;
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

  &:hover {
    background-color: white;
  }
}

@media (width <= 600px) {
  .live-container {
    .live-group {
      .live-date-group {
        .live-date-entry {
          padding: 10px;
          padding-right: 40px;
        }
      }
    }
  }
}
</style>
