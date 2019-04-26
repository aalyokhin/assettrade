<template>
  <div class="word-cloud" />
</template>

<script>
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';

const fill = d3.scaleOrdinal(d3.schemeCategory10);

export default {
  name: 'WordCloud',
  data() {
    return {
      height: 600,
      width: 600,
    };
  },
  props: {
    font: {
      type: [String, Function],
      default: 'Arial, sans-serif',
    },
    spiral: {
      type: String,
      default: 'rectangular',
    },
  },

  created() {
    this.getWords();
  },
  mounted() {
    this.createCanvas();
    window.addEventListener('resize', () => this.createCanvas());
  },

  methods: {
    measureParentWidth() {
      return this.$el.parentElement.clientWidth;
    },
    getWords() {
      const minSize = 8;
      const maxSize = 30;
      const linksContainer = document.querySelector('.tagadelic.wrapper');
      const links = linksContainer.querySelectorAll('a');
      const words = links.length && Array.from(links).map((link, index) => ({
        text: link.text,
        size: Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
        rotate: index % 2 === 0 ? 0 : 90,
        link: link.href,
      }));

      linksContainer.style.display = 'none';

      this.words = words;
    },

    createCanvas() {
      d3.select(this.$el).selectAll('*').remove();

      cloud()
        .size([this.measureParentWidth(), this.height])
        .words(this.words)
        .spiral(this.spiral)
        .rotate(d => d.rotate)
        .font(this.font)
        .fontSize(d => d.size)
        .on('end', this.end)
        .start();
    },

    end(words) {
      const width = this.measureParentWidth();

      const cloudInstance = d3.select(this.$el)
        .append('svg')
        .attr('width', width)
        .attr('height', this.height)
        .append('g')
        .attr('transform', `translate(${width / 2},${this.height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('fill', (d, i) => fill(i))
        .attr('text-anchor', 'middle')
        .text(d => d.text);

      cloudInstance.on('click', d => this.onWordClick(d));

      cloudInstance.transition()
        .duration(500)
        .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`);
    },

    onWordClick({ link }) {
      window.location.href = link;
    },
  },
};
</script>
