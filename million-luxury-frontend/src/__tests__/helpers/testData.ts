import { PropertyListDto, PropertyDetailDto, OwnerDto, PropertyImageDto, PropertyTraceDto, PropertyInfoDto } from '@/types/property.types'

export const createTestProperty = (): PropertyListDto => ({
  idProperty: "1",
  name: "Casa en Zona Rosa",
  address: "Calle Hamburgo 123, Ciudad de México",
  price: 2850000,
  image: "https://picsum.photos/400/300?random=1",
  idOwner: "1",
  ownerName: "María González"
})

export const createExpensiveProperty = (): PropertyListDto => ({
  idProperty: "2", 
  name: "Penthouse Las Lomas",
  address: "Av. de los Bosques 456, Lomas de Chapultepec",
  price: 15000000,
  image: "https://picsum.photos/400/300?random=2",
  idOwner: "2", 
  ownerName: "Roberto Silva"
})

export const createBudgetProperty = (): PropertyListDto => ({
  idProperty: "3",
  name: "Departamento Centro",
  address: "Calle Regina 789, Centro Histórico", 
  price: 890000,
  image: "https://picsum.photos/400/300?random=3",
  idOwner: "3",
  ownerName: "Carmen Morales"
})

export const createPropertyInfo = (): PropertyInfoDto => ({
  idProperty: "1",
  name: "Casa en Zona Rosa",
  address: "Calle Hamburgo 123, Ciudad de México",
  price: 2850000,
  codeInternal: "MLX-001",
  year: 2020
})

export const createFullPropertyDetail = (): PropertyDetailDto => ({
  property: createPropertyInfo(),
  owner: createTestOwner(),
  images: [
    createTestImage("1", "https://picsum.photos/800/600?random=1"),
    createTestImage("2", "https://picsum.photos/800/600?random=2")
  ],
  traces: [createTestTrace()]
})

export const createTestOwner = (): OwnerDto => ({
  idOwner: "1",
  name: "María González",
  address: "Calle Reforma 456, Polanco",
  photo: "https://picsum.photos/100/100?random=10",
  birthday: "1980-05-15"
})

export const createTestImage = (id: string, file: string): PropertyImageDto => ({
  idPropertyImage: id,
  file: file,
  enabled: true
})

export const createTestTrace = (): PropertyTraceDto => ({
  idPropertyTrace: "1",
  dateSale: "2023-01-15",
  name: "Venta inicial",
  value: 2850000,
  tax: 285000
})