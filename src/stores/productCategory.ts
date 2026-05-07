import { defineStore } from "pinia";
import axiosInstance from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";

export interface ProductCategory {
  id?: number;
  name?: string;
  [key: string]: any;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProductCategoryState {
  productCategories: ProductCategory[];
  productCategory: ProductCategory | null;
  meta: Meta;
  loading: boolean;
  errors: any | null;
  success: string | null;
}

export const useProductCategory = defineStore("productCategory", {
  state: (): ProductCategoryState => ({
    productCategories: [],
    productCategory: null, // Ditambahkan karena dipanggil di getters
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
    async fetchProductCategories(params?: Record<string, any>) {
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
