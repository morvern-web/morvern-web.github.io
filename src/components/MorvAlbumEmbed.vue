<template>
  <div class="album-embed-container">
    <div class="album-embed">
      <transition
        name="fade-transition"
        mode="out-in"
      >
        <iframe
          v-if="selectedOption === 'bandcamp'"
          :src="`https://bandcamp.com/EmbeddedPlayer/${album.bandcamp}/size=large/bgcol=333/linkcol=fff/tracklist=true/artwork=small/transparent=true/`"
          width="100%" height="100%" frameborder="0"
          loading="lazy"
          title="Bandcamp"
        />

        <iframe
          v-else-if="selectedOption === 'amazonmusic'"
          :src="`https://music.amazon.com/embed/${album.amazonmusic}/`"
          width="100%" height="100%" frameborder="0"
          style="border-radius:20px;max-width:"
          loading="lazy"
          title="Amazon Music"
        />

        <iframe
          v-else-if="selectedOption === 'applemusic'"
          :src="`https://embed.music.apple.com/us/${album.applemusic}`"
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          width="100%" height="100%" frameborder="0"
          style="overflow:hidden;border-radius:10px;"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          loading="lazy"
          title="Apple Music"
        />

        <iframe
          v-else-if="selectedOption === 'deezer'"
          :src="`https://widget.deezer.com/widget/dark/${album.deezer}`"
          width="100%" height="100%" frameborder="0"
          allowtransparency="true"
          allow="encrypted-media; clipboard-write"
          loading="lazy"
          title="Deezer"
        />

        <iframe
          v-else-if="selectedOption === 'spotify'"
          class="spotify-iframe"
          :src="`https://open.spotify.com/embed/${album.spotify}?utm_source=generator&theme=0`"
          width="100%" height="100%" frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify"
        />

        <iframe
          v-else-if="selectedOption === 'tidal'"
          :src="`https://embed.tidal.com/${album.tidal}`"
          width="100%" height="100%" frameBorder="0"
          allow="encrypted-media; fullscreen; clipboard-write https://embed.tidal.com; web-share"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          style="color-scheme: light dark"
          loading="lazy"
          title="Tidal"
        />

        <iframe
          v-else-if="selectedOption === 'youtubemusic'"
          :src="`https://www.youtube-nocookie.com/embed/${album.youtubemusic}`"
          width="100%" height="100%" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          loading="lazy"
          title="YouTube Music"
        />

      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MorvAlbumEmbed',

  props: {
    album: {
      type: Object,
      required: true,
    },
    selectedOption: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="less" scoped>
.album-embed-container {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background-color: grey;

  .album-embed {
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;

    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
