<template>
  <div id="content-overlay" class="fade-in" />
  <header>
    <div class="header-container">
      <div
        class="logo-container"
        @click="changeRoute()"
      />

      <div
        class="header-burger"
        :class="{ 'mobile-menu-hidden': mobileMenuHidden }"
        @click="burgerClick()"
      />

      <div
        class="navigation-container"
        :class="{ 'mobile-menu-hidden': mobileMenuHidden }"
      >
        <div
          v-for="route in routes"
          :key="route.name"
          class="navigation-item"
          :class="{ 'is-selected': isCurrentRoute(route) }"
          @click="changeRoute(route)"
        >
          {{ route.name }}
        </div>
        <div
          class="navigation-item"
          @click="changeRoute('merch')"
        >
          merch
        </div>
      </div>
    </div>
  </header>

  <main id="content">
    <div class="content-container">
      <RouterView v-slot="{ Component }">
        <transition
          :name="transitionType"
          mode="out-in"
        >
          <keep-alive>
            <component
              :is="Component"
              @routeChange="changeRoute"
            />
          </keep-alive>
        </transition>
      </RouterView>
    </div>
  </main>

  <footer>
    <div class="footer-container">
      <MorvIcons
        :icons="linkData[0]"
        size="small"
        :resize="false"
      />
      <div class="footer-copyright">
        <div>© 2024-2026 Morvern</div>
        <div>
          <span @click="setBg">photo: </span>
          <a href="https://www.instagram.com/to_ni_res" target="_blank" rel="external">Tilen Ritter</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      transitionType: 'fade-transition',
      mobileMenuHidden: true,
    };
  },

  computed: {
    routes() {
      const allRoutes = this.$router.getRoutes();
      return allRoutes.filter((i) => !i.meta.hidden);
    },

    isCurrentRoute() {
      return (route) => {
        let currentName = this.$router.currentRoute.value.name;
        if (currentName?.includes('item')) {
          currentName = currentName.split('item')[0];
        }
        return currentName === route.name;
      };
    },
  },

  mounted() {
    this.setBg();
    this.getUrlPath();

    const overlay = document.querySelector('#content-overlay');
    setTimeout(() => { overlay.classList.remove('fade-in'); }, 50);
    setTimeout(() => { overlay.style.display = 'none'; }, 1000);
  },

  methods: {
    getUrlPath() {
      const paths = window.location.pathname.split('/').filter(Boolean);
      const route = paths.find((i) => {
        return this.$router.getRoutes().find((x) => x.name === i);
      });

      this.changeRoute(route || null);
      history.replaceState({}, null, '/');
    },

    changeRoute(route = null) {
      this.mobileMenuHidden = true;

      if (route === 'merch') {
        window.open('https://morvern.bandcamp.com/merch', '_blank');
        return;
      }

      const contentContainer = document.querySelector('.content-container');

      if (!route) {
        route = this.$router.getRoutes().find((x) => x.name === 'home');
      }

      if (typeof route === 'string') {
        route = this.$router.getRoutes().find((x) => x.name === route);
      }

      let item = null;

      if (route.item) {
        item = route.item;
        route = this.$router.getRoutes().find((x) => x.name === route.name);
      }

      if (this.$router.currentRoute.value.name === route.name) {
        contentContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        return;
      }

      const routes = this.$router.options.routes;

      const currentRoute = routes.find((x) =>
        x.name === this.$router.currentRoute.value.name,
      );

      const newRoute = routes.find((x) =>
        x.name === route.name,
      );

      this.transitionType = 
        (routes.indexOf(currentRoute) < routes.indexOf(newRoute))
          ? 'slide-left-transition' : 'slide-right-transition';

      this.$router.push({ name: route.name, params: { item } });
      setTimeout(() => { contentContainer.scrollTo(0, 0); }, 100);
    },

    burgerClick() {
      this.mobileMenuHidden = !this.mobileMenuHidden;
    },

    setBg() {
      const content = document.querySelector('#content');
      content.className = '';
      content.classList.add(`bg${Math.floor((Math.random() * 9) + 1)}`);
    },
  },
};
</script>

<style lang="less" scoped>
#content-overlay {
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 5;
  opacity: 0;
  background: black;
  -webkit-transition: opacity 0.65s ease;
  transition: opacity 0.65s ease;
  &.fade-in {
    opacity: 1;
  }
}


header {
  width: 100%;
  background: var(--color-background);
  border-bottom: 2px solid grey;
  font-weight: bold;
  line-height: 1.5;
  color: white;
  .header-container {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 30px;
    max-width: 1440px;
    margin: auto;

    .logo-container {
      cursor: pointer;
      height: 50px;
      flex: 0 0 185px;
      margin: 5px 10px;
      border-radius: 10px;
      font-size: 2rem;
      font-style: italic;
      font-weight: 900;
      background-image: url('@/assets/logo.svg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-origin: content-box;
      padding: 10px;
      .shine-effect();
    }

    .header-burger {
      display: none;
    }

    .navigation-container {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      padding-left: 20px;

      .navigation-item {
        cursor: pointer;
        margin: auto;
        height: 45px;
        min-width: 4.5rem;
        padding: 10px 15px;
        border-left: 1.5px solid grey;
        text-align: center;
        font-size: 1.3rem;
        color: var(--color-text);
        transition: color 0.5s;
        &:last-child {
          border-right: 1.5px solid grey;
        }
        &:hover {
          font-weight: bold;
          color: white;
        }
        &.is-selected {
          font-weight: bold;
          color: white;
        }
        .shine-effect(@duration: 0.75s);
      }
    }
  }
}


#content {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;

  .content-container {
    overflow: scroll;
    width: 100%;
    height: 100%;
    padding: 50px;
  }

  &.bg1 {
    background-image: url('@/assets/bg/nbg1.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 60%), fade(black, 70%), fade(black, 60%));
    }
  }
  &.bg2 {
    background-image: url('@/assets/bg/nbg2.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 10%), fade(black, 90%));
    }
  }
  &.bg3 {
    background-image: url('@/assets/bg/nbg3.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 20%), fade(black, 60%));
    }
  }
  &.bg4 {
    background-image: url('@/assets/bg/nbg4.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 20%), fade(black, 60%));
    }
  }
  &.bg5 {
    background-image: url('@/assets/bg/nbg5.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 20%), fade(black, 40%), fade(black, 30%));
    }
  }
  &.bg6 {
    background-image: url('@/assets/bg/nbg6.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 10%), fade(black, 40%), fade(black, 30%));
    }
  }
  &.bg7 {
    background-image: url('@/assets/bg/nbg7.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 0%), fade(black, 50%));
    }
  }
  &.bg8 {
    background-image: url('@/assets/bg/nbg8.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 30%), fade(black, 60%), fade(black, 0%));
    }
  }
  &.bg9 {
    background-image: url('@/assets/bg/nbg9.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 0%), fade(black, 40%), fade(black, 20%));
    }
  }
  &.bg10 {
    background-image: url('@/assets/bg/nbg10.jpg');
    .content-container {
      background: linear-gradient(to right, fade(black, 20%), fade(black, 50%), fade(black, 30%));
    }
  }
}


footer {
  background: var(--color-background);
  border-top: 2px solid grey;
  .footer-container {
    display: flex;
    justify-content: space-between;
    padding: 15px 40px;
    max-width: 1440px;
    margin: auto;
    :deep(.icon-container) {
      .icon {
        margin-top: 0;
        margin-bottom: 5px;
      }
    }
    .footer-copyright {
      padding-bottom: 5px;
      text-align: right;
      line-height: 1.1;
      margin: auto 0px;
      white-space: nowrap;
      a {
        color: var(--color-text);
      }
    }
  }
}


@media (width <= 800px) {
  header {
    .header-container {
      position: relative;
      padding: 5px 10px;
      background: black;

      .header-burger {
        display: initial;
        position: absolute;
        top: 20px;
        right: 25px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        border: 2px solid grey;

        &:before {
          display: block;
          content: '';
          position: relative;
          height: calc(100% - 10px);
          width: calc(100% - 10px);
          top: 5px;
          left: 5px;
          background-color: grey;

          -webkit-mask-position: center;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: contain;
          -webkit-mask-image: url('@/assets/icons/burgermenu.svg');

          mask-position: center;
          mask-repeat: no-repeat;
          mask-size: contain;
          mask-image: url('@/assets/icons/burgermenu.svg');
        }
        &:not(.mobile-menu-hidden) {
          border: 2px solid white;
          &:before {
            background-color: white;
          }
        }
      }

      .navigation-container {
        position: absolute;
        z-index: 1;
        top: 70px;
        left: 0;
        right: 0;
        padding: 5px;
        background: black;
        border-bottom: 2px solid grey;
        max-height: 105px;
        overflow: hidden;
        transition-property: max-height, padding;
        transition-duration: 0.2s;
        transition-timing-function: ease-out;

        .navigation-item {
          flex: 0 0 calc(100% / 6);
          font-size: 1.5rem;
          &:first-child {
            border-left: none;
          }
          &:last-child {
            border-right: none;
          }
        }
        &.mobile-menu-hidden {
          max-height: 0px;
          padding: 0px 5px;
        }
      }
    }
  }

  #content {
    background-position: top center;
    .content-container {
      padding: 0;
      main {
        overflow: scroll;
        padding: 25px;
      }
    }

    &.bg1 {
      background-image: url('@/assets/bg/nbgm1.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 0%), fade(black, 60%), fade(black, 0%));
      }
    }
    &.bg2 {
      background-image: url('@/assets/bg/nbgm2.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 0%), fade(black, 60%), fade(black, 20%));
      }
    }
    &.bg3 {
      background-image: url('@/assets/bg/nbgm3.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 0%), fade(black, 50%), fade(black, 0%));
      }
    }
    &.bg4 {
      background-image: url('@/assets/bg/nbgm4.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 0%), fade(black, 50%), fade(black, 0%));
      }
    }
    &.bg5 {
      background-image: url('@/assets/bg/nbgm5.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 0%), fade(black, 50%), fade(black, 0%));
      }
    }
    &.bg6 {
      background-image: url('@/assets/bg/nbgm6.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 40%), fade(black, 50%), fade(black, 0%));
      }
    }
    &.bg7 {
      background-image: url('@/assets/bg/nbgm7.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 0%), fade(black, 40%), fade(black, 0%));
      }
    }
    &.bg8 {
      background-image: url('@/assets/bg/nbgm8.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 30%), fade(black, 60%), fade(black, 0%));
      }
    }
    &.bg9 {
      background-image: url('@/assets/bg/nbgm9.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 0%), fade(black, 40%), fade(black, 20%));
      }
    }
    &.bg10 {
      background-image: url('@/assets/bg/nbgm10.jpg');
      .content-container {
        background: linear-gradient(to right, fade(black, 20%), fade(black, 50%), fade(black, 30%));
      }
    }
  }

  footer {
    .footer-container {
      padding: 10px 20px;
    }
  }
}


@media (width <= 500px) {
  header {
    .header-container {
      .navigation-container {
        .navigation-item {
          flex: 0 0 33%;
          border: none;
          &:last-child {
            border: none;
          }
        }
      }
    }
  }

  footer {
    .footer-container {
      padding: 10px;
      flex-wrap: wrap;
      div {
        flex: 0 0 100%;
        justify-content: center;
        text-align: center;
      }
      .footer-copyright {
        padding: 0px 0px 10px 0px;
      }
    }
  }
}
</style>
