import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@mantine/core',
    '@mantine/hooks'
  ],
  sourcemap: true,
  minify: false,
  treeshake: true,
  splitting: false,
});