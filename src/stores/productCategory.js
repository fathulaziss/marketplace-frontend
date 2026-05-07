import { defineStore } from "pinia";
import axiosInstance from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";

export const userProductCategory = defineStore("productCategory", {
  state: () => ({
    productCategories: [],
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    },
    loading: false,
    errors: null,
    success: null,
  }),

  getters: {
    getProductCategories: (state) => state.productCategories,
    getProductCategory: (state) => state.productCategory,
  },

  actions: {
    async fetchProductCategories(params) {
      this.loading = true;

      try {
        const response = await axiosInstance.get("product-category", {
          params,
        });

        this.productCategories = response.data.data;
      } catch (error) {
        this.errors = handleError(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
