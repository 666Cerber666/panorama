<template>
  <Header @child-selected="filterProducts" class="block"/>
  <Finder @search="updateSearchQuery" />
  <div class="flex flex-col w-full mb-4 gap-4">
    <div class="p-6 md:p-24 w-full">
      <div class="flex banner w-full flex-row">
        <div class="banner_left w-full md:w-1/3 md:h-full bg-gray-200"></div>
        <div class="banner_text w-2/3 h-full md:h-auto flex">
          <div class="banner_text_back w-full h-full p-6 md:p-10">
            Выбор<br> профессионалов - <br>оргстекло от <br>PFP Панорама
          </div>
        </div>
      </div>
    </div>
    <div class="flex p-24">
      <div class="hidden md:block">
        <Accordion @child-selected="filterProducts" />
      </div>
      <div class="flex items-center md:items-start flex-col w-full">
        <div class="catalog-head"><h3 class="text-2xl">
            {{ selectedCategory ? selectedCategory : 'Популярные продукты' }}
          </h3></div>
        <div class="catalog">
          <div class="catalog-item" v-for="(item, index) in filteredProducts" :key="index">
            <router-link :to="{ name: 'Product', query: { product_id: item.id } }">
              <img :src="item.image" alt="product" class="product-image">
              <p class="product-name">{{ item.name }}</p>
              <p class="product-price">{{ item.price }} ₽</p>
            </router-link>
          </div>
        </div> 
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import Accordion from '../components/Accordion.vue';
import Footer from '../components/Footer.vue';
import Finder from '../components/Finder.vue';
import { ref, computed, onMounted  } from 'vue';
import axios from 'axios'; 

const route = useRoute();

const selectedCategory = ref(null);
const selectedCategoryID = ref(null);
const products = ref([]);
const searchQuery = ref('');

function updateSearchQuery(query) {
  searchQuery.value = query; // Update the search query
}

// Вычисляемое свойство для фильтрации продуктов
const filteredProducts = computed(() => {
  let filtered = products.value;
  if (searchQuery.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategoryID.value);
  }
  return filtered;
});

// Метод для фильтрации продуктов по выбранной категории
function filterProducts(childId, childName) {
  selectedCategoryID.value = childId;
  selectedCategory.value = childName; // Устанавливаем выбранную подкатегорию

  console.log(childName);

  fetchData(selectedCategoryID.value.id);
}

// Функция для загрузки данных о продуктах
async function fetchData(categoryId = null) {
  try {
    // Формируем URL с параметром category_id, если он передан
    let url = 'https://api.panorama18.mdalabs.ru/api/products';
    if (categoryId) {
      url += `?category_id=${categoryId}`;
    }

    const response = await axios.get(url);
    products.value = response.data.map(product => ({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      category: product.category,
    }));
    console.log('Полученные продукты:', products.value);
  } catch (error) {
    console.error('Ошибка при запросе:', error);
  }
}

onMounted(() => {
  // Проверка наличия категории в параметрах маршрута
  const categoryId = route.query.category;
  const categoryName = route.query.categoryName;
  
  if (categoryId && categoryName) {
    selectedCategoryID.value = categoryId;
    selectedCategory.value = categoryName;
  } else {
    // Если категория не выбрана, отображаем популярные продукты
    selectedCategoryID.value = null;
    selectedCategory.value = null;
  }
  
  fetchData(); // Загрузка продуктов
});

</script>

<style scoped>
.banner{
    overflow: hidden;
    height: 567px;
}
.banner_left{
background-image:url(../assets/home_banner/left_banner.svg);
background-size: cover;
background-position: center;
background-repeat: no-repeat;
}
.banner_text{
background-image:url(../assets/home_banner/banner.svg);
background-repeat: no-repeat;
background-size:100%;
background-size: cover;
font-family: Dela Gothic One; 
font-size: 55px;
font-weight: 400;
line-height: 79.64px;
text-align: left;
color:white;
}
.banner_text_back{
background-color: rgba(0, 0, 0, 0.4);
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
border-radius: 8px;
}

h3 {
  margin: 0;
  padding: 10px;
  background-color: white;
  text-align: center;
  color: black;
}

.catalog {
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 1fr)); /* Адаптивные колонки */
  grid-gap: 20px;
  padding: 20px;
  border-radius: 0px 50% 0px 50%;
}

.catalog-item {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Плавный переход для трансформации и тени */
}

.catalog-item:hover {
  transform: translateY(-10px); /* Поднятие карточки */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Увеличение тени при наведении */
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.product-price {
  font-size: 18px;
  color: #333;
  margin-top: 5px;
}

.catalog-head{
  padding-left:20px;
}

@media (max-width:1440px){
  .catalog {
      grid-template-columns: repeat(2, minmax(250px, 1fr));
    }
}

@media (max-width: 768px) {
    .catalog-head{
      padding-left:0px;
    }
    .banner {
      height: 300px;
      display:flex;
    }
    .banner_left {
      width:240px;
      height:100%;
      background-size: cover;
      background-position: center;
    }
    .banner_text {
      font-size: 24px;
      line-height: 36px;
    }
    .catalog {
      grid-template-columns: repeat(1, minmax(350px, 1fr));
    }
    .catalog-item {
      margin-bottom: 20px;
    }
  }
</style>

  
