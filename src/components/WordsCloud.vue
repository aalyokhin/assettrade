<template>
  <div class="words-cloud">
    <div :id="containerId" class="words-cloud__container" />
  </div>
</template>

<script>
import WordCloud from 'wordcloud';

export default {
  name: 'cloud',
  data() {
    return {
      componentId: '',
    };
  },
  created() {
    this.generateComponendId();
    this.grabWords();
  },
  computed: {
    canvasId() {
      return `canvas-${this.componentId}`;
    },
    containerId() {
      return `canvas-container-${this.componentId}`;
    },
  },
  mounted() {
    this.createObserver();
    this.createInstance();

    window.addEventListener('resize', () => this.createInstance());
  },
  methods: {
    grabWords() {
      const minSize = 8;
      const maxSize = 30;
      const linksContainer = document.querySelector('.tagadelic.wrapper');
      const links = linksContainer.querySelectorAll('a');
      const words = links.length && Array.from(links).map(link => [
        link.text,
        Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
        link.href,
      ]);

      this.words = words;
    },
    generateComponendId() {
      this.componentId = Math.floor(Math.random() * 10000);
    },
    clickHandler([,, link]) {
      window.location.href = link;
    },
    createInstance() {
      WordCloud(document.getElementById(this.containerId), {
        classes: 'words-cloud__word',
        clearCanvas: true,
        click: item => this.clickHandler(item),
        fontFamily: 'Arial, sans-serif',
        list: this.words,
        rotateRatio: 0.5,
        rotationSteps: 2,
        wait: 25,
      });
    },
    createObserver() {
      const observer = new MutationObserver(([mutation]) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          setTimeout(() => {
            mutation.addedNodes[0].classList.add('visible');
          }, 50);
        }
      });

      observer.observe(this.$el, { childList: true, subtree: true });
    },
  },
};
</script>

<style lang="scss">
.words-cloud {
  overflow: hidden;

  &__container {
    height: 600px;
  }

  &__word {
    cursor: pointer;
    transition: opacity .75s;
    opacity: 0;

    &.visible {
      opacity: 1;
    }
  }
}
</style>
