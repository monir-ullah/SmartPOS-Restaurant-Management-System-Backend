export type TFoodItem = {
  foodId: string
  name: string
  price: number
  description: string
  categoryId: string
  imageUrl: string
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

export type TFoodItemFilters = {
  searchTerm?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  isAvailable?: boolean
}

export type TPaginationOptions = {
  page?: number
  limit?: number
}
