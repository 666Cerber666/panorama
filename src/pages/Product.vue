<template>
  <Header class="block" />
  <Finder />
  <div class="flex flex-col md:flex-row w-full mb-4 gap-4 h-full">
    <div class="flex p-24 md:flex" :class="{ 'hidden': isMobile }">
      <Accordion class="mt-20" />
    </div>
    <div class="flex flex-col md:flex-row p-12">
      <div class="w-full h-96">
        <Slider v-if="product.images.length" :slides="product.images" />
      </div>
      <div class="flex items-center mt-10 md:mt-0 flex-col w-full h-full product-card">
        <div class="pl-0 mt-10 md:mt-0 md:pl-20">
          <h3 class="text-2xl">{{ product.name }}</h3>
        </div>
        <div class="px-20 text-left mt-10">
          <span class="desc text">
            {{ product.description }}
          </span>
          <p class="mt-4"><b>Артикул:</b> {{ product.article }}</p>
          <p><b>Цена:</b> {{ product.price }} Р</p>
        </div>
        <div class="rounded-full border-2 border-red-500 w-3/4 h-1/4 flex justify-center items-center px-8 mt-4 text-balance text-center mb-10">
          Для приобретения связаться по номеру: +7 (3412) 90-42-44
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, watchEffect  } from 'vue';
import { useRoute } from 'vue-router';
import Accordion from '../components/Accordion.vue';
import Slider from '../components/Slider.vue';
import Header from '../components/Header.vue';
import Finder from '../components/Finder.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

const route = useRoute();
const productId = route.query.product_id; 

const isMobile = window.innerWidth < 768;
const product = ref({ images: [] });

async function fetchProductData() {
  try {
    const response = await axios.get(`https://api.panorama18.mdalabs.ru/api/products?product_id=${productId}`);
    const data = response.data; // Получаем данные о продукте
    product.value = {
      name: data.name,
      description: data.description, // Предполагая, что эти поля есть в ответе API
      article: data.article, // Артикул
      price: data.price, // Цена
      images: data.images,
    };
    console.log(product.value);
  } catch (error) {
    console.error('Ошибка при запросе:', error);
  }
}

// Вызовите эту функцию внутри onMounted
onMounted(() => {
  fetchProductData();
});

</script>

<style scoped>
.banner_contacts {
  width: 100%;
  height: 560px;
  background-image: url('../assets/banner_contacts.svg');
  background-position: cover;
  background-size: 100%;
  background-repeat: no-repeat;
}

.desc{
  font-weight: 300;
  text-decoration: none;
  font-size: 14px;
}

@media (max-width: 768px) {
  .hidden {
    display: none;
  }
  .product-card {
    border: 1px solid red;
    border-radius: 15px;
  }
}
</style>
