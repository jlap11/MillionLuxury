import { propertyService } from '@/services/property.service'
import { createTestProperty, createFullPropertyDetail } from '../helpers/testData'

const mockFetch = jest.fn()
globalThis.fetch = mockFetch

describe('PropertyService', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api'
  })

  describe('getProperties', () => {
    it('obtiene la lista de propiedades correctammente', async () => {
      const propiedadesMock = {
        items: [createTestProperty()],
        totalCount: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => propiedadesMock
      })

      const resultado = await propertyService.getProperties({})

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/Properties?page=1&pageSize=10'
      )
      expect(resultado).toEqual(propiedadesMock)
    })

    it('incluye filtros en la URL cuando se proporcionan', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [], totalCount: 0, page: 1, pageSize: 10, totalPages: 0 })
      })

      await propertyService.getProperties({
        name: 'Casa bonita',
        address: 'Polanco',
        minPrice: 1000000,
        maxPrice: 5000000,
        page: 2,
        pageSize: 5
      })

      const urlLlamada = mockFetch.mock.calls[0][0] as string
      
      expect(urlLlamada).toContain('name=Casa%20bonita')
      expect(urlLlamada).toContain('address=Polanco')
      expect(urlLlamada).toContain('minPrice=1000000')
      expect(urlLlamada).toContain('maxPrice=5000000')
      expect(urlLlamada).toContain('page=2')
      expect(urlLlamada).toContain('pageSize=5')
    })

    it('maneja errores del servidor', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })

      await expect(propertyService.getProperties({}))
        .rejects
        .toThrow('Error 500: Internal Server Error')
    })

    it('maneja respuestas envueltas en ApiResponse', async () => {
      const propiedadesMock = {
        items: [createTestProperty()],
        totalCount: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1
      }

      const respuestaEnvuelta = {
        success: true,
        data: propiedadesMock,
        message: 'OK',
        errors: []
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => respuestaEnvuelta
      })

      const resultado = await propertyService.getProperties({})

      expect(resultado).toEqual(propiedadesMock)
    })
  })

  describe('getPropertyById', () => {
    it('obtiene una propriedad especifica por ID', async () => {
      const propiedadDetalle = createFullPropertyDetail()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => propiedadDetalle
      })

      const resultado = await propertyService.getPropertyById('1')

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/Properties/1'
      )
      expect(resultado).toEqual(propiedadDetalle)
    })

    it('maneja el error 404 cuando no encuentra la propriedad', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })

      await expect(propertyService.getPropertyById('999'))
        .rejects
        .toThrow('Property not found')
    })

    it('desenvuelve respuestas ApiResponse para detalles', async () => {
      const propiedadDetalle = createFullPropertyDetail()
      
      const respuestaEnvuelta = {
        success: true,
        data: propiedadDetalle,
        message: 'OK',
        errors: []
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => respuestaEnvuelta
      })

      const resultado = await propertyService.getPropertyById('1')

      expect(resultado).toEqual(propiedadDetalle)
    })
  })
})