type ProductBase = {
  id: number
  /** '2022-03-08' */
  createdAt: string
  price: number
  discount_price: number | null
  guarantee: number
  rating: number
  count_review: number
  is_available: boolean
  store_address: string
  color: string
  brand: string
  country: string
  name: string
  images: string[]
  characteristics: Characteristic[]
}

type Characteristic = {
  characteristic: string
  unit_type: string
  value: string
}

export type Product = ProductBase & { category: number }

export type ServerProductsResponse = ProductBase & { category: string }
