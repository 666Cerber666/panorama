<template>
  <div class="slider-wrapper">
    <div 
      class="slider-container" 
      ref="sliderContainer"
      @mouseenter="pauseAutoSlide" 
      @mouseleave="resumeAutoSlide"
    >
      <div class="slider" ref="slider">
        <div
          class="slide"
          v-for="(slide, index) in slides"
          :key="index"
          :class="{'active': currentIndex === index}"
        >
          <img class="slide-image" :src="slide" :alt="`Slide ${index}`" />
        </div>
      </div>
    </div>
    
    <div class="navigation">
      <button @click="prevSlide" class="nav-button prev">❮</button>
      <button @click="nextSlide" class="nav-button next">❯</button>
    </div>
    
    <div class="next-slides-container">
      <div class="next-slide-preview" 
           v-for="(slide, index) in nextThreeSlides"
           :key="slide"
           :class="{'preview-active': index === 0}">
        <img :src="slide" :alt="`Preview ${index}`" />
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';

export default {
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      autoSlideInterval: null,
      touchStartX: 0,
      touchEndX: 0,
    };
  },
  computed: {
    nextThreeSlides() {
      return this.slides.slice((this.currentIndex + 1) % this.slides.length, (this.currentIndex + 4) % this.slides.length);
    },
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateSlider();
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.updateSlider();
    },
    updateSlider() {
      const slider = this.$refs.slider;
      const slideWidth = slider.querySelector('.slide').offsetWidth;
      slider.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    },
    autoSlide() {
      this.autoSlideInterval = setInterval(this.nextSlide, 2000);
    },
    pauseAutoSlide() {
      clearInterval(this.autoSlideInterval);
    },
    resumeAutoSlide() {
      this.autoSlide();
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      if (Math.abs(this.touchEndX - this.touchStartX) > 30) {
        this.touchEndX < this.touchStartX ? this.nextSlide() : this.prevSlide();
      }
    },
  },
  mounted() {
    nextTick(() => {
      const sliderContainer = this.$refs.sliderContainer;
      sliderContainer.addEventListener('touchstart', this.handleTouchStart, { passive: true });
      sliderContainer.addEventListener('touchend', this.handleTouchEnd, { passive: true });
      this.autoSlide();
      window.addEventListener('resize', this.updateSlider);
    });
  },
  beforeDestroy() {
    clearInterval(this.autoSlideInterval);
    window.removeEventListener('resize', this.updateSlider);
    const sliderContainer = this.$refs.sliderContainer;
    sliderContainer.removeEventListener('touchstart', this.handleTouchStart);
    sliderContainer.removeEventListener('touchend', this.handleTouchEnd);
  }
};
</script>

<style scoped>
.slider-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* для позиционирования кнопок */
}

.slider-container {
  width: 100%;
  height:560px;
  overflow: hidden;
}

.slider {
  display: flex;
  transition: transform 0.5s ease; /* Увеличено время перехода для плавности */
}

.slide {
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-image {
  width: 100%; 
  height: auto; 
  transition: transform 0.3s ease;
}

.navigation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.nav-button {
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 2em;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background 0.3s;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 1);
}

.next-slides-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.next-slide-preview {
  width: 100px;
  height: 100px;
  opacity: 0.5;
  transition: transform 0.3s, opacity 0.3s;
}

.preview-active {
  transform: scale(1.1);
  opacity: 1;
}
</style>
