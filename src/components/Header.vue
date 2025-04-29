<template>
  <header class="bg-white-800 flex items-center justify-center">
    <div class="relative flex h-16 items-center justify-between w-full px-10 gap-10">
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <router-link to="/">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-auto w-auto" src="./../assets/logo.svg" alt="Your Company" />
          </div>
        </router-link>
      </div>
      <div class="hidden sm:block">
        <a style="color:black;" class="text my-hover uk-panel uk-flex-stretch uk-link-toggle" href="tel:+73412904244">+7 (3412) 90-42-44</a>
      </div>
      <div class="hidden sm:block">
        <div class="text"><span>pfp_panorama</span></div>
      </div>
      <button @click="toggleMenu" class="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span class="sr-only">Open main menu</span>
        <Bars3Icon v-if="!isOpen" class="h-5 w-5" aria-hidden="true" />
        <XMarkIcon v-else class="h-5 w-5" aria-hidden="true" />
      </button>
      <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div ref="modal" class="relative flex flex-col items-center bg-white rounded-lg p-4">
            <button @click="toggleMenu" class="absolute top-0 right-2 mt-3 mb-20 mr-3">
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            <Accordion @child-selected="filterProducts" class="max-w-md mx-auto mt-10" />
            <div style="background-color:red;" class="w-screen mt-10 text-white">
              <router-link class="w-full" to="/contacts">
                <input type="submit" class="p-4 rounded-2xl but w-1/4 text-2xl" value="О нас">
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import Accordion from '../components/Accordion.vue'

const isOpen = ref(false)
const selectedCategoryId = ref(null);
const selectedCategoryName = ref('');
const modal = ref(null)

const emit = defineEmits();

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const filterProducts = (childId, childName) => {
  selectedCategoryId.value = childId;
  selectedCategoryName.value = childName;

  // Передаём выбранную категорию через событие
  emit('child-selected', childId, childName);

  // Закрываем модальное окно после выбора
  toggleMenu();
};

// Function to handle clicks outside the modal
const handleClickOutside = (event) => {
  if (modal.value && !modal.value.contains(event.target) && !event.target.closest('button')) {
    toggleMenu()
  }
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>