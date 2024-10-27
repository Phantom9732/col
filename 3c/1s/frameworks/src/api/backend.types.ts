export type Category = {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  discont_price: number | null;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
};

export type AllCategoriesResponse = Category[];

export type CategoryResponse = {
  category: Category;
  data: Product[];
};

export type AllProductsResponse = Product[];
export type ProductResponse = Product;
