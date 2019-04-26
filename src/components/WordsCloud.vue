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
      const links = document.querySelectorAll('.vue-tagcloud .view-content > div');

      const words = links && links.length && Array.from(links).map((link) => {
        const anchor = link.querySelector('a');
        const quantity = parseFloat(link.querySelector('.quantity').textContent);

        return [
          anchor.text,
          this.calcFontSize(quantity),
          anchor.href,
        ];
      });

      this.words = words;
    },
    calcFontSize(size) {
      const maxFontSize = 60;
      const minFontSize = 12;

      if (size <= minFontSize) {
        return minFontSize;
      }

      if (size >= maxFontSize) {
        return maxFontSize;
      }

      return size;
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
