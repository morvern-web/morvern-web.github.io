<template>
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
    <div class="content-container fade-in">
      <RouterView v-slot="{ Component }">
        <transition
          :name="transitionType"
          mode="out-in"
        >
          <component
            :is="Component"
            @routeChange="changeRoute"
          />
        </transition>
      </RouterView>
    </div>
  </main>

  <footer>
    <div class="footer-container">
      <MorvIcons
        :icons="linkData[0]"
        size="small"
      />
      <div class="footer-copyright">
        <div>© 2024 morvern</div>
        <div class="desktop">photo: <a href="https://www.instagram.com/benjaminkreze.photography" target="_blank" rel="external">Benjamin Kreze</a></div>
        <div class="mobile">photo: <a href="https://www.instagram.com/izakkermc/" target="_blank" rel="external">Izak Kermc</a></div>
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
    const content = document.querySelector('.content-container');
    setTimeout(() => {
      content.classList.remove('fade-in');
    }, 100);
  },

  methods: {
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
  },
};
</script>

<style lang="less" scoped>
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
        padding: 10px 5px;
        border-left: 1.5px solid grey;
        text-align: center;
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
  background-image: url('@/assets/bg.jpg');
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;

  .content-container {
    overflow: scroll;
    width: 100%;
    height: 100%;
    padding: 50px;
    background: linear-gradient(to right, fade(black, 70%) 5%, fade(black, 60%) 50%, fade(black, 85%));
    -webkit-transition: background 1s ease;
    transition: background 1s ease;
    &.fade-in {
      background: black;
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
      .desktop {
        display: block;
      }
      .mobile {
        display: none;
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
          font-size: 1.1rem;
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
    background-image: url('@/assets/bgm.jpg');
    background-position: top;
    .content-container {
      background: radial-gradient(fade(black, 50%), fade(black, 75%));
      padding: 0;
      main {
        overflow: scroll;
        padding: 25px;
      }
    }
  }

  footer {
    .footer-container {
      padding: 15px 25px;
      .footer-copyright {
        .desktop {
          display: none;
        }
        .mobile {
          display: block;
        }
      }
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
      padding: 5px;
      padding-top: 10px;
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
