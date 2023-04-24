<p>
  <img src="https://raw.githubusercontent.com/ilvetrov/find-and-set-ref/main/logo.svg" width="200" height="127" />
</p>

React component to find an element among children and set a ref to it.

- :wrench: **Great for legacy third party code.**

- :blue_heart: **TypeScript + Defensive Types.** As long as the types allow your code to compile, everything will always work after compilation.

## Usage

### Find one element

```tsx
import FindAndSetRef from 'find-and-set-ref'

export default function MyComponent() {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    console.log(ref.current?.innerHTML) // Heading text
  }, [])

  return (
    <main>
      <FindAndSetRef selector=".my-class" refToSet={ref}>
        <div>
          <h1 className="my-class">Heading text</h1>
        </div>
      </FindAndSetRef>
    </main>
  )
}
```

### Find multiple elements

Add the `multiple` prop and use `NodeListOf<HTMLHeadingElement>` in `useRef`.

```tsx
import FindAndSetRef from 'find-and-set-ref'

export default function MyComponent() {
  const ref = useRef<NodeListOf<HTMLHeadingElement>>(null)

  // Or useLayoutEffect
  useEffect(() => {
    console.log(ref.current) // NodeList(3) [h2.my-class, h2.my-class, h2.my-class]
  }, [])

  return (
    <main>
      <FindAndSetRef selector=".my-class" refToSet={ref} multiple>
        <div>
          <h2 className="my-class">Heading text</h1>
          <h2 className="my-class">Heading text</h1>
          <h2 className="my-class">Heading text</h1>
        </div>
      </FindAndSetRef>
    </main>
  )
}
```

## Rules

- **1.** Add a wrapper element: an HTML element or custom component wrapped in [forwardRef](https://reactjs.org/docs/forwarding-refs.html).

```tsx
<FindAndSetRef selector=".my-class" refToSet={ref}>
  {/* This div is the wrapper */}
  <div>
    
  </div>
</FindAndSetRef>
```

This is to use the wrapped element's ref as the root element to find the element you are looking for.

- **2.** Add a new wrapper if the element you are looking for can be the wrapper.

```tsx
<FindAndSetRef selector=".my-class" refToSet={ref}>
  {/* ref will be undefined */}
  <div className="my-class">
    
  </div>
</FindAndSetRef>
```