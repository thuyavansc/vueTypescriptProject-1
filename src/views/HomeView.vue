<script setup lang="ts">
import { onMounted } from "vue";
import { Button } from "@/components/ui/button";
import ProductModel from "@/components/model/ProductModel.vue";

import productModel from "@/composables/useProductModel";
const { onOpen, isOpen } = productModel();
import { useCategoryStore } from "@/stores/categoryStore";

const categoryStore = useCategoryStore();
import { useGlobalLoader } from "vue-global-loader";

const { displayLoader, destroyLoader } = useGlobalLoader({
  screenReaderMessage:
    "Signing-in, redirecting to the dashboard, please wait...",
});

const fetchCategoris = async () => {
  try {
    displayLoader();
    const page: number = 1;
    const limit: number = 5;
    await categoryStore.getCategories(page, limit);
  } catch (error) {
    console.log(error);
  } finally {
    destroyLoader();
  }
};

onMounted(async () => {
  await fetchCategoris();
});
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
