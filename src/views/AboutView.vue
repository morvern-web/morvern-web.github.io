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
      class="press-container"
    >
      <q
        v-html="pressText.text"
        class="press-body"
      />
      <div
        class="press-credit"
        @click="handleClick(pressText.link)"
      >
        <span class="press-author">{{ pressText.author }}, </span>
        <span class="press-publication">{{ pressText.publication }}</span>
      </div>
    </div>
  </main>
</template>

<script>
import JsonData from '@/components/JsonData.vue';

export default {
  mixins: [JsonData],

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
    margin: 50px 0;
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

  .contact-header,
  .press-header {
    padding-bottom: 20px;
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
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
      text-underline-offset: 0.15rem;
      &:before {
        content: " - ";
        text-decoration: none;
      }
    }
  }
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
