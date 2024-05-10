import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import type { APIResponse, Product, Products } from "@/types/index";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    productsData: {} as Products,
  }),

  actions: {
    async createProduct(form: Record<string, any>) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const formData = new FormData();
          formData.append("name", form.name);
          formData.append("price", form.price);
          formData.append("stock", form.stock);
          formData.append("mainImage", form.mainImage);
          formData.append("decription", form.decription);
          formData.append("category", form.category);

          for (let i = 0; i < form.subImages.length; i++) {
            formData.append("subImages", form.subImages[i]);
          }

          const { data } = await axios.post<APIResponse<Product>>(
            "/ecommerce/products",
            formData
          );
          console.log("Products", data.data);
          resolve(data.data);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
