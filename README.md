# mantine-select-async-paginate

[![Documentation](https://img.shields.io/badge/Documentation-Live-blue?logo=vercel)](https://mantine-select-async-paginate-docs.vercel.app/)
[![Storybook](https://img.shields.io/badge/Storybook-Live_Demo-FF4785?logo=storybook&logoColor=white)](https://mantine-select-async-paginate-tulsi-prasads-projects.vercel.app/)
[![npm version](https://img.shields.io/npm/v/mantine-select-async-paginate.svg)](https://www.npmjs.com/package/mantine-select-async-paginate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Async paginate select component for [Mantine UI](https://mantine.dev/). A powerful alternative to `react-select-async-paginate` built specifically for Mantine.

> 🚧 **Note**: This package is currently under active development. APIs may change in future versions.

## 📚 [Documentation](https://mantine-select-async-paginate-docs.vercel.app/) | 📖 [Storybook](https://mantine-select-async-paginate-tulsi-prasads-projects.vercel.app/)

Explore the component with interactive examples, real API integrations, and comprehensive documentation.

## Features

- 🔄 **Async data loading** with pagination support
- 🔍 **Debounced search** to reduce API calls
- 📜 **Infinite scroll** for seamless data loading
- 💾 **Optional caching** for better performance
- 🎨 **Full Mantine theming** support
- 📱 **Responsive** and accessible
- 🔒 **TypeScript** support out of the box
- ⚡ **Lightweight** with minimal dependencies
- ✅ **Visual selection indicators** with checkmarks
- 🎯 **Smart dropdown organization** - selected items appear at top
- 🚀 **Multi-select support** with dedicated component

## Installation

```bash
npm install mantine-select-async-paginate
# or
yarn add mantine-select-async-paginate
# or
pnpm add mantine-select-async-paginate
```

## Development

### Project Setup

This project uses pnpm workspaces with the following structure:
- Root package: The main library (`mantine-select-async-paginate`)
- `docs/`: Next.js documentation site

### Running Locally

```bash
# Clone the repository
git clone https://github.com/heytulsiprasad/mantine-select-async-paginate.git
cd mantine-select-async-paginate

# Install dependencies (using pnpm)
pnpm install

# Build the library
pnpm build

# Run documentation site (port 3003)
cd docs && pnpm dev

# Or run Storybook
pnpm storybook
```

### Storybook Features

Visit the [live Storybook](https://mantine-select-async-paginate-tulsi-prasads-projects.vercel.app/) to explore:

- 📚 **Real API Examples** - Integration with popular APIs:
  - JSONPlaceholder (Users)
  - Rick & Morty API (Characters with pagination)
  - PokéAPI (Pokémon)
  - REST Countries API
  - Open Library (Book search)
  - GitHub API (Repository search)
- 🎮 **Interactive Playground** - Test all configurations in real-time
- 📖 **Comprehensive Documentation** - Detailed guides and API reference
- 🎨 **Use Case Examples** - Various implementation patterns
- 🔍 **Live Code** - View source code for each example

## Requirements

- React 18+
- Mantine 7.0+ or 8.0+
- Your app must be wrapped with `MantineProvider`

## Basic Usage

```tsx
import { AsyncPaginateSelect } from 'mantine-select-async-paginate';

function MyComponent() {
  const [value, setValue] = useState<string | null>(null);

  const loadOptions = async (search, loadedOptions, additional) => {
    const response = await fetch(
      `/api/search?q=${search}&page=${additional?.page || 1}`
    );
    const data = await response.json();

    return {
      options: data.items.map(item => ({
        value: item.id.toString(),
        label: item.name,
      })),
      hasMore: data.hasMore,
      additional: { page: (additional?.page || 1) + 1 },
    };
  };

  return (
    <AsyncPaginateSelect
      value={value}
      onChange={setValue}
      loadOptions={loadOptions}
      placeholder="Search..."
    />
  );
}
```

## API Reference

### Props

The component accepts all props from Mantine's `Select` component, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadOptions` | `(search: string, loadedOptions: ComboboxItem[], additional?: any) => Promise<LoadOptionsResult>` | Required | Function to load options asynchronously |
| `defaultOptions` | `boolean \| ComboboxItem[]` | `false` | Initial options to display or whether to load initial options |
| `cacheOptions` | `boolean` | `false` | Whether to cache loaded options |
| `debounceTimeout` | `number` | `300` | Debounce timeout in milliseconds |
| `loadingMessage` | `string` | `"Loading..."` | Message to display while loading |
| `noOptionsMessage` | `string` | `"No options"` | Message when no options are found |
| `loadMoreText` | `string` | `"Load more..."` | Text for the load more option |
| `minSearchLength` | `number` | `0` | Minimum search length to trigger loading |
| `additional` | `any` | `undefined` | Additional data to pass to loadOptions |
| `multiple` | `boolean` | `false` | Enable multi-select mode (AsyncPaginateSelect only) |
| `maxSelectedValues` | `number` | `undefined` | Maximum number of values that can be selected |
| `excludeSelected` | `boolean` | `true` | Whether to exclude selected options from dropdown |

### LoadOptionsResult

The `loadOptions` function should return a promise that resolves to:

```typescript
interface LoadOptionsResult<Additional = any> {
  options: ComboboxItem[];  // Array of options
  hasMore: boolean;         // Whether there are more options to load
  additional?: Additional;  // Additional data for pagination
}
```

### ComboboxItem

```typescript
interface ComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Multi-Select Support

The package includes dedicated multi-select support with two approaches:

### Using AsyncPaginateMultiSelect Component

```tsx
import { AsyncPaginateMultiSelect } from 'mantine-select-async-paginate';

function MyMultiSelect() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <AsyncPaginateMultiSelect
      value={values}
      onChange={setValues}
      loadOptions={loadOptions}
      placeholder="Select multiple items..."
      maxSelectedValues={5}
      excludeSelected={true} // Hide selected items from dropdown
    />
  );
}
```

### Using AsyncPaginateSelect with multiple prop

```tsx
<AsyncPaginateSelect
  multiple={true}
  value={values}
  onChange={setValues}
  loadOptions={loadOptions}
  placeholder="Select multiple items..."
/>
```

### Enhanced UX Features

- **Selected items at top**: Selected options automatically appear at the top of the dropdown for easy access
- **Visual indicators**: Selected items show a checkmark (✓) to indicate selection state
- **Click to deselect**: Simply click on a selected item in the dropdown to remove it
- **Exclude selected**: Option to hide already selected items from the dropdown

## Advanced Examples

### With Default Options

```tsx
<AsyncPaginateSelect
  loadOptions={loadOptions}
  defaultOptions={true} // Load initial options on mount
  // or
  defaultOptions={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
/>
```

### With Caching

```tsx
<AsyncPaginateSelect
  loadOptions={loadOptions}
  cacheOptions={true} // Cache loaded options
  debounceTimeout={500} // Custom debounce timeout
/>
```

### With Custom Messages

```tsx
<AsyncPaginateSelect
  loadOptions={loadOptions}
  loadingMessage="Searching..."
  noOptionsMessage="No results found"
  loadMoreText="Show more results..."
/>
```

### With Minimum Search Length

```tsx
<AsyncPaginateSelect
  loadOptions={loadOptions}
  minSearchLength={3} // Only search after 3 characters
  placeholder="Type at least 3 characters..."
/>
```

### Real-world Example: GitHub Repository Search

```tsx
const loadGithubRepos = async (search, loadedOptions, additional) => {
  const page = additional?.page || 1;
  
  if (!search) {
    return { options: [], hasMore: false };
  }

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${search}&page=${page}&per_page=20`
  );
  const data = await response.json();

  return {
    options: data.items.map(repo => ({
      value: repo.id.toString(),
      label: repo.full_name,
    })),
    hasMore: data.total_count > page * 20,
    additional: { page: page + 1 },
  };
};

<AsyncPaginateSelect
  label="Search GitHub repositories"
  placeholder="Type to search..."
  loadOptions={loadGithubRepos}
  minSearchLength={2}
  clearable
/>
```

## TypeScript

The component is fully typed. You can import types:

```typescript
import { 
  AsyncPaginateSelect,
  AsyncPaginateSelectProps,
  LoadOptionsFunction,
  LoadOptionsResult 
} from 'mantine-select-async-paginate';

// With generic for additional data
const loadOptions: LoadOptionsFunction<{ page: number }> = async (
  search,
  loadedOptions,
  additional
) => {
  // additional is typed as { page: number } | undefined
  const page = additional?.page || 1;
  // ...
};
```

## Migration from react-select-async-paginate

If you're migrating from `react-select-async-paginate`:

1. The `loadOptions` function signature is the same
2. Replace `AsyncPaginate` with `AsyncPaginateSelect`
3. Update props to match Mantine's Select API:
   - `isMulti` → Use Mantine's `MultiSelect` component instead
   - `isClearable` → `clearable`
   - `isDisabled` → `disabled`
   - `isLoading` → Handled automatically
   - `menuIsOpen` → Use `dropdownOpened` with controlled state

## Deployment

The Storybook is automatically deployed to Vercel on every push to the main branch. Preview deployments are created for pull requests.

### Setting up your own deployment

1. Fork this repository
2. Sign up for [Vercel](https://vercel.com)
3. Import your forked repository
4. The deployment will use the `vercel.json` configuration automatically

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### MantineProvider Error

If you see the error: `@mantine/core: MantineProvider was not found in component tree`, ensure:

1. Your app is wrapped with `MantineProvider`:
   ```tsx
   import { MantineProvider } from '@mantine/core';

   function App() {
     return (
       <MantineProvider>
         {/* Your app components */}
       </MantineProvider>
     );
   }
   ```

2. You have consistent versions of `@mantine/*` packages. Check with:
   ```bash
   npm list @mantine/core @mantine/hooks
   ```

3. If using a monorepo, ensure all packages use the same Mantine version.

## Changelog

### v0.2.0 (Latest)
- ✅ Added visual selection indicators with checkmarks
- ✅ Selected items now appear at the top of dropdown
- ✅ Click-to-deselect functionality in dropdown
- ✅ Improved multi-select UX with `AsyncPaginateMultiSelect` component
- ✅ Added `maxSelectedValues` prop to limit selections
- ✅ Added `excludeSelected` prop to hide selected items from dropdown
- 🔧 Configured pnpm workspace for better development experience
- 🔧 Fixed Next.js compatibility with transpilePackages

## Roadmap

- [ ] Add more customization options
- [ ] Support for custom option components
- [ ] Add virtualization for large datasets
- [ ] Improve accessibility features
- [ ] Add more examples and use cases

## License

MIT © [heytulsiprasad](https://github.com/heytulsiprasad)

## Credits

Inspired by [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate), built for [Mantine UI](https://mantine.dev/).

---

<p align="center">
  Made with ❤️ for the Mantine community
</p>