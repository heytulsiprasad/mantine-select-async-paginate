import { useState } from 'react';
import { Container, Title, Stack, Text, Code, Paper, Group, Button } from '@mantine/core';
import { AsyncPaginateSelect, AsyncPaginateMultiSelect, LoadOptionsResult } from 'mantine-select-async-paginate';

// Mock API function
const mockApi = async (
  search: string,
  page: number,
  pageSize: number = 10
): Promise<{ data: Array<{ id: number; name: string }>; total: number }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Generate mock data
  const allData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Option ${i + 1} - ${search || 'default'}`,
  }));

  // Filter by search
  const filtered = search
    ? allData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : allData;

  // Paginate
  const start = page * pageSize;
  const end = start + pageSize;
  const data = filtered.slice(start, end);

  return {
    data,
    total: filtered.length,
  };
};

function App() {
  const [value, setValue] = useState<string | null>(null);
  const [githubValue, setGithubValue] = useState<string | null>(null);
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [multiGithubValue, setMultiGithubValue] = useState<string[]>([]);
  const [multipleMode, setMultipleMode] = useState<string[]>([]);

  // Basic example - load options function
  const loadOptions = async (
    search: string,
    loadedOptions: any[],
    additional?: { page: number }
  ): Promise<LoadOptionsResult<{ page: number }>> => {
    const currentPage = additional?.page || 0;
    const response = await mockApi(search, currentPage);

    return {
      options: response.data.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      })),
      hasMore: (currentPage + 1) * 10 < response.total,
      additional: { page: currentPage + 1 },
    };
  };

  // GitHub repositories example
  const loadGithubRepos = async (
    search: string,
    loadedOptions: any[],
    additional?: { page: number }
  ): Promise<LoadOptionsResult<{ page: number }>> => {
    const currentPage = additional?.page || 1;
    
    if (!search) {
      return { options: [], hasMore: false };
    }

    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}&page=${currentPage}&per_page=10`
    );
    const data = await response.json();

    return {
      options: data.items.map((repo: any) => ({
        value: repo.id.toString(),
        label: `${repo.full_name} (⭐ ${repo.stargazers_count})`,
      })),
      hasMore: data.total_count > currentPage * 10,
      additional: { page: currentPage + 1 },
    };
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1}>Mantine Select Async Paginate</Title>
          <Text c="dimmed" mt="sm">
            Async paginate select component for Mantine UI
          </Text>
        </div>

        <Paper shadow="sm" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Basic Example</Title>
            <AsyncPaginateSelect
              label="Select an option"
              placeholder="Search options..."
              value={value}
              onChange={setValue}
              loadOptions={loadOptions}
              defaultOptions
              cacheOptions
              clearable
            />
            {value && (
              <Text size="sm">
                Selected value: <Code>{value}</Code>
              </Text>
            )}
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>GitHub Repositories Search</Title>
            <Text size="sm" c="dimmed">
              Search for GitHub repositories with pagination
            </Text>
            <AsyncPaginateSelect
              label="Search GitHub repositories"
              placeholder="Type to search..."
              value={githubValue}
              onChange={setGithubValue}
              loadOptions={loadGithubRepos}
              minSearchLength={2}
              clearable
              nothingFoundMessage="Type at least 2 characters to search"
            />
            {githubValue && (
              <Text size="sm">
                Selected repository ID: <Code>{githubValue}</Code>
              </Text>
            )}
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Multi-Select Basic Example</Title>
            <Text size="sm" c="dimmed">
              Select multiple options with pagination
            </Text>
            <AsyncPaginateMultiSelect
              label="Select multiple options"
              placeholder="Search and select multiple..."
              value={multiValue}
              onChange={setMultiValue}
              loadOptions={loadOptions}
              defaultOptions
              cacheOptions
              clearable
              maxSelectedValues={5}
              excludeSelected={true}
            />
            {multiValue.length > 0 && (
              <Text size="sm">
                Selected values ({multiValue.length}): <Code>{multiValue.join(', ')}</Code>
              </Text>
            )}
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Multi-Select GitHub Repositories</Title>
            <Text size="sm" c="dimmed">
              Select multiple GitHub repositories
            </Text>
            <AsyncPaginateMultiSelect
              label="Select multiple repositories"
              placeholder="Search and select multiple repositories..."
              value={multiGithubValue}
              onChange={setMultiGithubValue}
              loadOptions={loadGithubRepos}
              minSearchLength={2}
              clearable
              maxSelectedValues={3}
              excludeSelected={true}
              onLoadMore={() => console.log('Loading more repositories...')}
            />
            {multiGithubValue.length > 0 && (
              <Text size="sm">
                Selected repositories ({multiGithubValue.length}): <Code>{multiGithubValue.join(', ')}</Code>
              </Text>
            )}
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Single Component with Multiple Prop</Title>
            <Text size="sm" c="dimmed">
              Using the single component with multiple prop
            </Text>
            <AsyncPaginateSelect
              multiple={true}
              label="Multiple mode with single component"
              placeholder="Search and select multiple..."
              value={multipleMode}
              onChange={setMultipleMode}
              loadOptions={loadOptions}
              defaultOptions
              cacheOptions
              clearable
              maxSelectedValues={4}
              excludeSelected={true}
              onLoadMore={() => console.log('Loading more options...')}
            />
            {multipleMode.length > 0 && (
              <Text size="sm">
                Selected values ({multipleMode.length}): <Code>{multipleMode.join(', ')}</Code>
              </Text>
            )}
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Features</Title>
            <ul>
              <li>✅ Async data loading with pagination</li>
              <li>✅ Debounced search input</li>
              <li>✅ Infinite scroll support</li>
              <li>✅ Caching for better performance</li>
              <li>✅ Loading states</li>
              <li>✅ Error handling</li>
              <li>✅ TypeScript support</li>
              <li>✅ All Mantine Select/MultiSelect props supported</li>
              <li>🆕 Multi-select functionality (dedicated component)</li>
              <li>🆕 Multiple prop support on single component</li>
              <li>🆕 Max selected values limit</li>
              <li>🆕 Exclude selected options from dropdown</li>
              <li>🆕 onLoadMore callback</li>
              <li>🆕 Custom option rendering</li>
              <li>🆕 Better TypeScript generics</li>
            </ul>
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Usage</Title>
            <Code block>{`import { 
  AsyncPaginateSelect, 
  AsyncPaginateMultiSelect 
} from 'mantine-select-async-paginate';

// Single Select
<AsyncPaginateSelect
  loadOptions={loadOptions}
  defaultOptions
  cacheOptions
  onLoadMore={() => console.log('Loading more...')}
/>

// Multi Select (dedicated component)
<AsyncPaginateMultiSelect
  value={selectedValues}
  onChange={setSelectedValues}
  loadOptions={loadOptions}
  maxSelectedValues={5}
  excludeSelected={true}
/>

// Multi Select (using multiple prop)
<AsyncPaginateSelect
  multiple={true}
  value={selectedValues}
  onChange={setSelectedValues}
  loadOptions={loadOptions}
  maxSelectedValues={3}
/>`}</Code>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default App;