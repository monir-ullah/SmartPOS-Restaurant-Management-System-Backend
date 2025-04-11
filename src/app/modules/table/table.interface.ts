export type TTableStatus = 'available' | 'occupied' | 'reserved' | 'maintenance'

export type TTable = {
  tableId: string
  tableNumber: number
  seatCapacity: number
  isAvailable: boolean
  status: TTableStatus
  createdAt: Date
  updatedAt: Date
}

export type TTableFilters = {
  page?: string
  limit?: string
  sortBy?: string
  sortOrder?: string
  searchTerm?: string
  tableNumber?: number
  seatCapacity?: number
  status?: TTableStatus
}

export type TTableResponse = {
  success: boolean
  message: string
  data: TTable | TTable[] | null
}
