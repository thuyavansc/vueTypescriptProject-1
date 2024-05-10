<script setup lang="ts">
import { ref, computed } from "vue";

import Model from "@/components/ui/Model.vue";
import FileUploader from "@/components/ui/FileUploader.vue";
import productModel from "@/composables/useProductModel";
import { useObjectUrl } from "@vueuse/core";

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
import { Button } from "@/components/ui/button";
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

import { useProductStore } from "@/stores/productStore";
const productStore = useProductStore();

const categories = computed(() => categoryStore.categoriesData.categories);
const mainImagePreview = ref<string[]>([]);
const subImagePreview = ref<string[]>([]);

const onMainImageDrop = (files: File[] | null) => {
  form.value.mainImage = files && files.length > 0 ? files[0] : undefined;
  if (files && files.length) {
    files.forEach((file, index) => {
      if (index === 0) {
        const url = useObjectUrl(file);
        if (url.value) {
          mainImagePreview.value.push(url.value);
        }
      }
    });
  }
};

const onMainImageChange = (files: File[] | null) => {
  form.value.mainImage = files && files.length > 0 ? files[0] : undefined;
  if (files && files.length) {
    Array.from(files).forEach((file, index) => {
      if (index === 0) {
        const url = useObjectUrl(file);
        if (url.value) {
          mainImagePreview.value.push(url.value);
        }
      }
    });
  }
};

const onSubImageDrop = (files: File[] | null) => {
  form.value.subImages = files && files.length > 0 ? files : undefined;
  if (files && files.length) {
    files.forEach((file, index) => {
      const url = useObjectUrl(file);
      if (url.value) {
        subImagePreview.value.push(url.value);
      }
    });
  }
};

const onSubImageChange = (files: File[] | null) => {
  form.value.subImages =
    files && files.length > 0 ? Array.from(files) : undefined;
  if (files && files.length) {
    Array.from(files).forEach((file, index) => {
      const url = useObjectUrl(file);
      if (url.value) {
        subImagePreview.value.push(url.value);
      }
    });
  }
};

const onSubmit = async () => {
  try {
    displayLoader();
    await productStore.createProduct(form.value);
    onClose();
  } catch (error) {
    console.log(error);
  } finally {
    destroyLoader();
  }
};
</script>

<template>
  <Model :isOpen="isOpen" @on-close="onClose">
    <div class="overflow-y-auto h-[500px] max-h-[600px]">
      <form action="" class="grid gap-y-4">
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
          <template v-if="!form.mainImage">
            <Label for="mImage">Main Image</Label>
            <FileUploader
              @on-change="onMainImageChange"
              @on-drop="onMainImageDrop"
              :multiple="false"
            />
          </template>

          <div class="flex gap-x-2 my-2" v-else>
            <img
              v-for="img in mainImagePreview"
              :src="img"
              class="h-40 w-auto object-cover object-center border"
            />
          </div>
        </div>

        <div class="grid gap-2">
          <template v-if="!form.subImage">
            <Label for="mImage">Sub Images</Label>
            <FileUploader
              @on-change="onSubImageChange"
              @on-drop="onSubImageDrop"
              :multiple="true"
            />
          </template>

          <div class="flex gap-x-2 my-2" v-else>
            <img
              v-for="img in subImagePreview"
              :src="img"
              class="h-40 w-auto object-cover object-center border"
            />
          </div>
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
        <Button class="w-full" type="submit"> Create Product </Button>
      </form>
    </div>
  </Model>
</template>

<style></style>
