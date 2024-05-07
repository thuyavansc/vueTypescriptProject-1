<script setup lang="ts">
import Model from "@/components/ui/Model.vue";
import productModel from "@/composables/useProductModel";

const { isOpen, onClose } = productModel();
</script>

<template>
  <Model :isOpen="isOpen" @on-close="onClose">
    <div>Product Model</div>
  </Model>
</template>

<style></style>
