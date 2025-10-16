import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from '@/components/FilterBar'

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value
}))

describe('FilterBar', () => {
  const mockOnFilterChange = jest.fn()

  beforeEach(() => {
    mockOnFilterChange.mockClear()
  })

  it('permite buscar por nombre de propiedad', async () => {
    const user = userEvent.setup()
    
    render(<FilterBar onFilterChange={mockOnFilterChange} loading={false} />)
    
    const campoNombre = screen.getByPlaceholderText(/buscar/i)
    await user.type(campoNombre, 'Casa de lujo')
    
    expect((campoNombre as HTMLInputElement).value).toBe('Casa de lujo')
  })

  it('permite filtrar por ubicacion', async () => {
    const user = userEvent.setup()
    
    render(<FilterBar onFilterChange={mockOnFilterChange} loading={false} />)
    
    const campoUbicacion = screen.getByPlaceholderText(/ubicacion/i)
    await user.type(campoUbicacion, 'Polanco')
    
    expect((campoUbicacion as HTMLInputElement).value).toBe('Polanco')
  })

  it('maneja rangos de precio correctammente', async () => {
    const user = userEvent.setup()
    
    render(<FilterBar onFilterChange={mockOnFilterChange} loading={false} />)
    
    const precioMinimo = screen.getByPlaceholderText(/precio minimo/i)
    const precioMaximo = screen.getByPlaceholderText(/precio maximo/i)
    
    await user.type(precioMinimo, '1000000')
    await user.type(precioMaximo, '5000000')
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        name: '',
        address: '',
        minPrice: 1000000,
        maxPrice: 5000000
      })
    })
    
    expect((precioMinimo as HTMLInputElement).value).toBe('1000000')
    expect((precioMaximo as HTMLInputElement).value).toBe('5000000')
  })

  it('boton reset limpia todos los campos', async () => {
    const user = userEvent.setup()
    
    render(<FilterBar onFilterChange={mockOnFilterChange} loading={false} />)
    
    const campoNombre = screen.getByPlaceholderText(/buscar/i)
    const campoUbicacion = screen.getByPlaceholderText(/ubicacion/i)
    
    await user.type(campoNombre, 'Casa test')
    await user.type(campoUbicacion, 'Roma Norte')
    
    const botonReset = screen.getByText(/limpiar/i)
    await user.click(botonReset)
    
    expect((campoNombre as HTMLInputElement).value).toBe('')
    expect((campoUbicacion as HTMLInputElement).value).toBe('')
  })

  it('muestra estado de carga correctammente', () => {
    render(<FilterBar onFilterChange={mockOnFilterChange} loading={true} />)
    
    expect(screen.getByText(/buscando/i)).toBeTruthy()
    
    const campoNombre = screen.getByPlaceholderText(/buscar/i)
    expect((campoNombre as HTMLInputElement).disabled).toBe(true)
  })

  it('llama onFilterChange con debounce', async () => {
    const user = userEvent.setup()
    
    render(<FilterBar onFilterChange={mockOnFilterChange} loading={false} />)
    
    const campoNombre = screen.getByPlaceholderText(/buscar/i)
    await user.type(campoNombre, 'Penthouse')
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        name: 'Penthouse',
        address: '',
        minPrice: undefined,
        maxPrice: undefined
      })
    })
  })
})