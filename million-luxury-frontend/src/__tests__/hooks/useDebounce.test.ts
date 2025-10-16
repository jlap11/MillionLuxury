import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('retorna el valor inicial inmediatammente', () => {
    const { result } = renderHook(() => useDebounce('valor inicial', 500))
    
    expect(result.current).toBe('valor inicial')
  })

  it('retrasa la actualizacion del valor', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'inicial', delay: 500 } }
    )
    
    expect(result.current).toBe('inicial')
    
    rerender({ value: 'nuevo valor', delay: 500 })
    
    expect(result.current).toBe('inicial')
    
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('nuevo valor')
  })

  it('cancela el timer anterior cuando el valor cambia rapidammente', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'inicial', delay: 500 } }
    )
    
    rerender({ value: 'primer cambio', delay: 500 })
    
    act(() => {
      jest.advanceTimersByTime(250)
    })
    
    rerender({ value: 'segundo cambio', delay: 500 })
    
    act(() => {
      jest.advanceTimersByTime(250)
    })
    
    expect(result.current).toBe('inicial')
    
    act(() => {
      jest.advanceTimersByTime(250)
    })
    
    expect(result.current).toBe('segundo cambio')
  })

  it('funciona con diferentes tipos de datos', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 42, delay: 300 } }
    )
    
    expect(result.current).toBe(42)
    
    rerender({ value: 100, delay: 300 })
    
    act(() => {
      jest.advanceTimersByTime(300)
    })
    
    expect(result.current).toBe(100)
  })

  it('permite configurar el tiempo de delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'inicial', delay: 1000 } }
    )
    
    rerender({ value: 'nuevo', delay: 1000 })
    
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('inicial')
    
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('nuevo')
  })
})