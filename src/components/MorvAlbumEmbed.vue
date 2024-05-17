<template>
  <div class="album-embed-container">
    <div class="album-embed">
      <transition
        name="fade-transition"
        mode="out-in"
      >
        <iframe
          v-if="selectedOption === 'bandcamp'"
          class="bandcamp-iframe"
          :src="`https://bandcamp.com/EmbeddedPlayer/album=${album.bandcamp}/size=large/bgcol=333/linkcol=fff/tracklist=true/artwork=small/transparent=true/`"
          seamless
        ></iframe>

        <iframe
          v-else-if="selectedOption === 'spotify'"
          class="spotify-iframe"
          :src="`https://open.spotify.com/embed/album/${album.spotify}?utm_source=generator&theme=0`"
          width="100%" height="100%" frameBorder="0" allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        <iframe
          v-else-if="selectedOption === 'applemusic'"
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="100%" style="width:100%;overflow:hidden;border-radius:10px;"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          :src="`https://embed.music.apple.com/us/album/${album.applemusic}`"
        ></iframe>

        <iframe
          v-else-if="selectedOption === 'deezer'"
          title="deezer-widget"
          :src="`https://widget.deezer.com/widget/dark/album/${album.deezer}`"
          width="100%" height="100%" frameborder="0" allowtransparency="true"
          allow="encrypted-media; clipboard-write"
        ></iframe>

        <iframe
          v-else-if="selectedOption === 'youtube'"
          width="100%" height="100%"
          :src="`https://www.youtube-nocookie.com/embed/${album.youtube}?si=JXRtZWqOtyG4lDIQ&amp`"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

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
  border-radius: 20px;
  background-color: grey;

  .album-embed {
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 20px;
    overflow: hidden;

    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
