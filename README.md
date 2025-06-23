# mantine-select-async-paginate

Async paginate select component for [Mantine UI](https://mantine.dev/). A powerful alternative to `react-select-async-paginate` built specifically for Mantine.

## Features

- 🔄 **Async data loading** with pagination support
- 🔍 **Debounced search** to reduce API calls
- 📜 **Infinite scroll** for seamless data loading
- 💾 **Optional caching** for better performance
- 🎨 **Full Mantine theming** support
- 📱 **Responsive** and accessible
- 🔒 **TypeScript** support out of the box
- ⚡ **Lightweight** with minimal dependencies

## Installation

```bash
npm install mantine-select-async-paginate
# or
yarn add mantine-select-async-paginate
# or
pnpm add mantine-select-async-paginate
```

## Requirements

- React 18+
- Mantine 7.0+

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

Inspired by [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate), built for [Mantine UI](https://mantine.dev/).