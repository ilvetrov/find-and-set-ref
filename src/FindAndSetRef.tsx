import { MutableRefObject, useEffect, useLayoutEffect } from 'react'
import useChildRef from 'use-child-ref'

function findElement<T extends HTMLElement>(selector: string, element: HTMLElement): T | null {
  return element.querySelector(selector)
}

function findElementAll<T extends HTMLElement>(selector: string, element: HTMLElement): NodeListOf<T> {
  return element.querySelectorAll(selector)
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export type CommonProps = {
  selector: string
  children: JSX.Element
}

export type OneElementProps<T extends HTMLElement> = {
  multiple?: false
  refToSet: MutableRefObject<T | null | undefined>
}

export type MultipleProps<T extends HTMLElement> = {
  multiple: true
  refToSet: MutableRefObject<NodeListOf<T> | null | undefined>
}

export default function FindAndSetRef<T extends HTMLElement>({
  refToSet,
  selector,
  children,
  multiple = false,
}: CommonProps & (OneElementProps<T> | MultipleProps<T>)) {
  const [child, childRef] = useChildRef(children)

  useIsomorphicLayoutEffect(() => {
    if (!childRef?.current) {
      throw new Error('Create a wrap element (div, span, etc.) for children of the FindAndSetRef component')
    }

    if (multiple) {
      const elements = findElementAll<T>(selector, childRef.current)

      refToSet.current = elements
    } else {
      const element = findElement<T>(selector, childRef.current)

      if (element && (refToSet.current as any) !== element) {
        refToSet.current = element
      }
    }
  }, [children, selector, multiple])

  return child
}
