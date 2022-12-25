import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'
import FindAndSetRef from './FindAndSetRef'

describe('FindAndSetRef component', () => {
  it('is finding one', () => {
    let valueToTest: string | undefined

    const Component = () => {
      const ref = useRef<HTMLHeadingElement>(null)

      useEffect(() => {
        valueToTest = ref.current?.innerHTML
      }, [])

      return (
        <main>
          <FindAndSetRef selector=".my-class" refToSet={ref}>
            <div>
              <h1 className="my-class">Heading</h1>
            </div>
          </FindAndSetRef>
        </main>
      )
    }

    render(<Component></Component>)

    expect(valueToTest).toBe('Heading')
  })

  it('is finding multiple', () => {
    const valueToTest: string[] = []

    const Component = () => {
      const ref = useRef<NodeListOf<HTMLHeadingElement>>(null)

      useEffect(() => {
        ref.current?.forEach((headingElement) => valueToTest.push(headingElement.innerHTML))
      }, [])

      return (
        <main>
          <FindAndSetRef selector=".my-class" refToSet={ref} multiple>
            <div>
              <h1 className="my-class">Heading 1</h1>
              <h2 className="my-class">Heading 2</h2>
              <h2 className="my-class">Heading 3</h2>
            </div>
          </FindAndSetRef>
        </main>
      )
    }

    render(<Component></Component>)

    expect(valueToTest).toEqual(['Heading 1', 'Heading 2', 'Heading 3'])
  })

  it('throws when there is no wrap', () => {
    let valueToTest: string | undefined

    const RawComponent = (props: { children: JSX.Element }) => props.children

    const Component = () => {
      const ref = useRef<HTMLHeadingElement>(null)

      useEffect(() => {
        valueToTest = ref.current?.innerHTML
      }, [])

      return (
        <main>
          <FindAndSetRef selector="h1" refToSet={ref}>
            <RawComponent>
              <h1>Heading</h1>
            </RawComponent>
          </FindAndSetRef>
        </main>
      )
    }

    const consoleError = console.error

    console.error = jest.fn()

    expect(() => render(<Component></Component>)).toThrow(
      'Create a wrap element (div, span, etc.) for children of the FindAndSetRef component',
    )
    expect(valueToTest).toBeUndefined()

    console.error = consoleError
  })
})
