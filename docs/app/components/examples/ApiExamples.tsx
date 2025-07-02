'use client';

import { useState } from 'react';
import { Stack, Title, Text, Paper, Group, Code, Alert, Badge, Tabs } from '@mantine/core';
import { IconApi, IconUsers, IconShoppingCart, IconBrandGithub, IconInfoCircle } from '@tabler/icons-react';
import { AsyncPaginateSelect, AsyncPaginateMultiSelect, LoadOptionsResult } from 'mantine-select-async-paginate';

export function ApiExamples() {
  // DummyJSON Users
  const [dummyUsers, setDummyUsers] = useState<string[]>([]);
  const [dummyProducts, setDummyProducts] = useState<string | null>(null);
  
  // ReqRes Users
  const [reqresUsers, setReqresUsers] = useState<string[]>([]);
  
  // GitHub Repositories
  const [githubRepos, setGithubRepos] = useState<string | null>(null);

  // DummyJSON Users API (Multi-select)
  const loadDummyUsers = async (
    search: string,
    loadedOptions: any[],
    additional?: { skip: number }
  ): Promise<LoadOptionsResult<{ skip: number }>> => {
    const currentSkip = additional?.skip || 0;
    const limit = 10;
    
    let url = `https://dummyjson.com/users?limit=${limit}&skip=${currentSkip}&select=id,firstName,lastName,email,image`;
    
    if (search) {
      url = `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${currentSkip}&select=id,firstName,lastName,email,image`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      return {
        options: data.users.map((user: any) => ({
          value: user.id.toString(),
          label: `${user.firstName} ${user.lastName}`,
          description: user.email,
        })),
        hasMore: currentSkip + limit < data.total,
        additional: { skip: currentSkip + limit },
      };
    } catch (error) {
      console.error('Error loading users:', error);
      return { options: [], hasMore: false };
    }
  };

  // DummyJSON Products API (Single-select)
  const loadDummyProducts = async (
    search: string,
    loadedOptions: any[],
    additional?: { skip: number }
  ): Promise<LoadOptionsResult<{ skip: number }>> => {
    const currentSkip = additional?.skip || 0;
    const limit = 12;
    
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${currentSkip}&select=id,title,price,brand,category,thumbnail`;
    
    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${currentSkip}&select=id,title,price,brand,category,thumbnail`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      return {
        options: data.products.map((product: any) => ({
          value: product.id.toString(),
          label: `${product.title} - $${product.price}`,
          description: `${product.brand} | ${product.category}`,
        })),
        hasMore: currentSkip + limit < data.total,
        additional: { skip: currentSkip + limit },
      };
    } catch (error) {
      console.error('Error loading products:', error);
      return { options: [], hasMore: false };
    }
  };

  // ReqRes Users API (Multi-select)
  const loadReqresUsers = async (
    search: string,
    loadedOptions: any[],
    additional?: { page: number }
  ): Promise<LoadOptionsResult<{ page: number }>> => {
    const currentPage = additional?.page || 1;
    const perPage = 6;

    try {
      const response = await fetch(`https://reqres.in/api/users?page=${currentPage}&per_page=${perPage}`, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      const data = await response.json();

      if (!data.data || !Array.isArray(data.data)) {
        console.error('ReqRes API error:', data);
        return {
          options: [],
          hasMore: false,
          additional: { page: currentPage }
        };
      }

      let filteredUsers = data.data;
      
      // Client-side search filtering since ReqRes doesn't support search
      if (search) {
        filteredUsers = data.data.filter((user: any) =>
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        );
      }

      return {
        options: filteredUsers.map((user: any) => ({
          value: user.id.toString(),
          label: `${user.first_name} ${user.last_name}`,
          description: user.email,
        })),
        hasMore: currentPage < data.total_pages,
        additional: { page: currentPage + 1 },
      };
    } catch (error) {
      console.error('Error loading ReqRes users:', error);
      return { options: [], hasMore: false };
    }
  };

  // GitHub Repositories API (Single-select)
  const loadGithubRepos = async (
    search: string,
    loadedOptions: any[],
    additional?: { page: number }
  ): Promise<LoadOptionsResult<{ page: number }>> => {
    const currentPage = additional?.page || 1;
    
    if (!search || search.length < 2) {
      return { options: [], hasMore: false };
    }

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${search}&page=${currentPage}&per_page=10&sort=stars&order=desc`
      );
      const data = await response.json();

      return {
        options: data.items.map((repo: any) => ({
          value: repo.id.toString(),
          label: repo.full_name,
          description: `⭐ ${repo.stargazers_count} | ${repo.description?.slice(0, 60)}...`,
        })),
        hasMore: data.total_count > currentPage * 10,
        additional: { page: currentPage + 1 },
      };
    } catch (error) {
      console.error('Error loading GitHub repos:', error);
      return { options: [], hasMore: false };
    }
  };

  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="md">Real API Integration Examples</Title>
        <Text c="dimmed" mb="xl">
          Examples using real, free APIs to demonstrate pagination, search, and data handling.
          These APIs require no authentication and are perfect for testing and development.
        </Text>
      </div>

      <Tabs defaultValue="dummyjson" variant="outline">
        <Tabs.List grow>
          <Tabs.Tab value="dummyjson" leftSection={<IconApi size="1rem" />}>
            DummyJSON
          </Tabs.Tab>
          <Tabs.Tab value="reqres" leftSection={<IconUsers size="1rem" />}>
            ReqRes.in
          </Tabs.Tab>
          <Tabs.Tab value="github" leftSection={<IconBrandGithub size="1rem" />}>
            GitHub API
          </Tabs.Tab>
        </Tabs.List>

        {/* DummyJSON Tab */}
        <Tabs.Panel value="dummyjson" pt="xl">
          <Stack gap="xl">
            <Paper shadow="sm" p="lg" withBorder>
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <div>
                    <Title order={3}>DummyJSON Users (Multi-Select)</Title>
                    <Group gap="xs" mt={4}>
                      <Badge size="sm" color="blue">limit/skip pagination</Badge>
                      <Badge size="sm" color="green">search support</Badge>
                      <Badge size="sm" color="orange">208 total users</Badge>
                    </Group>
                  </div>
                  <IconUsers size="1.5rem" />
                </Group>
                
                <Text size="sm" c="dimmed">
                  Real user data with built-in search and pagination from DummyJSON API.
                  Features default loading and search-based filtering.
                </Text>

                <AsyncPaginateMultiSelect
                  label="Select users"
                  placeholder="Search users by name or load all..."
                  value={dummyUsers}
                  onChange={setDummyUsers}
                  loadOptions={loadDummyUsers}
                  defaultOptions
                  cacheOptions
                  clearable
                  maxSelectedValues={8}
                  excludeSelected={true}
                  description="Search by name or scroll to load more users"
                />

                {dummyUsers.length > 0 && (
                  <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light">
                    Selected users ({dummyUsers.length}): <Code>{dummyUsers.join(', ')}</Code>
                  </Alert>
                )}

                <Code block>{`// DummyJSON Users with limit/skip pagination
const loadDummyUsers = async (search, loadedOptions, additional) => {
  const currentSkip = additional?.skip || 0;
  const limit = 10;
  
  let url = \`https://dummyjson.com/users?limit=\${limit}&skip=\${currentSkip}\`;
  if (search) {
    url = \`https://dummyjson.com/users/search?q=\${search}&limit=\${limit}&skip=\${currentSkip}\`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return {
    options: data.users.map(user => ({
      value: user.id.toString(),
      label: \`\${user.firstName} \${user.lastName}\`,
      description: user.email
    })),
    hasMore: currentSkip + limit < data.total,
    additional: { skip: currentSkip + limit }
  };
};`}</Code>
              </Stack>
            </Paper>

            <Paper shadow="sm" p="lg" withBorder>
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <div>
                    <Title order={3}>DummyJSON Products (Single-Select)</Title>
                    <Group gap="xs" mt={4}>
                      <Badge size="sm" color="blue">limit/skip pagination</Badge>
                      <Badge size="sm" color="green">search support</Badge>
                      <Badge size="sm" color="orange">194 total products</Badge>
                    </Group>
                  </div>
                  <IconShoppingCart size="1.5rem" />
                </Group>
                
                <Text size="sm" c="dimmed">
                  E-commerce product data with pricing, brands, and categories.
                  Demonstrates single-select with rich product information.
                </Text>

                <AsyncPaginateSelect
                  label="Select a product"
                  placeholder="Search products or browse all..."
                  value={dummyProducts}
                  onChange={setDummyProducts}
                  loadOptions={loadDummyProducts}
                  defaultOptions
                  cacheOptions
                  clearable
                  description="Search by product name, brand, or category"
                />

                {dummyProducts && (
                  <Alert icon={<IconInfoCircle size="1rem" />} color="green" variant="light">
                    Selected product ID: <Code>{dummyProducts}</Code>
                  </Alert>
                )}

                <Code block>{`// DummyJSON Products with search capability
const loadDummyProducts = async (search, loadedOptions, additional) => {
  const currentSkip = additional?.skip || 0;
  const limit = 12;
  
  let url = \`https://dummyjson.com/products?limit=\${limit}&skip=\${currentSkip}\`;
  if (search) {
    url = \`https://dummyjson.com/products/search?q=\${search}&limit=\${limit}&skip=\${currentSkip}\`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return {
    options: data.products.map(product => ({
      value: product.id.toString(),
      label: \`\${product.title} - $\${product.price}\`,
      description: \`\${product.brand} | \${product.category}\`
    })),
    hasMore: currentSkip + limit < data.total,
    additional: { skip: currentSkip + limit }
  };
};`}</Code>
              </Stack>
            </Paper>
          </Stack>
        </Tabs.Panel>

        {/* ReqRes Tab */}
        <Tabs.Panel value="reqres" pt="xl">
          <Paper shadow="sm" p="lg" withBorder>
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <div>
                  <Title order={3}>ReqRes.in Users (Multi-Select)</Title>
                  <Group gap="xs" mt={4}>
                    <Badge size="sm" color="blue">page-based pagination</Badge>
                    <Badge size="sm" color="yellow">client-side search</Badge>
                    <Badge size="sm" color="orange">12 total users</Badge>
                  </Group>
                </div>
                <IconUsers size="1.5rem" />
              </Group>
              
              <Text size="sm" c="dimmed">
                Clean user data from ReqRes.in with page-based pagination. 
                Search is handled client-side since the API doesn't support search parameters.
              </Text>

              <AsyncPaginateMultiSelect
                label="Select ReqRes users"
                placeholder="Search users by name or email..."
                value={reqresUsers}
                onChange={setReqresUsers}
                loadOptions={loadReqresUsers}
                defaultOptions
                cacheOptions
                clearable
                maxSelectedValues={6}
                excludeSelected={true}
                description="Uses page-based pagination with client-side search filtering"
              />

              {reqresUsers.length > 0 && (
                <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light">
                  Selected users ({reqresUsers.length}): <Code>{reqresUsers.join(', ')}</Code>
                </Alert>
              )}

              <Code block>{`// ReqRes.in with page-based pagination
const loadReqresUsers = async (search, loadedOptions, additional) => {
  const currentPage = additional?.page || 1;
  const perPage = 6;

  const response = await fetch(
    \`https://reqres.in/api/users?page=\${currentPage}&per_page=\${perPage}\`
  );
  const data = await response.json();

  // Client-side search filtering
  let filteredUsers = data.data;
  if (search) {
    filteredUsers = data.data.filter(user =>
      \`\${user.first_name} \${user.last_name}\`.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  return {
    options: filteredUsers.map(user => ({
      value: user.id.toString(),
      label: \`\${user.first_name} \${user.last_name}\`,
      description: user.email
    })),
    hasMore: currentPage < data.total_pages,
    additional: { page: currentPage + 1 }
  };
};`}</Code>
            </Stack>
          </Paper>
        </Tabs.Panel>

        {/* GitHub Tab */}
        <Tabs.Panel value="github" pt="xl">
          <Paper shadow="sm" p="lg" withBorder>
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <div>
                  <Title order={3}>GitHub Repositories (Single-Select)</Title>
                  <Group gap="xs" mt={4}>
                    <Badge size="sm" color="blue">page-based pagination</Badge>
                    <Badge size="sm" color="green">server-side search</Badge>
                    <Badge size="sm" color="orange">millions of repos</Badge>
                  </Group>
                </div>
                <IconBrandGithub size="1.5rem" />
              </Group>
              
              <Text size="sm" c="dimmed">
                Search GitHub repositories with star counts and descriptions. 
                Requires minimum 2 characters to search. Results sorted by stars.
              </Text>

              <AsyncPaginateSelect
                label="Search GitHub repositories"
                placeholder="Type at least 2 characters to search..."
                value={githubRepos}
                onChange={setGithubRepos}
                loadOptions={loadGithubRepos}
                minSearchLength={2}
                clearable
                nothingFoundMessage="Type at least 2 characters to search repositories"
                description="Search returns repositories sorted by star count"
              />

              {githubRepos && (
                <Alert icon={<IconInfoCircle size="1rem" />} color="green" variant="light">
                  Selected repository ID: <Code>{githubRepos}</Code>
                </Alert>
              )}

              <Code block>{`// GitHub API with search requirement
const loadGithubRepos = async (search, loadedOptions, additional) => {
  const currentPage = additional?.page || 1;
  
  if (!search || search.length < 2) {
    return { options: [], hasMore: false };
  }

  const response = await fetch(
    \`https://api.github.com/search/repositories?q=\${search}&page=\${currentPage}&per_page=10&sort=stars&order=desc\`
  );
  const data = await response.json();

  return {
    options: data.items.map(repo => ({
      value: repo.id.toString(),
      label: repo.full_name,
      description: \`⭐ \${repo.stargazers_count} | \${repo.description?.slice(0, 60)}...\`
    })),
    hasMore: data.total_count > currentPage * 10,
    additional: { page: currentPage + 1 }
  };
};`}</Code>
            </Stack>
          </Paper>
        </Tabs.Panel>
      </Tabs>

      {/* API Comparison */}
      <Paper shadow="sm" p="lg" withBorder>
        <Title order={3} mb="md">API Patterns Comparison</Title>
        <Stack gap="md">
          <div>
            <Text fw={500}>DummyJSON (limit/skip pattern):</Text>
            <Code>?limit=10&skip=20</Code>
            <Text size="sm" c="dimmed">✅ Built-in search • ✅ Rich data • ✅ Stable pagination</Text>
          </div>
          
          <div>
            <Text fw={500}>ReqRes.in (page-based pattern):</Text>
            <Code>?page=2&per_page=6</Code>
            <Text size="sm" c="dimmed">⚠️ Client-side search • ✅ Clean data • ✅ Realistic responses</Text>
          </div>
          
          <div>
            <Text fw={500}>GitHub API (page-based with search):</Text>
            <Code>?q=react&page=1&per_page=10</Code>
            <Text size="sm" c="dimmed">✅ Server-side search • ✅ Real-time data • ⚠️ Rate limits</Text>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}