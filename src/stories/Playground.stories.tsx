import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Container, Stack, Text, Code, Paper, JsonInput, NumberInput, Switch, Group } from '@mantine/core';
import { AsyncPaginateSelect } from '../AsyncPaginateSelect';

const meta = {
  title: 'Components/AsyncPaginateSelect/Playground',
  component: AsyncPaginateSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Interactive playground to test different configurations',
      },
    },
  },
} satisfies Meta<typeof AsyncPaginateSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InteractivePlayground: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [apiUrl, setApiUrl] = useState('https://rickandmortyapi.com/api/character');
    const [debounceTimeout, setDebounceTimeout] = useState(300);
    const [minSearchLength, setMinSearchLength] = useState(0);
    const [cacheOptions, setCacheOptions] = useState(true);
    const [defaultOptions, setDefaultOptions] = useState(true);
    const [clearable, setClearable] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [withAsterisk, setWithAsterisk] = useState(false);
    const [error, setError] = useState('');
    
    const loadOptions = async (search: string, loadedOptions: any[], additional?: any) => {
      const page = additional?.page || 1;
      
      try {
        let url = apiUrl;
        
        // Handle different API patterns
        if (apiUrl.includes('rickandmortyapi.com')) {
          url = `${apiUrl}?page=${page}${search ? `&name=${search}` : ''}`;
        } else if (apiUrl.includes('pokeapi.co')) {
          const offset = (page - 1) * 20;
          url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
        } else if (apiUrl.includes('jsonplaceholder')) {
          url = 'https://jsonplaceholder.typicode.com/users';
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        let options = [];
        let hasMore = false;
        
        // Parse different API responses
        if (apiUrl.includes('rickandmortyapi.com') && data.results) {
          options = data.results.map((item: any) => ({
            value: item.id.toString(),
            label: item.name,
          }));
          hasMore = data.info.next !== null;
        } else if (apiUrl.includes('pokeapi.co') && data.results) {
          options = data.results.map((item: any, index: number) => ({
            value: ((page - 1) * 20 + index + 1).toString(),
            label: item.name,
          }));
          hasMore = data.next !== null;
        } else if (Array.isArray(data)) {
          // For APIs that return arrays
          const start = (page - 1) * 10;
          options = data.slice(start, start + 10).map((item: any) => ({
            value: item.id?.toString() || item.name,
            label: item.name || item.title || item.username || 'Unknown',
          }));
          hasMore = start + 10 < data.length;
        }
        
        // Filter by search if needed
        if (search && !apiUrl.includes('rickandmortyapi.com')) {
          options = options.filter((opt: any) =>
            opt.label.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        return {
          options,
          hasMore,
          additional: { page: page + 1 },
        };
      } catch (error) {
        console.error('Error loading options:', error);
        return { options: [], hasMore: false };
      }
    };
    
    return (
      <Container size="lg">
        <Stack gap="xl">
          <Paper shadow="sm" p="lg" withBorder>
            <Stack gap="md">
              <Text size="lg" fw={500}>Component Preview</Text>
              <AsyncPaginateSelect
                value={value}
                onChange={setValue}
                loadOptions={loadOptions}
                label="Async Paginate Select"
                placeholder="Search..."
                description="This is a live preview with your settings"
                debounceTimeout={debounceTimeout}
                minSearchLength={minSearchLength}
                cacheOptions={cacheOptions}
                defaultOptions={defaultOptions}
                clearable={clearable}
                disabled={disabled}
                withAsterisk={withAsterisk}
                error={error}
                loadingMessage="Loading options..."
                noOptionsMessage="No options found"
                loadMoreText="Load more..."
              />
              {value && (
                <Paper p="sm" withBorder>
                  <Text size="sm">
                    Selected value: <Code>{value}</Code>
                  </Text>
                </Paper>
              )}
            </Stack>
          </Paper>
          
          <Paper shadow="sm" p="lg" withBorder>
            <Stack gap="md">
              <Text size="lg" fw={500}>Configuration</Text>
              
              <JsonInput
                label="API URL"
                description="Enter a valid API endpoint (Rick and Morty, PokeAPI, or JSONPlaceholder)"
                value={apiUrl}
                onChange={(value) => setApiUrl(value)}
                autosize
                minRows={1}
              />
              
              <Group grow>
                <NumberInput
                  label="Debounce Timeout"
                  description="Milliseconds to wait before searching"
                  value={debounceTimeout}
                  onChange={(val) => setDebounceTimeout(Number(val))}
                  min={0}
                  max={2000}
                  step={100}
                />
                
                <NumberInput
                  label="Min Search Length"
                  description="Minimum characters to trigger search"
                  value={minSearchLength}
                  onChange={(val) => setMinSearchLength(Number(val))}
                  min={0}
                  max={10}
                />
              </Group>
              
              <Group>
                <Switch
                  label="Cache Options"
                  checked={cacheOptions}
                  onChange={(event) => setCacheOptions(event.currentTarget.checked)}
                />
                
                <Switch
                  label="Default Options"
                  checked={defaultOptions}
                  onChange={(event) => setDefaultOptions(event.currentTarget.checked)}
                />
                
                <Switch
                  label="Clearable"
                  checked={clearable}
                  onChange={(event) => setClearable(event.currentTarget.checked)}
                />
                
                <Switch
                  label="Disabled"
                  checked={disabled}
                  onChange={(event) => setDisabled(event.currentTarget.checked)}
                />
                
                <Switch
                  label="With Asterisk"
                  checked={withAsterisk}
                  onChange={(event) => setWithAsterisk(event.currentTarget.checked)}
                />
              </Group>
              
              <JsonInput
                label="Error Message"
                description="Set an error message to display"
                placeholder="Leave empty for no error"
                value={error}
                onChange={(value) => setError(value)}
                autosize
                minRows={1}
              />
            </Stack>
          </Paper>
          
          <Paper shadow="sm" p="lg" withBorder>
            <Stack gap="md">
              <Text size="lg" fw={500}>Supported APIs</Text>
              <Stack gap="xs">
                <Group>
                  <Code>https://rickandmortyapi.com/api/character</Code>
                  <Text size="sm" c="dimmed">- Rick and Morty characters</Text>
                </Group>
                <Group>
                  <Code>https://pokeapi.co/api/v2/pokemon</Code>
                  <Text size="sm" c="dimmed">- Pokémon list</Text>
                </Group>
                <Group>
                  <Code>https://jsonplaceholder.typicode.com/users</Code>
                  <Text size="sm" c="dimmed">- Sample users</Text>
                </Group>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    );
  },
};