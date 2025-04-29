<template>
  <div class="flex h-44 items-end wave-background">
    <div class="flex justify-center items-center w-1/2 h-3/4 relative z-10 hidden md:flex">
      <router-link class="w-full" to="/contacts">
        <input type="submit" class="p-4 rounded-2xl but w-1/4" value="О нас">
      </router-link>
    </div>
    <div class="flex justify-center items-center w-1/2 h-full z-10 relative pt-14 search-container">
      <div class="relative w-1/4 search">
        <span class="icon-search"></span>
        <input
        type="text"
        class="input-with-icon"
        placeholder="Поиск товара..."
        v-model="searchQuery"
        @input="onSearch"
      />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits();

const searchQuery = ref('');

function onSearch() {
  // Генерируем событие с текущим значением searchQuery
  emit('search', searchQuery.value);
}
</script>
  
  <style scoped>
  /* Стиль для контейнера с фоном */
  .wave-background {
    position: relative;
    z-index: 1;
    background-image: url('../assets/finder/back.svg');
    background-size: 100%;
    background-repeat: no-repeat;
  }
  
  .but {
    background: red;
    color: white;
  }
  
  /* Стиль для input с иконкой */
  .input-with-icon {
    width: 100%;
    padding: 10px 16px;
    padding-left: 40px; /* Отступ для иконки */
    border-radius: 50px;
    border: none;
    background-color: white;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .icon-search {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url('../assets/search-ico.svg'); /* Добавляем изображение иконки */
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  /* Дополнительные стили для фокусировки и плавных эффектов */
  .input-with-icon:focus {
    outline: none;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    .wave-background {
      background-image: none;
    }
    .hidden {
      display: none;
    }
    .search{
      width:100%;
      border:1px solid red;
      border-radius:25px;
    }
    .search-container{
      width:100%;
      padding:0px 60px;
    }
  }
  </style>
  