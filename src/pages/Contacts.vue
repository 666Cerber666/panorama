<template>
    <Header class="block"/>
    <Finder />
  <div class="flex flex-col md:flex-row w-full mb-4 gap-4 h-auto">
    <div class="flex p-24">
          <div class="flex p-24" :class="{ 'hidden': isMobile }">
            <Accordion @child-selected="handleCategorySelection" class="mt-20" />
          </div>
            <div class="flex items-start flex-col w-full">
                <div class="pl-20"><h3 class="text-2xl">О нас</h3></div>
                <div class="px-20 text-left mt-10 text">
                    <span class="text">
                      <p>Производственная Фирма «Панорама» - многопрофильная рекламно-производственная компания, созданная профессионалами в области маркетинга и производства рекламной продукции в 2004 году. 
                      Наши высококвалифицированные специалисты в различных областях дизайна помогают развивать бизнес своим клиентам. Мы создаем идеи и реализуем их, отвечая за их благополучное развитие в будущем. 
                      Внимательный и индивидуальный подход к целям и особенностям каждого Клиента делает нас постоянными партнерами компаний, которые остаются в дальнейшем нашими заказчиками.Наша компания оказывает широчайший спектр рекламных услуг по производству рекламной продукции:</p><br>
                      -Выставочное и торговое оборудование для всех видов и категорий товаров.<br>
                      -Элементы оформления витрин и выставочных залов<br>
                      -Сувенирно-представительская продукция-Визуальная реклама<br>
                      -Дизайн<br><br>
                      <p>Наличие высокотехнологично оснащенной производственной базы дает нам и нашим клиентам целый ряд неоспоримых преимуществ:<br>
                      возможность самостоятельного изготовления заказов без помощи посредников, что существенно сокращает сроки изготовления заказа;
                      высокое материально-техническое оснащение позволяет претворить в жизнь даже самые смелые идеи и замыслы;
                      возможность изготовления любых партий изделий, как больших, так и единичных индивидуальных;</p></span>
                </div> 
            </div>
        </div> 
  </div>
  <div class="banner_contacts"></div>
  <Footer/>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Accordion from '../components/Accordion.vue';
import Header from '../components/Header.vue';
import Finder from '../components/Finder.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();

const isMobile = window.innerWidth < 768;

function handleCategorySelection(childId, childName) {
  router.push({ path: '/',});
}

</script>

<style scoped>
.banner_contacts{
    width:100%;
    height:560px;
    background-image: url('../assets/banner_contacts.svg');
    background-position: cover;
    background-size: 100%;
    background-repeat: no-repeat;
}

@media (max-width: 768px) {
    .hidden {
      display: none;
    }
    .banner_contacts{
      height:260px;
    }
    .text{
      padding-left:0px;
    }
}
</style>
