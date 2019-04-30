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
          this.randomFontSize(quantity),
          anchor.href,
        ];
      });

      this.words = words;
    },
    randomFontSize() {
      const maxFontSize = 42;
      const minFontSize = 10;

      return Math.floor(Math.random() * (maxFontSize - minFontSize + 1) + minFontSize);
    },
    generateComponendId() {
      this.componentId = Math.floor(Math.random() * 10000);
    },
    clickHandler([,, link]) {
      window.location.href = link;
    },
    createInstance() {
      WordCloud(document.getElementById(this.containerId), {
        color: () => {
          const hue = 240;
          const saturation = Math.floor(Math.random() * 100);
          const lightness = Math.floor(Math.random() * 100);

          return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        },
        classes: 'words-cloud__word',
        clearCanvas: true,
        click: item => this.clickHandler(item),
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        list: this.words,
        rotateRatio: 0.5,
        rotationSteps: 2,
        shuffle: true,
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
