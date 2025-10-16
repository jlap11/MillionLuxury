import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'
import { createTestProperty } from '../helpers/testData'
import type { PropertyListDto } from '@/types/property.types'

const mockPropertyService = {
  getProperties: jest.fn()
}

jest.mock('@/services/property.service', () => ({
  propertyService: mockPropertyService
}))

type FilterChange = { name?: string; address?: string; minPrice?: number; maxPrice?: number }

jest.mock('@/components/FilterBar', () => {
  return function FilterBarMock({ onFilterChange }: { onFilterChange: (filters: FilterChange) => void }) {
    return (
      <div data-testid="filter-bar">
        <button onClick={() => onFilterChange({ name: 'test' })}>Filtrar</button>
      </div>
    )
  }
})

jest.mock('@/components/PropertyCard', () => {
  return function PropertyCardMock({ property }: { property: PropertyListDto }) {
    return <div data-testid="property-card">{property.name}</div>
  }
})

type PaginationProps = { currentPage: number; totalPages: number; onPageChange: (page: number) => void }

jest.mock('@/components/Pagination', () => {
  return function PaginationMock({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <div data-testid="pagination">
        <span>Pagina {currentPage} de {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)}>Siguiente</button>
      </div>
    )
  }
})

describe('Pagina Principal', () => {
  beforeEach(() => {
    mockPropertyService.getProperties.mockClear()
  })

  it('muestra el titulo y filtros de la pagina', () => {
    mockPropertyService.getProperties.mockResolvedValue({
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0
    })

    render(<HomePage />)

    expect(screen.getByText(/Propiedades de Lujo/)).toBeTruthy()
    expect(screen.getByTestId('filter-bar')).toBeTruthy()
  })

  it('muestra lista de propiedades cuando hay datos', () => {
    const propiedadesMock = [
      { ...createTestProperty(), name: 'Casa Polanco' },
      { ...createTestProperty(), name: 'Penthouse Roma Norte' }
    ]

    mockPropertyService.getProperties.mockResolvedValue({
      items: propiedadesMock,
      totalCount: 2,
      page: 1,
      pageSize: 10,
      totalPages: 1
    })

    const component = render(<HomePage />)

    const tarjetas = screen.getAllByTestId('property-card')
    expect(tarjetas).toHaveLength(2)
    expect(component.container.textContent).toContain('Casa Polanco')
    expect(component.container.textContent).toContain('Penthouse Roma Norte')
  })

  it('muestra mensaje cuando no hay propiedades', () => {
    mockPropertyService.getProperties.mockResolvedValue({
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0
    })

    const component = render(<HomePage />)

    expect(component.container.textContent).toContain('No se encontraron propiedades')
  })

  it('muestra paginacion cuando hay multiples paginas', () => {
    mockPropertyService.getProperties.mockResolvedValue({
      items: [createTestProperty()],
      totalCount: 25,
      page: 1,
      pageSize: 10,
      totalPages: 3
    })

    render(<HomePage />)

    const paginacion = screen.getByTestId('pagination')
    expect(paginacion).toBeTruthy()
    expect(paginacion.textContent).toContain('Pagina 1 de 3')
  })

  it('maneja errores en la carga de datos', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    mockPropertyService.getProperties.mockRejectedValue(new Error('Error del servidor'))

    render(<HomePage />)

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error loading properties:',
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })
})
