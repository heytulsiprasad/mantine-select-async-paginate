'use client';

import { Container, Title, Text, Paper, Stack, Code, Badge, Table, Tabs, Alert, List } from '@mantine/core';
import { IconCode, IconInfoCircle, IconBox, IconFunction, IconSettings } from '@tabler/icons-react';

export default function ApiReferencePage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title order={1} mb="md">API Reference</Title>
          <Text size="lg" c="dimmed" mb="md">
            Complete reference for all components, props, types, and configuration options
            in mantine-select-async-paginate.
          </Text>
        </div>

        {/* Components */}
        <Tabs defaultValue="select" variant="outline">
          <Tabs.List grow>
            <Tabs.Tab value="select" leftSection={<IconBox size="1rem" />}>
              AsyncPaginateSelect
            </Tabs.Tab>
            <Tabs.Tab value="multiselect" leftSection={<IconBox size="1rem" />}>
              AsyncPaginateMultiSelect
            </Tabs.Tab>
            <Tabs.Tab value="types" leftSection={<IconCode size="1rem" />}>
              Types
            </Tabs.Tab>
            <Tabs.Tab value="hooks" leftSection={<IconFunction size="1rem" />}>
              Hooks
            </Tabs.Tab>
          </Tabs.List>

          {/* AsyncPaginateSelect Tab */}
          <Tabs.Panel value="select" pt="xl">
            <Stack gap="xl">
              <Paper shadow="sm" p="lg" withBorder>
                <Title order={2} mb="md">AsyncPaginateSelect</Title>
                <Text c="dimmed" mb="md">
                  The main component for single-select async pagination. Supports both single and multi-select modes via the `multiple` prop.
                </Text>
                
                <Code block>{`import { AsyncPaginateSelect } from 'mantine-select-async-paginate';

<AsyncPaginateSelect
  loadOptions={loadOptions}
  value={value}
  onChange={setValue}
  // ... other props
/>`}</Code>
              </Paper>

              <Paper shadow="sm" p="lg" withBorder>
                <Title order={3} mb="md">Props</Title>
                
                <div style={{ overflowX: 'auto' }}>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Prop</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Default</Table.Th>
                        <Table.Th>Description</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td>
                          <Code>loadOptions</Code>
                          <Badge size="xs" color="red" ml="xs">required</Badge>
                        </Table.Td>
                        <Table.Td><Code>LoadOptionsFunction</Code></Table.Td>
                        <Table.Td>-</Table.Td>
                        <Table.Td>Function to load options asynchronously</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>value</Code></Table.Td>
                        <Table.Td><Code>string | null | string[]</Code></Table.Td>
                        <Table.Td><Code>null</Code></Table.Td>
                        <Table.Td>Current selected value(s)</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>onChange</Code></Table.Td>
                        <Table.Td><Code>Function</Code></Table.Td>
                        <Table.Td>-</Table.Td>
                        <Table.Td>Callback when value changes</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>multiple</Code></Table.Td>
                        <Table.Td><Code>boolean</Code></Table.Td>
                        <Table.Td><Code>false</Code></Table.Td>
                        <Table.Td>Enable multi-select mode</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>defaultOptions</Code></Table.Td>
                        <Table.Td><Code>boolean | ComboboxItem[]</Code></Table.Td>
                        <Table.Td><Code>false</Code></Table.Td>
                        <Table.Td>Load options on mount or provide default options</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>cacheOptions</Code></Table.Td>
                        <Table.Td><Code>boolean</Code></Table.Td>
                        <Table.Td><Code>false</Code></Table.Td>
                        <Table.Td>Cache loaded options</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>debounceTimeout</Code></Table.Td>
                        <Table.Td><Code>number</Code></Table.Td>
                        <Table.Td><Code>300</Code></Table.Td>
                        <Table.Td>Debounce timeout in milliseconds</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>minSearchLength</Code></Table.Td>
                        <Table.Td><Code>number</Code></Table.Td>
                        <Table.Td><Code>0</Code></Table.Td>
                        <Table.Td>Minimum characters to trigger search</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>maxSelectedValues</Code></Table.Td>
                        <Table.Td><Code>number</Code></Table.Td>
                        <Table.Td>-</Table.Td>
                        <Table.Td>Maximum selections allowed (multi-select only)</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>excludeSelected</Code></Table.Td>
                        <Table.Td><Code>boolean</Code></Table.Td>
                        <Table.Td><Code>true</Code></Table.Td>
                        <Table.Td>Hide selected options from dropdown (multi-select only)</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>loadingMessage</Code></Table.Td>
                        <Table.Td><Code>string</Code></Table.Td>
                        <Table.Td><Code>&quot;Loading...&quot;</Code></Table.Td>
                        <Table.Td>Message shown while loading</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>noOptionsMessage</Code></Table.Td>
                        <Table.Td><Code>string</Code></Table.Td>
                        <Table.Td><Code>&quot;No options&quot;</Code></Table.Td>
                        <Table.Td>Message shown when no options found</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>loadMoreText</Code></Table.Td>
                        <Table.Td><Code>string</Code></Table.Td>
                        <Table.Td><Code>&quot;Load more...&quot;</Code></Table.Td>
                        <Table.Td>Text for load more button</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>onLoadMore</Code></Table.Td>
                        <Table.Td><Code>{`() => void`}</Code></Table.Td>
                        <Table.Td>-</Table.Td>
                        <Table.Td>Callback when load more is triggered</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>renderOption</Code></Table.Td>
                        <Table.Td><Code>Function</Code></Table.Td>
                        <Table.Td>-</Table.Td>
                        <Table.Td>Custom option renderer</Table.Td>
                      </Table.Tr>
                      
                      <Table.Tr>
                        <Table.Td><Code>additional</Code></Table.Td>
                        <Table.Td><Code>any</Code></Table.Td>
                        <Table.Td>-</Table.Td>
                        <Table.Td>Additional data passed to loadOptions</Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </div>

                <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light" mt="md">
                  All standard Mantine Select props are also supported (label, placeholder, error, disabled, etc.)
                </Alert>
              </Paper>
            </Stack>
          </Tabs.Panel>

          {/* AsyncPaginateMultiSelect Tab */}
          <Tabs.Panel value="multiselect" pt="xl">
            <Stack gap="xl">
              <Paper shadow="sm" p="lg" withBorder>
                <Title order={2} mb="md">AsyncPaginateMultiSelect</Title>
                <Text c="dimmed" mb="md">
                  Dedicated component for multi-select async pagination with enhanced features.
                </Text>
                
                <Code block>{`import { AsyncPaginateMultiSelect } from 'mantine-select-async-paginate';

<AsyncPaginateMultiSelect
  loadOptions={loadOptions}
  value={values}
  onChange={setValues}
  maxSelectedValues={5}
  excludeSelected={true}
  // ... other props
/>`}</Code>
              </Paper>

              <Paper shadow="sm" p="lg" withBorder>
                <Title order={3} mb="md">Props</Title>
                <Text c="dimmed" mb="md">
                  AsyncPaginateMultiSelect supports all the same props as AsyncPaginateSelect (except `multiple`), 
                  with these differences:
                </Text>
                
                <List spacing="sm">
                  <List.Item>
                    <Code>value</Code> is always <Code>string[]</Code>
                  </List.Item>
                  <List.Item>
                    <Code>onChange</Code> receives <Code>(values: string[]) =&gt; void</Code>
                  </List.Item>
                  <List.Item>
                    <Code>maxSelectedValues</Code> and <Code>excludeSelected</Code> are commonly used
                  </List.Item>
                  <List.Item>
                    All Mantine MultiSelect props are supported
                  </List.Item>
                </List>
              </Paper>
            </Stack>
          </Tabs.Panel>

          {/* Types Tab */}
          <Tabs.Panel value="types" pt="xl">
            <Stack gap="xl">
              <Paper shadow="sm" p="lg" withBorder>
                <Title order={2} mb="md">Type Definitions</Title>
                
                <Stack gap="md">
                  <div>
                    <Title order={3} mb="sm">LoadOptionsFunction</Title>
                    <Code block>{`type LoadOptionsFunction<Additional = any> = (
  search: string,
  loadedOptions: ComboboxItem[],
  additional?: Additional
) => Promise<LoadOptionsResult<Additional>>;`}</Code>
                  </div>

                  <div>
                    <Title order={3} mb="sm">LoadOptionsResult</Title>
                    <Code block>{`interface LoadOptionsResult<Additional = any> {
  options: ComboboxItem[];
  hasMore: boolean;
  additional?: Additional;
}`}</Code>
                  </div>

                  <div>
                    <Title order={3} mb="sm">ComboboxItem</Title>
                    <Code block>{`interface ComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  description?: string;
  data?: any; // Custom data for renderOption
}`}</Code>
                  </div>

                  <div>
                    <Title order={3} mb="sm">AsyncPaginateSelectProps</Title>
                    <Code block>{`type AsyncPaginateSelectProps<Additional = any> = 
  | SingleSelectProps<Additional> 
  | MultiSelectProps<Additional>;

// Single select mode
interface SingleSelectProps extends BaseProps {
  multiple?: false;
  value?: string | null;
  onChange?: (value: string | null, option: ComboboxItem | null) => void;
}

// Multi select mode
interface MultiSelectProps extends BaseProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}`}</Code>
                  </div>
                </Stack>
              </Paper>

              <Paper shadow="sm" p="lg" withBorder>
                <Title order={2} mb="md">Generic Types</Title>
                <Text c="dimmed" mb="md">
                  The components support TypeScript generics for the `additional` parameter:
                </Text>
                
                <Code block>{`// Define your additional data type
interface MyAdditional {
  page: number;
  filters: string[];
  sortBy: string;
}

// Use with the component
<AsyncPaginateSelect<MyAdditional>
  loadOptions={async (search, loaded, additional) => {
    // additional is typed as MyAdditional | undefined
    const page = additional?.page || 1;
    // ...
  }}
  additional={{ page: 1, filters: [], sortBy: 'name' }}
/>`}</Code>
              </Paper>
            </Stack>
          </Tabs.Panel>

          {/* Hooks Tab */}
          <Tabs.Panel value="hooks" pt="xl">
            <Stack gap="xl">
              <Paper shadow="sm" p="lg" withBorder>
                <Title order={2} mb="md">useAsyncOptions Hook</Title>
                <Text c="dimmed" mb="md">
                  Low-level hook for implementing custom async select components. 
                  This hook is used internally by AsyncPaginateSelect.
                </Text>
                
                <Code block>{`import { useAsyncOptions } from 'mantine-select-async-paginate';

const {
  options,      // Current loaded options
  loading,      // Loading state
  error,        // Error state
  hasMore,      // Whether more data is available
  loadMore,     // Function to load more options
  handleSearch, // Function to handle search
} = useAsyncOptions({
  loadOptions,
  defaultOptions,
  cacheOptions,
  debounceTimeout,
  additional,
  minSearchLength,
});`}</Code>
              </Paper>

              <Paper shadow="sm" p="lg" withBorder>
                <Title order={3} mb="md">Hook Parameters</Title>
                
                <div style={{ overflowX: 'auto' }}>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Parameter</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Description</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td><Code>loadOptions</Code></Table.Td>
                        <Table.Td><Code>LoadOptionsFunction</Code></Table.Td>
                        <Table.Td>Function to load options</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td><Code>defaultOptions</Code></Table.Td>
                        <Table.Td><Code>boolean | ComboboxItem[]</Code></Table.Td>
                        <Table.Td>Initial options</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td><Code>cacheOptions</Code></Table.Td>
                        <Table.Td><Code>boolean</Code></Table.Td>
                        <Table.Td>Enable caching</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td><Code>debounceTimeout</Code></Table.Td>
                        <Table.Td><Code>number</Code></Table.Td>
                        <Table.Td>Debounce delay</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td><Code>additional</Code></Table.Td>
                        <Table.Td><Code>any</Code></Table.Td>
                        <Table.Td>Additional data</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td><Code>minSearchLength</Code></Table.Td>
                        <Table.Td><Code>number</Code></Table.Td>
                        <Table.Td>Min search length</Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </div>
              </Paper>

              <Paper shadow="sm" p="lg" withBorder>
                <Title order={3} mb="md">Custom Component Example</Title>
                <Code block>{`function CustomAsyncSelect() {
  const {
    options,
    loading,
    hasMore,
    loadMore,
    handleSearch,
  } = useAsyncOptions({
    loadOptions: myLoadFunction,
    defaultOptions: true,
    cacheOptions: true,
  });

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {loading && <span>Loading...</span>}
      <ul>
        {options.map(option => (
          <li key={option.value}>{option.label}</li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}`}</Code>
              </Paper>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        {/* Common Patterns */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Common Patterns</Title>
          
          <Stack gap="md">
            <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light">
              <Text fw={500}>Error Handling</Text>
              <Code block mt="xs">{`const loadOptions = async (search, loadedOptions, additional) => {
  try {
    const response = await fetch(\`/api/search?q=\${search}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    return {
      options: data.items.map(item => ({
        value: item.id,
        label: item.name
      })),
      hasMore: data.hasMore
    };
  } catch (error) {
    console.error('Error loading options:', error);
    return { options: [], hasMore: false };
  }
};`}</Code>
            </Alert>

            <Alert icon={<IconSettings size="1rem" />} color="green" variant="light">
              <Text fw={500}>Custom Render Option</Text>
              <Code block mt="xs">{`const renderOption = ({ option, ...others }) => (
  <div {...others} style={{ padding: '8px 12px' }}>
    <div style={{ fontWeight: 500 }}>{option.label}</div>
    {option.description && (
      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        {option.description}
      </div>
    )}
  </div>
);

<AsyncPaginateSelect
  renderOption={renderOption}
  loadOptions={loadOptions}
/>`}</Code>
            </Alert>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}