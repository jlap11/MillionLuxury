import { formatPrice, formatDate } from '@/utils/format'

describe('formatPrice', () => {
  it('formatea precios en pesos mexicanos correctammente', () => {
    expect(formatPrice(1000000)).toBe('$1,000,000')
    expect(formatPrice(2500000)).toBe('$2,500,000')
  })

  it('maneja precios pequeños', () => {
    expect(formatPrice(50000)).toBe('$50,000')
    expect(formatPrice(999)).toBe('$999')
    expect(formatPrice(0)).toBe('$0')
  })

  it('maneja precios con decimales', () => {
    expect(formatPrice(1500000.5)).toBe('$1,500,001')
    expect(formatPrice(2750000.25)).toBe('$2,750,000')
  })

  it('funciona con precios negativos', () => {
    expect(formatPrice(-1000000)).toBe('-$1,000,000')
    expect(formatPrice(-500000)).toBe('-$500,000')
  })

  it('maneja numeros muy grandes', () => {
    expect(formatPrice(999999999)).toBe('$999,999,999')
    expect(formatPrice(1000000000)).toBe('$1,000,000,000')
  })
})

describe('formatDate', () => {
  it('formatea fechas en formato ISO correctammente', () => {
    expect(formatDate('2023-01-15')).toBe('15/01/2023')
    expect(formatDate('2023-12-31')).toBe('31/12/2023')
    expect(formatDate('2024-06-10')).toBe('10/06/2024')
  })

  it('maneja fechas de diferentes años', () => {
    expect(formatDate('1985-03-15')).toBe('15/03/1985')
    expect(formatDate('2025-11-20')).toBe('20/11/2025')
  })

  it('funciona con fechas de principio y final de año', () => {
    expect(formatDate('2023-01-01')).toBe('01/01/2023')
    expect(formatDate('2023-12-31')).toBe('31/12/2023')
  })

  it('maneja meses de un dijito agregando cero', () => {
    expect(formatDate('2023-01-05')).toBe('05/01/2023')
    expect(formatDate('2023-09-08')).toBe('08/09/2023')
  })

  it('maneja formatos de fecha completos', () => {
    expect(formatDate('2023-01-15T10:30:00')).toBe('15/01/2023')
  })
})