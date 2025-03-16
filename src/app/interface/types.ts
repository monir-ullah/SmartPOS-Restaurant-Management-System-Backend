/* eslint-disable @typescript-eslint/no-explicit-any */

// Query type for query
export type TSmartphoneQuery = {
  name?: string
  price?: number[]
  releaseDate?: Date[]
  storageCapacity?: string
  model?: string
  screenSize?: string
  brand?: string
  operatingSystem?: string[]
}

export type TSearchQuery = {
  name?: string | RegExp
  price?: { $gte: number; $lte: number }
  releaseDate?: { $gte: Date; $lte: Date }
  storageCapacity?: string | RegExp
  model?: string | RegExp
  screenSize?: string | RegExp
  brand?: string | RegExp
  operatingSystem?: {
    $in?: RegExp[]
  }
}

// Sales History Date type
export type TSalesHistoryDateType = {
  type?: 'date' | 'week' | 'month' | 'year' | 'range'
  startDate?: string | Date
  endDate?: string | Date
  selectedDate?: string | Date
}

// Sold date
export type TSoldDate = {
  soldDate?: {
    $gte?: Date
    $lte?: Date
    $eq?: Date
  }
}
