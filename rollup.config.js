import typescript from '@rollup/plugin-typescript'
import cleanup from 'rollup-plugin-cleanup'
import pkg from './package.json'

export default [
  {
    input: 'src/FindAndSetRef.tsx',
    output: [
      {
        file: pkg.exports['.'].import,
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [typescript({ include: ['src/FindAndSetRef.tsx'] }), cleanup()],
    external: ['react', 'react-dom', 'use-child-ref'],
  },
  {
    input: 'src/FindAndSetRef.tsx',
    output: [
      {
        file: pkg.exports['.'].require,
        format: 'cjs',
        exports: 'default',
      },
    ],
    plugins: [typescript({ include: ['src/FindAndSetRef.tsx'], declaration: false }), cleanup()],
    external: ['react', 'react-dom', 'use-child-ref'],
  },
]
