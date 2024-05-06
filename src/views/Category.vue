<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

//imports Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { error } from "console";
// import store
import { useCategoryStore } from "@/stores/categoryStore";
import { useGlobalLoader } from "vue-global-loader";

const { displayLoader, destroyLoader } = useGlobalLoader({
  screenReaderMessage:
    "Signing-in, redirecting to the dashboard, please wait...",
});

//Define Type
type PAYLOAD = {
  name: string;
};

//Create ref for form
const form = ref<PAYLOAD>({
  name: "shirts",
});

//routing
const router = useRouter();

//use store
const store = useCategoryStore();

//function for submit for and navigate/route after submit
const onSubmit = async () => {
  try {
    displayLoader();
    await store.createCategory(form.value);
    router.push("/");
  } catch (err) {
    console.log(err);
  } finally {
    destroyLoader();
  }
};

const fetchCategoris = async () => {
  try {
    displayLoader();
    const page: number = 1;
    const limit: number = 5;
    await store.getCategories(page, limit);
  } catch (error) {
    console.log(error);
  } finally {
    //destroyLoader();
  }
};

onMounted(async () => {
  await fetchCategoris();
});
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto pt-4">
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="name"
                v-model="form.name"
              />
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">Create</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>
