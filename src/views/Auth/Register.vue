<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

//imports Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectContent from "@/components/ui/select/SelectContent.vue";

//Define Type
type PAYLOAD = {
  email: string;
  password: string;
  username: string;
  role: "ADMIN" | "USER";
};

//Create ref for form
const form = ref<PAYLOAD>({
  password: "password",
  username: "mark1",
  email: "abc@markmail1.com",
  role: "ADMIN",
});

// import store
import { useAuthStore } from "@/stores/authStore";

//routing
const router = useRouter();

//use store
const store = useAuthStore();

//function for submit for and navigate/route after submit
const onSubmit = async () => {
  try {
    await store.registerUser(form.value);
    router.push("/");
  } catch (err) {
    console.log(err);
  } finally {
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl"> Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account</CardDescription
            >
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="email"
                v-model="form.email"
              />
            </div>
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                v-model="form.username"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" v-model="form.password" />
            </div>
            <div class="grid gap-1">
              <Label for="role">Role</Label>
              <Select v-model="form.role" id="role">
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">Register</Button>
            <p>
              Already have an account?
              <RouterLink
                to="/auth/login"
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
                >Login</RouterLink
              >
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>
