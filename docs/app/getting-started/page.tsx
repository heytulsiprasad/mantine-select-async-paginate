'use client';

import { Container, Title, Text, Paper, Stack, Code, List, Group, Alert, Anchor } from '@mantine/core';
import { IconInfoCircle, IconCheck, IconPackage, IconCode, IconRocket } from '@tabler/icons-react';
import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title order={1} mb="md">Getting Started</Title>
          <Text size="lg" c="dimmed" mb="md">
            Get up and running with mantine-select-async-paginate in minutes. 
            This guide covers installation, basic setup, and your first async select component.
          </Text>
        </div>

        {/* Prerequisites */}
        <Paper shadow="sm" p="lg" withBorder>
          <Group gap="sm" mb="md">
            <IconPackage size="1.5rem" />
            <Title order={2}>Prerequisites</Title>
          </Group>
          
          <Text mb="md">
            Before installing, ensure your project meets these requirements:
          </Text>
          
          <List spacing="sm" icon={<IconCheck size="1rem" color="green" />}>
            <List.Item>React 18.0.0 or higher</List.Item>
            <List.Item>Mantine 7.0.0 or 8.0.0</List.Item>
            <List.Item>TypeScript (optional but recommended)</List.Item>
            <List.Item>Node.js 16 or higher</List.Item>
          </List>
        </Paper>

        {/* Installation */}
        <Paper shadow="sm" p="lg" withBorder>
          <Group gap="sm" mb="md">
            <IconPackage size="1.5rem" />
            <Title order={2}>Installation</Title>
          </Group>
          
          <Text mb="md">
            Install the package using your preferred package manager:
          </Text>
          
          <Stack gap="md">
            <div>
              <Text size="sm" c="dimmed" mb="xs">npm</Text>
              <Code block>
                npm install mantine-select-async-paginate
              </Code>
            </div>
            
            <div>
              <Text size="sm" c="dimmed" mb="xs">yarn</Text>
              <Code block>
                yarn add mantine-select-async-paginate
              </Code>
            </div>
            
            <div>
              <Text size="sm" c="dimmed" mb="xs">pnpm</Text>
              <Code block>
                pnpm add mantine-select-async-paginate
              </Code>
            </div>
          </Stack>
        </Paper>

        {/* Basic Setup */}
        <Paper shadow="sm" p="lg" withBorder>
          <Group gap="sm" mb="md">
            <IconCode size="1.5rem" />
            <Title order={2}>Basic Setup</Title>
          </Group>
          
          <Text mb="md">
            Make sure you have Mantine properly set up in your project. 
            If not, follow the <Anchor href="https://mantine.dev/getting-started/" target="_blank">Mantine installation guide</Anchor> first.
          </Text>
          
          <Code block>{`// Required imports
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

// Your app wrapper
function App() {
  return (
    <MantineProvider>
      {/* Your app content */}
    </MantineProvider>
  );
}`}</Code>
        </Paper>

        {/* First Component */}
        <Paper shadow="sm" p="lg" withBorder>
          <Group gap="sm" mb="md">
            <IconRocket size="1.5rem" />
            <Title order={2}>Your First Async Select</Title>
          </Group>
          
          <Text mb="md">
            Here&apos;s a simple example to get you started with AsyncPaginateSelect:
          </Text>
          
          <Code block>{`import { useState } from 'react';
import { AsyncPaginateSelect } from 'mantine-select-async-paginate';

function MyComponent() {
  const [value, setValue] = useState(null);
  
  // Define your loadOptions function
  const loadOptions = async (search, loadedOptions, additional) => {
    // Fetch data from your API
    const response = await fetch(\`/api/search?q=\${search}&page=\${additional?.page || 1}\`);
    const data = await response.json();
    
    return {
      options: data.items.map(item => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: data.hasMore,
      additional: { page: (additional?.page || 1) + 1 }
    };
  };
  
  return (
    <AsyncPaginateSelect
      label="Select an option"
      placeholder="Type to search..."
      value={value}
      onChange={setValue}
      loadOptions={loadOptions}
      defaultOptions // Load options when dropdown opens
      cacheOptions // Cache results for better performance
      clearable // Allow clearing selection
    />
  );
}`}</Code>

          <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light" mt="md">
            <Text fw={500}>Key Points:</Text>
            <List size="sm" mt="xs">
              <List.Item>The `loadOptions` function is called whenever the user searches or scrolls</List.Item>
              <List.Item>`defaultOptions` loads initial data when the dropdown opens</List.Item>
              <List.Item>`cacheOptions` prevents redundant API calls</List.Item>
              <List.Item>Return `hasMore: true` to enable pagination</List.Item>
            </List>
          </Alert>
        </Paper>

        {/* Multi-Select Example */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Multi-Select Usage</Title>
          
          <Text mb="md">
            For multi-select functionality, you can either use the dedicated component or the multiple prop:
          </Text>
          
          <Stack gap="md">
            <div>
              <Text size="sm" fw={500} mb="xs">Option 1: Dedicated Component</Text>
              <Code block>{`import { AsyncPaginateMultiSelect } from 'mantine-select-async-paginate';

function MultiSelectExample() {
  const [values, setValues] = useState([]);
  
  return (
    <AsyncPaginateMultiSelect
      label="Select multiple options"
      value={values}
      onChange={setValues}
      loadOptions={loadOptions}
      maxSelectedValues={5}
      excludeSelected={true}
    />
  );
}`}</Code>
            </div>
            
            <div>
              <Text size="sm" fw={500} mb="xs">Option 2: Multiple Prop</Text>
              <Code block>{`<AsyncPaginateSelect
  multiple={true}
  value={values}
  onChange={setValues}
  loadOptions={loadOptions}
  maxSelectedValues={5}
/>`}</Code>
            </div>
          </Stack>
        </Paper>

        {/* loadOptions Function */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Understanding loadOptions</Title>
          
          <Text mb="md">
            The `loadOptions` function is the heart of the component. It receives three parameters:
          </Text>
          
          <Code block>{`async function loadOptions(
  search: string,              // Current search query
  loadedOptions: Option[],     // Already loaded options
  additional?: any             // Custom data for pagination
) {
  // Your API call logic here
  
  return {
    options: [                 // Array of options
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ],
    hasMore: true,             // Whether more data is available
    additional: { page: 2 }    // Data to pass to next call
  };
}`}</Code>

          <Alert icon={<IconInfoCircle size="1rem" />} color="green" variant="light" mt="md">
            <Text fw={500}>Pro Tip:</Text>
            <Text size="sm">
              Use the `additional` parameter to track pagination state, filters, or any other data 
              needed between loadOptions calls.
            </Text>
          </Alert>
        </Paper>

        {/* Common Patterns */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Common Patterns</Title>
          
          <Stack gap="md">
            <div>
              <Text fw={500} mb="xs">Pagination with offset/limit</Text>
              <Code block>{`const loadOptions = async (search, loadedOptions, additional) => {
  const offset = additional?.offset || 0;
  const limit = 20;
  
  const response = await fetch(
    \`/api/items?search=\${search}&offset=\${offset}&limit=\${limit}\`
  );
  const { items, total } = await response.json();
  
  return {
    options: items.map(item => ({
      value: item.id,
      label: item.name
    })),
    hasMore: offset + limit < total,
    additional: { offset: offset + limit }
  };
};`}</Code>
            </div>
            
            <div>
              <Text fw={500} mb="xs">Page-based pagination</Text>
              <Code block>{`const loadOptions = async (search, loadedOptions, additional) => {
  const page = additional?.page || 1;
  
  const response = await fetch(
    \`/api/items?search=\${search}&page=\${page}&per_page=20\`
  );
  const { items, total_pages } = await response.json();
  
  return {
    options: items.map(item => ({
      value: item.id,
      label: item.name
    })),
    hasMore: page < total_pages,
    additional: { page: page + 1 }
  };
};`}</Code>
            </div>
          </Stack>
        </Paper>

        {/* Next Steps */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Next Steps</Title>
          
          <List spacing="md">
            <List.Item>
              <Link href="/examples" style={{ textDecoration: 'none' }}>
                <Text component="span" c="blue" style={{ cursor: 'pointer' }}>
                  View Examples →
                </Text>
              </Link>
              <Text size="sm" c="dimmed">
                See real-world examples with various APIs and use cases
              </Text>
            </List.Item>
            
            <List.Item>
              <Link href="/api" style={{ textDecoration: 'none' }}>
                <Text component="span" c="blue" style={{ cursor: 'pointer' }}>
                  API Reference →
                </Text>
              </Link>
              <Text size="sm" c="dimmed">
                Explore all available props and configuration options
              </Text>
            </List.Item>
            
            <List.Item>
              <Anchor href="https://github.com/heytulsiprasad/mantine-select-async-paginate" target="_blank">
                GitHub Repository →
              </Anchor>
              <Text size="sm" c="dimmed">
                Check out the source code and contribute
              </Text>
            </List.Item>
          </List>
        </Paper>
      </Stack>
    </Container>
  );
}