<script setup lang="ts">
import { ref, computed } from "vue";

import Model from "@/components/ui/Model.vue";
import productModel from "@/composables/useProductModel";

const { isOpen, onClose } = productModel();

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGlobalLoader } from "vue-global-loader";
const { displayLoader, destroyLoader } = useGlobalLoader();

//Define Type
type PAYLOAD = {
  name: string;
  price: number;
  stock: number;
  mainImage: File | undefined;
  subImages: File[] | undefined;
  decription: string;
  category: string | undefined;
};

//Create ref for form
const form = ref<PAYLOAD>({
  name: "Product",
  price: 10,
  stock: 10,
  mainImage: undefined,
  subImages: undefined,
  decription:
    "Lorem ipsum dolar sit amet, consecteture adipsicing elit. Dignissimos accusamus teneture saepe expeditna nisi,",
  category: undefined,
});

import { useCategoryStore } from "@/stores/categoryStore";

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categoriesData.categories);
</script>

<template>
  <Model :isOpen="isOpen" @on-close="onClose">
    <div class="overflow-y-auto h-[500px] max-h-[600px]">
      <form action="">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" type="text" placeholder="name" v-model="form.name" />
        </div>
        <div class="grid gap-2">
          <Label for="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="price"
            v-model="form.price"
          />
        </div>
        <div class="grid gap-2">
          <Label for="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            placeholder="stock"
            v-model="form.stock"
          />
        </div>
        <div class="grid gap-2">
          <Label for="decription">Decription</Label>
          <Input
            id="decription"
            type="text"
            placeholder="decription"
            v-model="form.decription"
          />
        </div>
        <div class="grid gap-2">
          <Label for="category">Category</Label>
          <Select v-model="form.category" id="category">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="category in categories"
                  :value="category._id"
                >
                  {{ category.name }} A
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  </Model>
</template>

<style></style>
