import { render, screen } from '@testing-library/react'
import { createTestProperty, createExpensiveProperty } from '../helpers/testData'
import PropertyCard from '@/components/PropertyCard'

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('PropertyCard', () => {
  it('muestra informacion basica de una propiedad', () => {
    const propiedad = createTestProperty()
    
    render(<PropertyCard property={propiedad} />)
    
    expect(screen.getByText('Casa en Zona Rosa')).toBeTruthy()
    expect(screen.getByText('Calle Hamburgo 123, Ciudad de México')).toBeTruthy()
    expect(screen.getByText('$2,850,000')).toBeTruthy()
    expect(screen.getByText('María González')).toBeTruthy()
  })

  it('maneja precios altos correctammente', () => {
    const propiedadCara = createExpensiveProperty()
    
    render(<PropertyCard property={propiedadCara} />)
    
    expect(screen.getByText('$15,000,000')).toBeTruthy()
    expect(screen.getByText('Penthouse Las Lomas')).toBeTruthy()
  })

  it('tiene un enlace hacia el detalle de la propriedad', () => {
    const propiedad = createTestProperty()
    
    render(<PropertyCard property={propiedad} />)
    
    const enlace = screen.getByRole('link')
    expect(enlace.getAttribute('href')).toBe('/properties/1')
  })

  it('muestra la imagen de la propriedad', () => {
    const propiedad = createTestProperty()
    
    render(<PropertyCard property={propiedad} />)
    
    const imagen = screen.getByAltText('Casa en Zona Rosa')
    expect(imagen).toBeTruthy()
    expect(imagen.getAttribute('src')).toBe('https://picsum.photos/400/300?random=1')
  })

  it('puede manejar nombres largos de propiedades', () => {
    const propiedadNombreLargo = {
      ...createTestProperty(),
      name: 'Casa de Lujo con Vista Panorámica en Zona Exclusiva de la Ciudad',
    }
    
    render(<PropertyCard property={propiedadNombreLargo} />)
    
    expect(screen.getByText('Casa de Lujo con Vista Panorámica en Zona Exclusiva de la Ciudad')).toBeTruthy()
  })
})