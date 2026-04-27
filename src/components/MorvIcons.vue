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
        {{ readableName(key) }}
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
    resize: {
      type: Boolean,
      default: true,
    },
    selected: {
      type: String,
      default: '',
    },
    list: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formattedIcons() {
      if (Array.isArray(this.icons)) {
        // album icons
        return this.icons.reduce((o, key) => ({ ...o, [key]: ''}), {});
      }

      // omit unmaintained sites
      let omit = ['bandsintown', 'boomplay', 'facebook'];

      if (!this.list) {
        omit.push(...[
          'boomplay',
          'kkbox',
          'pandora',
          'shazam',
          'soundcloud',
          'qobuz',
          'youseemusik',
        ]);
      }

      return Object.keys({ ...this.icons })
        .reduce((newObj, key) => {
          return {
            ...newObj,
            ...(!omit.includes(key) && { [key]: this.icons[key] }),
          };
        }, {});
    },

    readableName() {
      return (string) => {
        if (['bandsintown', 'qobuz'].includes(string)) {
          return string;
        }

        if (['kkbox'].includes(string)) {
          return string.toUpperCase();
        }

        if (string.includes('youtube')) {
          string = string.replace('tube', 'Tube');
        }

        if (string.includes('soundcloud')) {
          string = string.replace('cloud', 'Cloud');
        }

        if (string.includes('yousee')) {
          string = string.replace('see', 'See');
        }

        const match = string.match(/mu(s|z)i(c|k)/);
        if (match) {
          let arr = [
            string.substr(0, match.index),
            string.substr(match.index),
          ];
          arr[1] = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);
          string = arr.join(' ');
        }

        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    },
  },

  mounted() {
    this.setIconSize();
  },

  methods: {
    setIconSize() {
      if (!this.resize || this.size === 'small') {
        return;
      }

      const container = document.querySelector('.icon-container');
      const icons = container.querySelectorAll('.icon');

      icons.forEach((i) => {
        i.style.height = '';
        i.style.flexShrink = 1;
      });

      this.$nextTick(() => {
        const style = window.getComputedStyle(icons[0]);

        if (style.height === style.width) {
          return;
        }

        icons.forEach((i) => {
          i.style.height = i.style.width;
        });
      });
    },

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
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  &:has(.small) {
    flex-wrap: wrap;
  }

  .icon {
    position: relative;
    cursor: pointer;
    height: 35px;
    flex: 0 0 35px;
    margin-top: 5px;
    margin-left: 2px;
    margin-right: 2px;
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

    &.selected {
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
    &.selected {
      background-color: white;
      &:before {
        background-color: black;
      }
    }
  }

  .amazonmusic {
    &:before {
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      top: 4px;
      left: 4px;
      -webkit-mask-image: url('@/assets/icons/amazonmusic.svg');
      mask-image: url('@/assets/icons/amazonmusic.svg');
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

  .bandsintown {
    &:before {
      -webkit-mask-image: url('@/assets/icons/bandsintown.svg');
      mask-image: url('@/assets/icons/bandsintown.svg');
    }
  }

  .boomplay {
    background-color: grey;
    &:before {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: black;
      -webkit-mask-image: url('@/assets/icons/boomplay.png');
      mask-image: url('@/assets/icons/boomplay.png');
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
    &.selected {
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

  .kkbox {
    &:before {
      height: calc(100% - 2px);
      width: calc(100% - 2px);
      top: 1px;
      left: 1px;
      -webkit-mask-image: url('@/assets/icons/kkbox.png');
      mask-image: url('@/assets/icons/kkbox.png');
    }
  }

  .linkpop {
    &:before {
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      top: 4px;
      left: 4px;
      -webkit-mask-image: url('@/assets/icons/linkpop.svg');
      mask-image: url('@/assets/icons/linkpop.svg');
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

  .pandora {
    &:before {
      height: calc(100% - 10px);
      width: calc(100% - 10px);
      top: 5px;
      left: 6px;
      -webkit-mask-image: url('@/assets/icons/pandora.svg');
      mask-image: url('@/assets/icons/pandora.svg');
    }
  }

  .qobuz {
    &:before {
      -webkit-mask-image: url('@/assets/icons/qobuz.svg');
      mask-image: url('@/assets/icons/qobuz.svg');
    }
  }

  .shazam {
    background-color: grey;
    &:before {
      background-color: black;
      height: 100%;
      width: 100%;
      top: 0px;
      left: 0px;
      -webkit-mask-image: url('@/assets/icons/shazam.svg');
      mask-image: url('@/assets/icons/shazam.svg');
    }
  }

  .soundcloud {
    &:before {
      height: calc(100% - 6px);
      width: calc(100% - 6px);
      top: 2px;
      left: 3px;
      -webkit-mask-image: url('@/assets/icons/soundcloud.svg');
      mask-image: url('@/assets/icons/soundcloud.svg');
    }
  }

  .spotify {
    &:before {
      -webkit-mask-image: url('@/assets/icons/spotify.svg');
      mask-image: url('@/assets/icons/spotify.svg');
    }
  }

  .tidal {
    &:before {
      height: calc(100% - 6px);
      width: calc(100% - 6px);
      top: 3px;
      left: 3px;
      -webkit-mask-image: url('@/assets/icons/tidal.svg');
      mask-image: url('@/assets/icons/tidal.svg');
    }
  }

  .youseemusik {
    &:before {
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      top: 3.5px;
      left: 3.5px;
      -webkit-mask-image: url('@/assets/icons/youseemusik.svg');
      mask-image: url('@/assets/icons/youseemusik.svg');
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

  .youtubemusic {
    &:before {
      height: calc(100% - 2px);
      width: calc(100% - 2px);
      top: 1px;
      left: 1px;
      -webkit-mask-image: url('@/assets/icons/youtubemusic.svg');
      mask-image: url('@/assets/icons/youtubemusic.svg');
    }
  }


  .small {
    margin-right: 2px;
    margin-left: 2px;
    margin-bottom: 5px;
    height: 30px;
    flex: 0 0 30px;

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
        left: 2.5px;
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

@media (pointer: fine) {
  .icon-container {
    .icon {
      &:hover {
        border-color: white;
        &:before {
          background-color: white;
        }
        .icon-tooltip {
          .icon-tooltip-hover();
        }
      }
    }
    .bandcamp, .boomplay, .facebook, .shazam, .spotify {
      &:hover {
        background-color: white;
        &:before {
          background-color: black;
        }
      }
    }
  }
}
</style>
