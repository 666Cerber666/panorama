<template>
    <footer class="text relative flex h-16 items-center justify-between w-full px-10 gap-10 border-t-2 border-rose-600">
        <router-link to="/">
                <div class="flex flex-shrink-0 items-center justify-center py-10">
                <div><img class="h-auto w-auto" src="./../assets/logo.svg" alt="Your Company" /></div>
                </div>
            </router-link>
        <div class="flex py-10 gap-10 h-full">
            <div class="flex gap-5 flex-col">
                <router-link to="/">
                <div class="flex flex-shrink-0 items-center">
                    Главная
                </div>
            </router-link>
            <router-link to="/contacts">
                <div class="flex flex-shrink-0 items-center">
                    О нас
                </div>
            </router-link>
            </div>
            <div class="flex flex-col h-full items-start gap-5">
                <div class="flex gap-4 items-center justify-center"><img class="w-4 h-4" src="../assets/mail-ico.svg"><span>pfp21@list.ru</span></div>
                <div class="flex gap-4 items-center justify-center"><img class="w-4 h-4" src="../assets/geo-ico.svg"><span>им Дерябина проезд 2/209, Ижевск</span></div>
                <div class="flex gap-4 items-center justify-center"><img class="w-4 h-4" src="../assets/phone-ico.svg"><a style="color:black;" class="my-hover uk-panel uk-flex-stretch uk-link-toggle" href="tel:+73412904244">+7 (3412) 90-42-44</a></div>
            </div>
        </div>
    </footer>
</template>