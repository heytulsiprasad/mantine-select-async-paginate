'use client';

import { useState, useCallback } from 'react';
import { Stack, Title, Text, Paper, Group, Code, Alert, Badge, Switch, NumberInput } from '@mantine/core';
import { IconSettings, IconInfoCircle, IconRocket, IconBolt } from '@tabler/icons-react';
import { AsyncPaginateSelect, AsyncPaginateMultiSelect, LoadOptionsResult } from 'mantine-select-async-paginate';

export function AdvancedExamples() {
  // Advanced configuration states
  const [advancedSingle, setAdvancedSingle] = useState<string | null>(null);
  const [advancedMulti, setAdvancedMulti] = useState<string[]>([]);
  const [customRenderValue, setCustomRenderValue] = useState<string | null>(null);
  
  // Configuration states
  const [debounceTimeout, setDebounceTimeout] = useState(300);
  const [minSearchLength, setMinSearchLength] = useState(2);
  const [cacheOptions, setCacheOptions] = useState(true);
  const [excludeSelected, setExcludeSelected] = useState(true);
  const [maxSelectedValues, setMaxSelectedValues] = useState(5);
  
  // Load more tracking
  const [loadMoreCount, setLoadMoreCount] = useState(0);

  // Advanced load options with custom additional data
  const loadAdvancedOptions = useCallback(async (
    search: string,
    loadedOptions: any[],
    additional?: { 
      page: number; 
      timestamp: number; 
      searchQuery: string;
      totalRequests: number;
    }
  ): Promise<LoadOptionsResult<{ 
    page: number; 
    timestamp: number; 
    searchQuery: string;
    totalRequests: number;
  }>> => {
    const currentPage = additional?.page || 0;
    const currentRequests = (additional?.totalRequests || 0) + 1;
    
    // Simulate more complex API with metadata
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockData = Array.from({ length: 15 }, (_, i) => {
      const id = currentPage * 15 + i + 1;
      return {
        id,
        name: search 
          ? `Advanced Result ${id} for "${search}"` 
          : `Advanced Option ${id}`,
        category: ['Technology', 'Business', 'Design', 'Marketing'][i % 4],
        priority: ['High', 'Medium', 'Low'][i % 3],
        created: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      };
    });

    const filteredData = search 
      ? mockData.filter(item => 
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
        )
      : mockData;

    return {
      options: filteredData.map(item => ({
        value: item.id.toString(),
        label: item.name,
        group: item.category,
        data: item, // Store full data for custom rendering
      })),
      hasMore: currentPage < 8, // Simulate finite data
      additional: { 
        page: currentPage + 1,
        timestamp: Date.now(),
        searchQuery: search,
        totalRequests: currentRequests,
      },
    };
  }, []);

  // JSONPlaceholder posts with custom additional tracking
  const loadJsonPlaceholderPosts = useCallback(async (
    search: string,
    loadedOptions: any[],
    additional?: { start: number; requestCount: number }
  ): Promise<LoadOptionsResult<{ start: number; requestCount: number }>> => {
    const currentStart = additional?.start || 0;
    const requestCount = (additional?.requestCount || 0) + 1;
    const limit = 10;

    try {
      const url = `https://jsonplaceholder.typicode.com/posts?_start=${currentStart}&_limit=${limit}`;
      
      const response = await fetch(url);
      const posts = await response.json();
      
      // Client-side search if search term provided
      const filteredPosts = search 
        ? posts.filter((post: any) => 
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase())
          )
        : posts;

      return {
        options: filteredPosts.map((post: any) => ({
          value: post.id.toString(),
          label: post.title,
          description: post.body.slice(0, 80) + '...',
        })),
        hasMore: posts.length === limit, // If we got full limit, there might be more
        additional: { 
          start: currentStart + limit,
          requestCount,
        },
      };
    } catch (error) {
      console.error('Error loading posts:', error);
      return { options: [], hasMore: false };
    }
  }, []);

  // Custom render option function
  const customRenderOption = useCallback(({ option, ...others }: any) => {
    const data = option.data;
    if (!data) return <div {...others}>{option.label}</div>;
    
    return (
      <div {...others} style={{ padding: '8px 12px' }}>
        <div style={{ fontWeight: 500 }}>{option.label}</div>
        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '2px' }}>
          {data.category} • {data.priority} Priority
        </div>
        <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '2px' }}>
          Created: {new Date(data.created).toLocaleDateString()}
        </div>
      </div>
    );
  }, []);

  // Handle load more callback
  const handleLoadMore = useCallback(() => {
    setLoadMoreCount(prev => prev + 1);
    console.log('Load more triggered!', { count: loadMoreCount + 1 });
  }, [loadMoreCount]);

  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="md">Advanced Features & Configuration</Title>
        <Text c="dimmed" mb="xl">
          Explore advanced features like custom rendering, load more callbacks, 
          configuration options, and complex API integrations.
        </Text>
      </div>

      {/* Configuration Panel */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={3}>Configuration Panel</Title>
            <IconSettings size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Adjust these settings to see how they affect the components below.
          </Text>

          <Group grow>
            <NumberInput
              label="Debounce Timeout (ms)"
              value={debounceTimeout}
              onChange={(value) => setDebounceTimeout(Number(value))}
              min={0}
              max={2000}
              step={100}
            />
            <NumberInput
              label="Min Search Length"
              value={minSearchLength}
              onChange={(value) => setMinSearchLength(Number(value))}
              min={0}
              max={5}
            />
            <NumberInput
              label="Max Selected Values"
              value={maxSelectedValues}
              onChange={(value) => setMaxSelectedValues(Number(value))}
              min={1}
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
              label="Exclude Selected"
              checked={excludeSelected}
              onChange={(event) => setExcludeSelected(event.currentTarget.checked)}
            />
          </Group>

          <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light">
            Load More Triggered: <Badge color="blue">{loadMoreCount} times</Badge>
          </Alert>
        </Stack>
      </Paper>

      {/* Advanced Single Select */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <div>
              <Title order={3}>Advanced Single Select</Title>
              <Group gap="xs" mt={4}>
                <Badge size="sm" color="blue">Custom Additional Data</Badge>
                <Badge size="sm" color="green">Complex Metadata</Badge>
                <Badge size="sm" color="orange">Request Tracking</Badge>
              </Group>
            </div>
            <IconRocket size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Demonstrates advanced loadOptions with complex additional data tracking,
            custom metadata, and request counting.
          </Text>

          <AsyncPaginateSelect
            label="Advanced Configuration Demo"
            placeholder="Search with advanced features..."
            value={advancedSingle}
            onChange={setAdvancedSingle}
            loadOptions={loadAdvancedOptions}
            defaultOptions
            cacheOptions={cacheOptions}
            debounceTimeout={debounceTimeout}
            minSearchLength={minSearchLength}
            clearable
            onLoadMore={handleLoadMore}
            description={`Debounce: ${debounceTimeout}ms | Min search: ${minSearchLength} chars | Cache: ${cacheOptions ? 'ON' : 'OFF'}`}
          />

          {advancedSingle && (
            <Alert icon={<IconInfoCircle size="1rem" />} color="green" variant="light">
              Selected: <Code>{advancedSingle}</Code>
            </Alert>
          )}

          <Code block>{`// Advanced loadOptions with complex additional data
const loadAdvancedOptions = async (search, loadedOptions, additional) => {
  const currentPage = additional?.page || 0;
  const currentRequests = (additional?.totalRequests || 0) + 1;
  
  // Your complex API logic here...
  
  return {
    options: data.map(item => ({
      value: item.id.toString(),
      label: item.name,
      group: item.category,
      data: item // Store full data for custom rendering
    })),
    hasMore: currentPage < maxPages,
    additional: { 
      page: currentPage + 1,
      timestamp: Date.now(),
      searchQuery: search,
      totalRequests: currentRequests
    }
  };
};

<AsyncPaginateSelect
  loadOptions={loadAdvancedOptions}
  debounceTimeout={300}
  minSearchLength={2}
  onLoadMore={() => console.log('Load more!')}
/>`}</Code>
        </Stack>
      </Paper>

      {/* Advanced Multi Select */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <div>
              <Title order={3}>Advanced Multi Select</Title>
              <Group gap="xs" mt={4}>
                <Badge size="sm" color="blue">Dynamic Configuration</Badge>
                <Badge size="sm" color="green">Selection Limits</Badge>
                <Badge size="sm" color="orange">Exclude Selected</Badge>
              </Group>
            </div>
            <IconBolt size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Multi-select with dynamically configurable options. 
            Settings from the configuration panel above are applied here.
          </Text>

          <AsyncPaginateMultiSelect
            label="Dynamic Configuration Multi-Select"
            placeholder="Multi-select with dynamic config..."
            value={advancedMulti}
            onChange={setAdvancedMulti}
            loadOptions={loadAdvancedOptions}
            defaultOptions
            cacheOptions={cacheOptions}
            debounceTimeout={debounceTimeout}
            minSearchLength={minSearchLength}
            maxSelectedValues={maxSelectedValues}
            excludeSelected={excludeSelected}
            clearable
            onLoadMore={handleLoadMore}
            description={`Max selections: ${maxSelectedValues} | Exclude selected: ${excludeSelected ? 'ON' : 'OFF'}`}
          />

          {advancedMulti.length > 0 && (
            <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light">
              Selected ({advancedMulti.length}/{maxSelectedValues}): <Code>{advancedMulti.join(', ')}</Code>
            </Alert>
          )}
        </Stack>
      </Paper>

      {/* Custom Render Option */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <div>
              <Title order={3}>Custom Option Rendering</Title>
              <Group gap="xs" mt={4}>
                <Badge size="sm" color="purple">Custom Render</Badge>
                <Badge size="sm" color="green">Rich Data Display</Badge>
                <Badge size="sm" color="orange">Multi-line Options</Badge>
              </Group>
            </div>
            <IconSettings size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Custom renderOption prop allows you to create rich, multi-line option displays
            with additional metadata and styling.
          </Text>

          <AsyncPaginateSelect
            label="Custom Rendered Options"
            placeholder="See custom option rendering..."
            value={customRenderValue}
            onChange={setCustomRenderValue}
            loadOptions={loadAdvancedOptions}
            renderOption={customRenderOption}
            defaultOptions
            cacheOptions
            clearable
            description="Each option shows category, priority, and creation date"
          />

          {customRenderValue && (
            <Alert icon={<IconInfoCircle size="1rem" />} color="purple" variant="light">
              Selected: <Code>{customRenderValue}</Code>
            </Alert>
          )}

          <Code block>{`// Custom render option function
const customRenderOption = ({ option, ...others }) => {
  const data = option.data;
  if (!data) return <div {...others}>{option.label}</div>;
  
  return (
    <div {...others} style={{ padding: '8px 12px' }}>
      <div style={{ fontWeight: 500 }}>{option.label}</div>
      <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '2px' }}>
        {data.category} • {data.priority} Priority
      </div>
      <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '2px' }}>
        Created: {new Date(data.created).toLocaleDateString()}
      </div>
    </div>
  );
};

<AsyncPaginateSelect
  renderOption={customRenderOption}
  loadOptions={loadOptionsWithFullData}
/>`}</Code>
        </Stack>
      </Paper>

      {/* Real API with JSONPlaceholder */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <div>
              <Title order={3}>JSONPlaceholder Posts</Title>
              <Group gap="xs" mt={4}>
                <Badge size="sm" color="blue">Real API</Badge>
                <Badge size="sm" color="green">Offset/Limit Pagination</Badge>
                <Badge size="sm" color="orange">100 total posts</Badge>
              </Group>
            </div>
            <IconRocket size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Real API integration with JSONPlaceholder showing blog posts.
            Uses offset/limit pagination with client-side search.
          </Text>

          <AsyncPaginateSelect
            label="JSONPlaceholder Posts"
            placeholder="Search blog posts..."
            value={null}
            onChange={() => {}}
            loadOptions={loadJsonPlaceholderPosts}
            defaultOptions
            cacheOptions
            clearable
            onLoadMore={handleLoadMore}
            description="Real blog post data from JSONPlaceholder API"
          />

          <Code block>{`// JSONPlaceholder with offset/limit pagination
const loadJsonPlaceholderPosts = async (search, loadedOptions, additional) => {
  const currentStart = additional?.start || 0;
  const limit = 10;

  const response = await fetch(
    \`https://jsonplaceholder.typicode.com/posts?_start=\${currentStart}&_limit=\${limit}\`
  );
  const posts = await response.json();
  
  // Client-side search filtering
  const filteredPosts = search 
    ? posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  return {
    options: filteredPosts.map(post => ({
      value: post.id.toString(),
      label: post.title,
      description: post.body.slice(0, 80) + '...'
    })),
    hasMore: posts.length === limit,
    additional: { start: currentStart + limit }
  };
};`}</Code>
        </Stack>
      </Paper>

      {/* Performance Tips */}
      <Paper shadow="sm" p="lg" withBorder>
        <Title order={3} mb="md">Performance & Best Practices</Title>
        <Stack gap="sm">
          <Text><strong>Debouncing:</strong> Use appropriate debounce timeout (300ms default) to reduce API calls</Text>
          <Text><strong>Caching:</strong> Enable caching for frequently accessed data to improve UX</Text>
          <Text><strong>Minimum Search Length:</strong> Set minimum search length for large datasets</Text>
          <Text><strong>Pagination Size:</strong> Balance between fewer API calls and faster initial load</Text>
          <Text><strong>Error Handling:</strong> Always implement proper error handling in loadOptions</Text>
          <Text><strong>Loading States:</strong> Use built-in loading indicators for better UX</Text>
          <Text><strong>Selection Limits:</strong> Use maxSelectedValues to prevent performance issues</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}