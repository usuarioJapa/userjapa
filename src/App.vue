<template>
  <div class="h-screen w-screen p-5 flex flex-col">
    <div class="text-center md:text-base lg:text-lg xl:text-xl">
      <router-link to="/" class="mr-3">
        Main
      </router-link>
      <router-link to="/lightning-distance" class="mr-3">
        Lightning Distance
      </router-link>
      <router-link to="/tensor-flow">
        Tensor Flow
      </router-link>
    </div>
    <router-view class="flex-1"/>
  </div>
</template>
