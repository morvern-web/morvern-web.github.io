<template>
  <main class="about-container">
    <h4
      class="about-intro"
      v-html="about?.intro"
    />

    <div class="about-divider"/>

    <div class="about-body-container">
      <p
        v-for="bodyText in about?.body"
        :key="bodyText"
        class="about-body"
        v-html="bodyText"
      />
    </div>

    <div class="about-divider"/>

    <h4 class="contact-header">
      Contact
    </h4>
    <div
      v-for="contactText in about?.contact"
      :key="contactText.title"
      class="contact-container"
    >
      <span v-if="contactText.title">{{ contactText.title }}</span>
      <span v-if="contactText.name">{{ contactText.name }}</span>
      <span v-if="contactText.company">{{ contactText.company }}</span>
      <span v-if="contactText.email">{{ contactText.email }}</span>
      <span v-if="contactText.phone">{{ contactText.phone }}</span>
    </div>

    <div class="about-divider"/>

    <h4 class="press-header">
      Selected press
    </h4>
    <div
      v-for="pressText in about?.press"
      :key="pressText.text"
      class="press-container"
    >
      <q
        v-html="pressText.text"
        class="press-body"
      />
      <div class="press-credit">
        <span class="press-author">{{ pressText.author }}, </span>
        <span
          class="press-publication"
          v-html="pressText.publication"
        />
      </div>
    </div>

    <div class="about-divider"/>

    <h5 class="epk-link">
      <a :href="about?.epk" target="_blank" rel="nofollow">Download our EPK</a>
    </h5>
  </main>
</template>

<script>
export default {
  name: 'AboutView',

  computed: {
    about() {
      return this.aboutData && this.aboutData[0];
    },
  },

  methods: {
    handleClick(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style lang="less" scoped>
.about-container {
  color: white;
  font-size: 1.1rem;

  .about-divider {
    width: 100%;
    border: 1px solid grey;
    margin: 30px 0;
  }

  .about-intro {
    text-align: center;
  }

  .about-body-container {
    .about-body {
      &:not(:last-child) {
        padding-bottom: 30px;
      }
    }
  }

  .contact-container {
    display: flex;
    flex-wrap: wrap;
    span {
      &:not(:first-child) {
        &:before {
          content: " • ";
          display: inline-block;
          width: 25px;
          text-align: center;
          font-weight: bold;
        }
      }
    }
  }

  .press-container {
    padding-bottom: 40px;
    .press-credit {
      float: right;
      text-align: right;
      font-weight: bold;
      &:before {
        content: " - ";
        text-decoration: none;
      }
    }
  }

  .epk-link {
    text-align: center;
  }
}

.about-body-container,
.contact-container,
.press-container {
  background-color: fade(black, 50%);
  padding: 15px;
  border-radius: 10px;
}

@media (width <= 500px) {
  .about-container {
    .contact-container {
      span {
        width: 100%;
      }
    }
  }
}
</style>
