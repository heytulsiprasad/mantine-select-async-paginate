import { useState } from 'react';
import { Container, Title, Stack, Text, Code, Paper, Group, Button } from '@mantine/core';
import { AsyncPaginateSelect, LoadOptionsResult } from 'mantine-select-async-paginate';

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
        label: repo.full_name,
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
            <Title order={3}>Features</Title>
            <ul>
              <li>Async data loading with pagination</li>
              <li>Debounced search input</li>
              <li>Infinite scroll support</li>
              <li>Caching for better performance</li>
              <li>Loading states</li>
              <li>Error handling</li>
              <li>TypeScript support</li>
              <li>All Mantine Select props supported</li>
            </ul>
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Usage</Title>
            <Code block>{`import { AsyncPaginateSelect } from 'mantine-select-async-paginate';

const loadOptions = async (search, loadedOptions, additional) => {
  const response = await fetch(\`/api/search?q=\${search}&page=\${additional?.page || 1}\`);
  const data = await response.json();
  
  return {
    options: data.items.map(item => ({
      value: item.id,
      label: item.name
    })),
    hasMore: data.hasMore,
    additional: { page: (additional?.page || 1) + 1 }
  };
};

<AsyncPaginateSelect
  loadOptions={loadOptions}
  defaultOptions
  cacheOptions
/>`}</Code>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default App;