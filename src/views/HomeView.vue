<script setup lang="ts">
import { Button } from "@/components/ui/button";
import ProductModel from "@/components/model/ProductModel.vue";

import productModel from "@/composables/useProductModel";
const { onOpen, isOpen } = productModel();
</script>
<template>
  <ProductModel v-if="isOpen" />

  <div class="mx-auto w-full max-w-4xl my-10">
    <div class="flex justify-between items-center">
      <h3 class="text-2xl font-bold">All Products</h3>
      <Button @click="onOpen">Add Products</Button>
    </div>
  </div>
</template>
