'use client';

import { useState } from 'react';
import { Stack, Title, Text, Paper, Group, Code, Alert } from '@mantine/core';
import { IconCode, IconInfoCircle } from '@tabler/icons-react';
import { AsyncPaginateSelect, AsyncPaginateMultiSelect, LoadOptionsResult } from 'mantine-select-async-paginate';

// Mock data generator for basic examples
const generateMockData = (search: string, page: number, pageSize = 10) => {
  const allData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Option ${i + 1}${search ? ` matching "${search}"` : ''}`,
  }));

  const filtered = search
    ? allData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : allData;

  const start = page * pageSize;
  const end = start + pageSize;
  const data = filtered.slice(start, end);

  return {
    data,
    total: filtered.length,
    hasMore: end < filtered.length,
  };
};

export function BasicExamples() {
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [multipleMode, setMultipleMode] = useState<string[]>([]);

  // Basic load options function
  const loadOptions = async (
    search: string,
    loadedOptions: any[],
    additional?: { page: number }
  ): Promise<LoadOptionsResult<{ page: number }>> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const currentPage = additional?.page || 0;
    const response = generateMockData(search, currentPage);

    return {
      options: response.data.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      })),
      hasMore: response.hasMore,
      additional: { page: currentPage + 1 },
    };
  };

  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="md">Basic Examples</Title>
        <Text c="dimmed" mb="xl">
          Start with these fundamental examples to understand how AsyncPaginateSelect works with mock data.
        </Text>
      </div>

      {/* Single Select Example */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={3}>Single Select</Title>
            <IconCode size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Basic single-select with pagination, search, and caching.
          </Text>

          <AsyncPaginateSelect
            label="Select an option"
            placeholder="Search options..."
            value={singleValue}
            onChange={setSingleValue}
            loadOptions={loadOptions}
            defaultOptions
            cacheOptions
            clearable
            description="Type to search or scroll to load more options"
          />

          {singleValue && (
            <Alert icon={<IconInfoCircle size="1rem" />} color="green" variant="light">
              Selected value: <Code>{singleValue}</Code>
            </Alert>
          )}

          <Code block>{`import { AsyncPaginateSelect } from 'mantine-select-async-paginate';

const loadOptions = async (search, loadedOptions, additional) => {
  const response = await fetch(\`/api/options?search=\${search}&page=\${additional?.page || 0}\`);
  const data = await response.json();
  
  return {
    options: data.items.map(item => ({
      value: item.id,
      label: item.name
    })),
    hasMore: data.hasMore,
    additional: { page: (additional?.page || 0) + 1 }
  };
};

<AsyncPaginateSelect
  value={value}
  onChange={setValue}
  loadOptions={loadOptions}
  defaultOptions
  cacheOptions
  clearable
/>`}</Code>
        </Stack>
      </Paper>

      {/* Multi Select Dedicated Component */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={3}>Multi-Select (Dedicated Component)</Title>
            <IconCode size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Use AsyncPaginateMultiSelect for dedicated multi-selection functionality.
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
            description="Select up to 5 options. Selected items are excluded from dropdown."
          />

          {multiValue.length > 0 && (
            <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light">
              Selected values ({multiValue.length}): <Code>{multiValue.join(', ')}</Code>
            </Alert>
          )}

          <Code block>{`import { AsyncPaginateMultiSelect } from 'mantine-select-async-paginate';

<AsyncPaginateMultiSelect
  value={selectedValues}
  onChange={setSelectedValues}
  loadOptions={loadOptions}
  maxSelectedValues={5}
  excludeSelected={true}
  defaultOptions
  cacheOptions
/>`}</Code>
        </Stack>
      </Paper>

      {/* Single Component Multi Mode */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={3}>Multi-Select (Single Component)</Title>
            <IconCode size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Use the multiple prop on AsyncPaginateSelect for multi-selection mode.
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
            description="Using the multiple prop to enable multi-selection"
          />

          {multipleMode.length > 0 && (
            <Alert icon={<IconInfoCircle size="1rem" />} color="violet" variant="light">
              Selected values ({multipleMode.length}): <Code>{multipleMode.join(', ')}</Code>
            </Alert>
          )}

          <Code block>{`import { AsyncPaginateSelect } from 'mantine-select-async-paginate';

<AsyncPaginateSelect
  multiple={true}
  value={selectedValues}
  onChange={setSelectedValues}
  loadOptions={loadOptions}
  maxSelectedValues={4}
  excludeSelected={true}
/>`}</Code>
        </Stack>
      </Paper>

      {/* Key Features */}
      <Paper shadow="sm" p="lg" withBorder>
        <Title order={3} mb="md">Key Features Demonstrated</Title>
        <Stack gap="sm">
          <Text><strong>Pagination:</strong> Automatically loads more data when scrolling to bottom</Text>
          <Text><strong>Search:</strong> Debounced search with 300ms delay</Text>
          <Text><strong>Caching:</strong> Results are cached to avoid unnecessary API calls</Text>
          <Text><strong>Loading States:</strong> Built-in loading indicators</Text>
          <Text><strong>Error Handling:</strong> Graceful error handling with user feedback</Text>
          <Text><strong>TypeScript:</strong> Full TypeScript support with proper typing</Text>
          <Text><strong>Customization:</strong> Extensive prop support for customization</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}