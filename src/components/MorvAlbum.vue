<template>
  <MorvOverlay @closeOverlay="$emit('closeOverlay')">
    <template v-slot:default>
      <div class="album-container">
        <div class="album-artwork-container">
          <img
            class="album-artwork"
            :src="getImgSrc(album.title)"
          />
          <MorvIcons
            :icons="albumOptions(album)"
            :selected="(!selectedOption || selectedOption === 'cover')
              ? albumOptions(album).includes('tracklist')
                ? 'tracklist'
                : 'credits'
              : selectedOption"
            @click="optionClick"
          />
        </div>

        <div class="album-info-container">
          <div class="album-title-container">
            <h3
              class="album-title"
              :class="album.type"
            >
              {{ album.title }}
            </h3>
            <h6 class="album-details">
              <span>{{ $date(album.date).format('DD MMMM YYYY') }}</span>
              <span v-if="album.label"> - {{ album.label }}</span>
              <span v-if="album.catNumber"> - {{ album.catNumber }}</span>
            </h6>
            <h6 v-if="album.from">
              from <span style="font-style:italic;">{{ album.from }}</span>
            </h6>
          </div>

          <div class="album-info">
            <transition
              name="fade-transition"
              mode="out-in"
            >
              <div
                v-if="(!selectedOption && albumOptions(album).includes('tracklist'))
                  || selectedOption === 'cover'
                  || selectedOption === 'tracklist'"
                class="album-tracklist-container"
              >
                <ol class="album-tracklist">
                  <li
                    v-for="track in album.tracklist"
                    :key="track"
                  >
                    {{ track }}
                  </li>
                </ol>
              </div>

              <div
                v-else-if="!selectedOption
                  || selectedOption === 'credits'"
                class="album-credits-container"
              >
                <ul
                  v-if="album.credits.band"
                  class="album-credits-band"
                >
                  <li
                    v-for="credit in album.credits.band"
                    :key="credit"
                  >
                    <span class="credits-name">{{ credit.split('-')[0] }}</span>
                    <span>- {{ credit.split('-')[1] }}</span>
                  </li>
                </ul>
                <ul
                  v-if="album.credits.other"
                  class="album-credits-other"
                >
                  <li
                    v-for="credit in album.credits.other"
                    :key="credit"
                  >
                    {{ credit }}
                  </li>
                </ul>
              </div>

              <MorvAlbumEmbed
                v-else
                :album="album"
                :selectedOption="selectedOption"
              />
            </transition>
          </div>
        </div>
      </div>

      <div class="album-container-mobile">
        <div class="album-title-container">
          <h3
            class="album-title"
            :class="album.type"
          >
            {{ album.title }}
          </h3>
          <h6 class="album-details">
            <span>{{ $date(album.date).format('DD MMMM YYYY') }}</span>
            <span v-if="album.label">
              <span class="album-label-divider"> - </span>
              {{ album.label }}
            </span>
            <span v-if="album.catNumber">
              <span class="album-cat-number-divider"> - </span>
              {{ album.catNumber }}
            </span>
          </h6>
          <h6 v-if="album.from">
            from <span style="font-style:italic;">{{ album.from }}</span>
          </h6>
        </div>

        <div class="album-info-container">
          <div class="album-info-viewport">
            <div class="album-info">
              <transition
                name="fade-transition"
                mode="out-in"
              >
                <div
                  v-if="!selectedOption || selectedOption === 'cover'"
                  class="album-artwork-container"
                >
                  <img
                    class="album-artwork"
                    :src="getImgSrc(album.title)"
                  />
                </div>

                <div
                  v-else-if="selectedOption === 'tracklist'"
                  class="album-tracklist-container"
                >
                  <ol class="album-tracklist">
                    <li
                      v-for="track in album.tracklist"
                      :key="track"
                    >
                      {{ track }}
                    </li>
                  </ol>
                </div>

                <div
                  v-else-if="selectedOption === 'credits'"
                  class="album-credits-container"
                >
                  <ul
                    v-if="album.credits.band"
                    class="album-credits-band"
                  >
                    <li
                      v-for="credit in album.credits.band"
                      :key="credit"
                    >
                      <span class="credits-name">{{ credit.split('-')[0] }}</span>
                      <span>- {{ credit.split('-')[1] }}</span>
                    </li>
                  </ul>
                  <ul
                    v-if="album.credits.other"
                    class="album-credits-other"
                  >
                    <li
                      v-for="credit in album.credits.other"
                      :key="credit"
                    >
                      {{ credit }}
                    </li>
                  </ul>
                </div>

                <MorvAlbumEmbed
                  v-else
                  :album="album"
                  :selectedOption="selectedOption"
                />
              </transition>
            </div>
          </div>
        </div>

        <div class="album-icons-container">
          <MorvIcons
            :icons="['cover'].concat(albumOptions(album))"
            :selected="selectedOption || 'cover'"
            size="small"
            @click="optionClick"
          />
        </div>
      </div>

    </template>
  </MorvOverlay>
</template>

<script>
import MediaMixin from '@/components/MediaMixin.js';

export default {
  name: 'MorvAlbum',

  mixins: [MediaMixin],

  props: {
    album: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedOption: null,
    };
  },

  computed: {
    albumOptions() {
      return (album) => {
        const defaultOpts = album.type === 'single'
          ? ['credits'] : ['tracklist', 'credits'];
        const options = ['bandcamp', 'spotify', 'applemusic', 'deezer', 'youtube'];
        return defaultOpts.concat(
          Object.keys(album).filter((key) => options.includes(key))
            .sort((a, b) => options.indexOf(a) - options.indexOf(b))
        );
      };
    },
  },

  methods: {
    optionClick(option) {
      if (typeof option !== 'string') {
        return;
      }
      this.selectedOption = option;
    },
  },
};
</script>

<style lang="less" scoped>
.album-container-mobile {
  display: none;
}

.album-container {
  display: flex;
  height: 100%;
}

.album-artwork-container {
  .album-artwork {
    object-fit: contain;
    height: calc(100% - 45px);
    border-radius: 10px;
    border: 1px solid grey;
  }
}

.album-title-container {
  margin-bottom: 1rem;
  .album-title {
    margin-right: 25px;
    &.single {
      font-style: normal;
    }
  }
  .album-details {
    font-size: 1.1rem;
  }
}

.album-info-container {
  position: relative;
  padding-left: 25px;
  border-left: 2px solid grey;
  margin-left: 25px;
  flex: 1 0 0%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .album-info {
    overflow-y: scroll;
    flex: 1 0 0%;
    width: 100%;
    font-size: 1.1rem;

    .album-tracklist-container {
      color: white;
      .album-tracklist {
        padding-left: 2rem;
        li {
          font-weight: bold;
          &::marker {
            font-weight: normal;
            color: var(--color-text);
          }
        }
      }
    }

    .album-credits-container {
      .album-credits-band {
        padding-left: 1rem;
        margin-bottom: 1rem;
        .credits-name {
          font-weight: bold;
          color: white;
        }
      }
      .album-credits-other {
        list-style: none;
        padding-left: 0px;
      }
    }
  }
}


@media (width <= 800px) {
  :deep(.overlay-container) {
    height: 100%;
  }

  .album-container {
    display: none;
  }

  .album-container-mobile {
    height: 100%;
    min-height: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 10px;

    .album-title-container {
      flex: 0;
      margin-bottom: .5rem;
      .album-title {
        font-size: 1.3rem;
        line-height: 1.2;
      }
      .album-details {
        font-size: 1rem;
      }
    }

    .album-info-container {
      margin: 0px;
      padding: 10px 0px;
      border: none;
      border-top: 1px solid grey;
      border-bottom: 1px solid grey;

      .album-info-viewport {
        height: 100%;
        border-radius: 10px;
        overflow: hidden;

        .album-info {
          height: 100%;
          width: 100%;
          font-size: 1rem;
          padding: 0px 5px;

          .album-artwork-container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .album-artwork {
              display: block;
              width: 100%;
              height: fit-content;
              border: 1px solid grey;
            }
          }

          .album-tracklist-container {
            overflow-y: scroll;
            color: white;
            .album-tracklist {
              padding-left: 2rem;
              li {
                font-weight: bold;
                &::marker {
                  font-weight: normal;
                  color: var(--color-text);
                }
              }
            }
          }

          .album-credits-container {
            overflow-y: scroll;
            .album-credits-band {
              padding-left: 1rem;
              margin-bottom: 1.5rem;
              .credits-name {
                font-weight: bold;
                color: white;
              }
            }
            .album-credits-other {
              list-style: none;
              padding-left: 0px;
            }
          }
        }
      }
    }

    .album-icons-container {
      flex: 0;
      padding-top: 5px;
    }
  }
}

@media (width <= 600px) {
  .album-container-mobile {
    .album-title-container {
      .album-details {
        font-size: 1rem;
        display: flex;
        flex-wrap: wrap;
        span:first-child {
          flex: 0 0 100%;
        }
        .album-label-divider {
          display: none;
        }
        .album-cat-number-divider {
          padding-left: 2px;
        }
      }
    }
    .album-info-container {
      .album-info-viewport {
        .album-info {
          .album-credits-container {
            .album-credits-band {
              margin-bottom: 1rem;
            }
          }
        }
      }
    }
  }
}

</style>
