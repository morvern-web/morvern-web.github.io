<template>
  <div class="icon-container">
    <div
      v-for="(url, key) in formattedIcons"
      :key="key"
      class="icon"
      :class="[key, size, { 'selected': (selected === key) }]"
      @click="handleClick(url, key)"
    >
      <div class="icon-tooltip">
        {{ tooltipText(key) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MorvIcons',

  props: {
    icons: {
      type: [Array, Object],
      default: () => {},
    },
    size: {
      type: String,
      default: '',
    },
    selected: {
      type: String,
      default: '',
    },
  },

  computed: {
    formattedIcons() {
      if (Array.isArray(this.icons)) {
        return this.icons.reduce((o, key) => ({ ...o, [key]: ''}), {});
      }
      return this.icons;
    },

    tooltipText() {
      return (string) => {
        return (string === 'applemusic') ? 'Apple Music'
          : string.charAt(0).toUpperCase() + string.slice(1);
      };
    },
  },

  methods: {
    handleClick(url = null, key = null) {
      if (!url) {
        return this.$emit('click', key);
      }
      window.open(url, '_blank');
    }
  }
};
</script>

<style lang="less" scoped>
.icon-container {
  display: flex;
  flex-wrap: wrap;

  .icon {
    position: relative;
    cursor: pointer;
    height: 35px;
    width: 35px;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    border: 2.5px solid grey;
    border-radius: 50%;
    background-color: black;

    .icon-tooltip {
      .icon-tooltip();
    }

    &:before {
      display: block;
      content: '';
      position: relative;
      height: calc(100% - 4px);
      width: calc(100% - 4px);
      top: 2px;
      left: 2px;
      background-color: grey;

      -webkit-mask-position: center;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
      mask-size: contain;
    }

    &:hover {
      .icon-tooltip {
        .icon-tooltip-hover();
      }
    }

    &:hover, &.selected {
      border-color: white;
      &:before {
        background-color: white;
      }
    }
  }

  .cover {
    &:before {
      height: calc(100% - 10px);
      width: calc(100% - 10px);
      top: 5px;
      left: 5px;
      -webkit-mask-image: url('@/assets/icons/cover.svg');
      mask-image: url('@/assets/icons/cover.svg');
    }
  }

  .tracklist {
    &:before {
      height: calc(100% - 12px);
      width: calc(100% - 12px);
      top: 6px;
      left: 6px;
      -webkit-mask-image: url('@/assets/icons/tracklist.svg');
      mask-image: url('@/assets/icons/tracklist.svg');
    }
  }

  .credits {
    &:before {
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      top: 4px;
      left: 4px;
      -webkit-mask-image: url('@/assets/icons/credits.svg');
      mask-image: url('@/assets/icons/credits.svg');
    }
  }

  .bandcamp, .spotify {
    background-color: grey;
    border: 2px solid grey;
    &:before {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: black;
    }
    &:hover, &.selected {
      background-color: white;
      &:before {
        background-color: black;
      }
    }
  }

  .applemusic {
    &:before {
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      top: 3px;
      left: 4px;
      -webkit-mask-image: url('@/assets/icons/applemusic.svg');
      mask-image: url('@/assets/icons/applemusic.svg');
    }
  }

  .bandcamp {
    &:before {
      -webkit-mask-image: url('@/assets/icons/bandcamp.svg');
      mask-image: url('@/assets/icons/bandcamp.svg');
    }
  }

  .deezer {
    &:before {
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      top: 5px;
      left: 4px;
      -webkit-mask-image: url('@/assets/icons/deezer.svg');
      mask-image: url('@/assets/icons/deezer.svg');
    }
  }

  .facebook {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    border: none;
    background-color: grey;
    &:before {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: black;
      -webkit-mask-image: url('@/assets/icons/facebook.svg');
      mask-image: url('@/assets/icons/facebook.svg');
    }
    &:hover, &.selected {
      background-color: white;
      &:before {
        background-color: black;
      }
    }
  }

  .instagram {
    &:before {
      -webkit-mask-image: url('@/assets/icons/instagram.svg');
      mask-image: url('@/assets/icons/instagram.svg');
    }
  }

  .linktree {
    &:before {
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      top: 4px;
      left: 4px;
      -webkit-mask-image: url('@/assets/icons/linktree.svg');
      mask-image: url('@/assets/icons/linktree.svg');
    }
  }

  .spotify {
    &:before {
      -webkit-mask-image: url('@/assets/icons/spotify.svg');
      mask-image: url('@/assets/icons/spotify.svg');
    }
  }

  .youtube {
    &:before {
      height: calc(100% - 6px);
      width: calc(100% - 6px);
      top: 3px;
      left: 3px;
      -webkit-mask-image: url('@/assets/icons/youtube.svg');
      mask-image: url('@/assets/icons/youtube.svg');
    }
  }


  .small {
    margin: 5px;
    margin-bottom: 0;
    height: 30px;
    width: 30px;

    &.cover {
      &:before {
        height: calc(100% - 10px);
        width: calc(100% - 10px);
        top: 5px;
        left: 5px;
      }
    }

    &.tracklist {
      &:before {
        height: calc(100% - 10px);
        width: calc(100% - 10px);
        top: 5px;
        left: 5px;
      }
    }

    &.credits {
      &:before {
        height: calc(100% - 8px);
        width: calc(100% - 8px);
        top: 4px;
        left: 4px;
      }
    }

    &.bandcamp, &.spotify {
      &:before {
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
    }

    &.applemusic {
      &:before {
        height: calc(100% - 6px);
        width: calc(100% - 6px);
        top: 2px;
        left: 3px;
      }
    }

    &.deezer {
      &:before {
        height: calc(100% - 6px);
        width: calc(100% - 6px);
        top: 4px;
        left: 3px;
      }
    }

    &.instagram {
      &:before {
        height: calc(100% - 8px);
        width: calc(100% - 8px);
        top: 4px;
        left: 4px;
      }
    }
  }
}
</style>
