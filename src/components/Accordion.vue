<template>
  <div class="accordion">
    <h3>Каталог продукции</h3>

    <div v-for="(category, index) in categories" :key="category.id" class="category">
      <div @click="toggleCategory(index)" class="category-header">
        {{ category.name }}
        <span class="arrow" v-if="category.children && category.children.length > 0" :class="{ rotated: activeIndex === index }">▾</span>
      </div>

      <transition name="fade">
        <div v-if="activeIndex === index" class="category-content">
          <ul>
            <li v-for="(subcategory, i) in category.children" :key="subcategory.id">
              <div @click="toggleSubcategory(i)" class="subcategory-header">
                <div @click="selectChild(subcategory.id, subcategory.name)">{{ subcategory.name }}<span class="arrow" v-if="subcategory.children && subcategory.children.length > 0" :class="{ rotated: activeSubcategoryIndex === i }">▾</span></div>
              </div>
              <transition name="fade">
                <ul v-if="activeSubcategoryIndex === i && subcategory.children">
                  <li v-for="(child, j) in subcategory.children" :key="child.id">
                    <div @click="selectChild(child.id, child.name)" class="child-header">
                      {{ child.name }}
                    </div>
                    <ul v-if="child.children">
                      <li v-for="(grandchild, k) in child.children" :key="grandchild.id">
                        <span @click="selectChild(grandchild.id, grandchild.name)">{{ grandchild.name }}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const emit = defineEmits();

const activeIndex = ref(null);
const activeSubcategoryIndex = ref(null);

const categories = ref([]);

function toggleCategory(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
  activeSubcategoryIndex.value = null; // Сбросить подкатегорию при переключении категории
}

function toggleSubcategory(index) {
  activeSubcategoryIndex.value = activeSubcategoryIndex.value === index ? null : index;
}

// Метод для передачи только имени кликнутого элемента
function selectChild(id, name) {
  emit('child-selected', id, name);
}

// Пример получения данных с сервера
async function fetchData() {
  try {
    const response = await axios.get('https://api.panorama18.mdalabs.ru/api/categories');
    categories.value = response.data; // Прямо присваиваем ответ от сервера
  } catch (error) {
    console.error('Ошибка при запросе:', error); // Обработка ошибок
  }
}

fetchData();
</script>

<style scoped>
/* Ваши стили */
.accordion {
  width: 250px;
  height: 400px;
  border-radius: 16px;
  font-family: Arial, sans-serif;
  border: 1px solid red;
  background-color: white;
}
.subcategory-header {
  padding: 10px 0px;
  font-weight: bold;
}
.category-header {
  padding: 10px;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.arrow {
  transition: transform 0.3s ease; /* Плавный переход для вращения */
}
.arrow.rotated {
  transform: rotate(-180deg); /* Поворачиваем стрелочку */
}
.category-content {
  padding: 10px 10px 0px 10px;
  background-color: white;
  overflow: hidden;
}
.category-content li {
  margin-bottom: 3px;
  text-align: left;
}
.expand-enter-active, .expand-leave-active {
  transition: max-height 0.5s ease;
}
.expand-enter, .expand-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>