import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Container, Stack, Text, Code, Paper, Badge, Group } from '@mantine/core';
import { AsyncPaginateSelect } from '../AsyncPaginateSelect';
import { LoadOptionsResult } from '../types';

const meta = {
  title: 'Components/AsyncPaginateSelect',
  component: AsyncPaginateSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the select input',
    },
    label: {
      control: 'text',
      description: 'Label for the select input',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the select can be cleared',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the select is searchable (always true for async)',
    },
    debounceTimeout: {
      control: 'number',
      description: 'Debounce timeout in milliseconds',
    },
    minSearchLength: {
      control: 'number',
      description: 'Minimum characters to trigger search',
    },
    cacheOptions: {
      control: 'boolean',
      description: 'Whether to cache loaded options',
    },
  },
} satisfies Meta<typeof AsyncPaginateSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to show selected value
const SelectWrapper = ({ children, showValue = true }: any) => {
  const [value, setValue] = useState<string | null>(null);
  
  return (
    <Container size="sm" style={{ minWidth: 400 }}>
      <Stack gap="md">
        {children({ value, onChange: setValue })}
        {showValue && value && (
          <Paper p="md" withBorder>
            <Text size="sm">
              Selected value: <Code>{value}</Code>
            </Text>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

// Basic example with mock data
export const Basic: Story = {
  render: (args) => (
    <SelectWrapper>
      {({ value, onChange }: any) => (
        <AsyncPaginateSelect
          {...args}
          value={value}
          onChange={onChange}
          loadOptions={async (search, loadedOptions, additional) => {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            const page = additional?.page || 1;
            const pageSize = 10;
            const allOptions = Array.from({ length: 100 }, (_, i) => ({
              value: `option-${i + 1}`,
              label: `Option ${i + 1}`,
            }));
            
            const filtered = search
              ? allOptions.filter((opt) =>
                  opt.label.toLowerCase().includes(search.toLowerCase())
                )
              : allOptions;
            
            const start = (page - 1) * pageSize;
            const options = filtered.slice(start, start + pageSize);
            
            return {
              options,
              hasMore: start + pageSize < filtered.length,
              additional: { page: page + 1 },
            };
          }}
        />
      )}
    </SelectWrapper>
  ),
  args: {
    label: 'Select an option',
    placeholder: 'Search options...',
    description: 'This is a basic example with mock data',
    clearable: true,
    defaultOptions: true,
  },
};

// JSONPlaceholder Users API
export const JSONPlaceholderUsers: Story = {
  render: (args) => (
    <SelectWrapper>
      {({ value, onChange }: any) => (
        <AsyncPaginateSelect
          {...args}
          value={value}
          onChange={onChange}
          loadOptions={async (search, loadedOptions, additional) => {
            const page = additional?.page || 1;
            const limit = 10;
            
            // JSONPlaceholder doesn't support real pagination, so we'll simulate it
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const allUsers = await response.json();
            
            // Filter by search
            const filtered = search
              ? allUsers.filter((user: any) =>
                  user.name.toLowerCase().includes(search.toLowerCase()) ||
                  user.email.toLowerCase().includes(search.toLowerCase())
                )
              : allUsers;
            
            // Simulate pagination
            const start = (page - 1) * limit;
            const paginatedUsers = filtered.slice(start, start + limit);
            
            return {
              options: paginatedUsers.map((user: any) => ({
                value: user.id.toString(),
                label: `${user.name} (${user.email})`,
              })),
              hasMore: start + limit < filtered.length,
              additional: { page: page + 1 },
            };
          }}
        />
      )}
    </SelectWrapper>
  ),
  args: {
    label: 'Select a user',
    placeholder: 'Search by name or email...',
    description: 'Data from JSONPlaceholder API',
    clearable: true,
    defaultOptions: true,
    loadingMessage: 'Loading users...',
    noOptionsMessage: 'No users found',
  },
};

// Rick and Morty Characters API
export const RickAndMortyCharacters: Story = {
  render: (args) => (
    <SelectWrapper>
      {({ value, onChange }: any) => (
        <AsyncPaginateSelect
          {...args}
          value={value}
          onChange={onChange}
          loadOptions={async (search, loadedOptions, additional) => {
            const page = additional?.page || 1;
            
            const url = new URL('https://rickandmortyapi.com/api/character');
            url.searchParams.append('page', page.toString());
            if (search) {
              url.searchParams.append('name', search);
            }
            
            try {
              const response = await fetch(url.toString());
              const data = await response.json();
              
              if (response.ok) {
                return {
                  options: data.results.map((character: any) => ({
                    value: character.id.toString(),
                    label: `${character.name} (${character.species} - ${character.status})`,
                  })),
                  hasMore: data.info.next !== null,
                  additional: { page: page + 1 },
                };
              } else {
                return { options: [], hasMore: false };
              }
            } catch (error) {
              console.error('Error loading characters:', error);
              return { options: [], hasMore: false };
            }
          }}
        />
      )}
    </SelectWrapper>
  ),
  args: {
    label: 'Select a Rick and Morty character',
    placeholder: 'Search characters...',
    description: 'Real-time data from Rick and Morty API with pagination',
    clearable: true,
    cacheOptions: true,
    minSearchLength: 0,
    loadingMessage: 'Loading characters...',
    noOptionsMessage: 'No characters found',
  },
};

// Pokemon API
export const PokemonAPI: Story = {
  render: (args) => (
    <SelectWrapper>
      {({ value, onChange }: any) => (
        <AsyncPaginateSelect
          {...args}
          value={value}
          onChange={onChange}
          loadOptions={async (search, loadedOptions, additional) => {
            const offset = additional?.offset || 0;
            const limit = 20;
            
            const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
            
            try {
              const response = await fetch(url);
              const data = await response.json();
              
              let options = data.results.map((pokemon: any, index: number) => ({
                value: (offset + index + 1).toString(),
                label: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#${offset + index + 1})`,
              }));
              
              // Filter by search if provided
              if (search) {
                options = options.filter((opt: any) =>
                  opt.label.toLowerCase().includes(search.toLowerCase())
                );
              }
              
              return {
                options,
                hasMore: data.next !== null,
                additional: { offset: offset + limit },
              };
            } catch (error) {
              console.error('Error loading Pokemon:', error);
              return { options: [], hasMore: false };
            }
          }}
        />
      )}
    </SelectWrapper>
  ),
  args: {
    label: 'Select a Pokémon',
    placeholder: 'Search Pokémon...',
    description: 'Data from PokéAPI with pagination',
    clearable: true,
    defaultOptions: true,
    cacheOptions: true,
    loadingMessage: 'Loading Pokémon...',
    noOptionsMessage: 'No Pokémon found',
    loadMoreText: 'Load more Pokémon...',
  },
};

// Countries REST API
export const CountriesAPI: Story = {
  render: (args) => (
    <SelectWrapper>
      {({ value, onChange }: any) => (
        <AsyncPaginateSelect
          {...args}
          value={value}
          onChange={onChange}
          loadOptions={async (search, loadedOptions, additional) => {
            const page = additional?.page || 1;
            const pageSize = 20;
            
            try {
              // Fetch all countries (REST Countries API doesn't support pagination)
              const response = await fetch('https://restcountries.com/v3.1/all');
              const allCountries = await response.json();
              
              // Sort by name
              allCountries.sort((a: any, b: any) => 
                a.name.common.localeCompare(b.name.common)
              );
              
              // Filter by search
              const filtered = search
                ? allCountries.filter((country: any) =>
                    country.name.common.toLowerCase().includes(search.toLowerCase()) ||
                    country.name.official.toLowerCase().includes(search.toLowerCase())
                  )
                : allCountries;
              
              // Paginate
              const start = (page - 1) * pageSize;
              const paginatedCountries = filtered.slice(start, start + pageSize);
              
              return {
                options: paginatedCountries.map((country: any) => ({
                  value: country.cca3,
                  label: `${country.flag} ${country.name.common} (${country.region})`,
                })),
                hasMore: start + pageSize < filtered.length,
                additional: { page: page + 1 },
              };
            } catch (error) {
              console.error('Error loading countries:', error);
              return { options: [], hasMore: false };
            }
          }}
        />
      )}
    </SelectWrapper>
  ),
  args: {
    label: 'Select a country',
    placeholder: 'Search countries...',
    description: 'Data from REST Countries API',
    clearable: true,
    defaultOptions: true,
    cacheOptions: true,
    loadingMessage: 'Loading countries...',
    noOptionsMessage: 'No countries found',
  },
};

// Open Library Books API
export const OpenLibraryBooks: Story = {
  render: (args) => (
    <SelectWrapper>
      {({ value, onChange }: any) => (
        <AsyncPaginateSelect
          {...args}
          value={value}
          onChange={onChange}
          loadOptions={async (search, loadedOptions, additional) => {
            if (!search || search.length < 3) {
              return { options: [], hasMore: false };
            }
            
            const page = additional?.page || 1;
            const limit = 20;
            
            try {
              const response = await fetch(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
              );
              const data = await response.json();
              
              return {
                options: data.docs.map((book: any) => ({
                  value: book.key,
                  label: `${book.title}${book.author_name ? ` by ${book.author_name[0]}` : ''}${book.first_publish_year ? ` (${book.first_publish_year})` : ''}`,
                })),
                hasMore: data.numFound > page * limit,
                additional: { page: page + 1 },
              };
            } catch (error) {
              console.error('Error loading books:', error);
              return { options: [], hasMore: false };
            }
          }}
        />
      )}
    </SelectWrapper>
  ),
  args: {
    label: 'Search for books',
    placeholder: 'Type at least 3 characters...',
    description: 'Search books from Open Library API',
    clearable: true,
    minSearchLength: 3,
    debounceTimeout: 500,
    loadingMessage: 'Searching books...',
    noOptionsMessage: 'Type at least 3 characters to search',
  },
};

// GitHub Repositories with custom render
export const GitHubRepositories: Story = {
  render: (args) => (
    <SelectWrapper>
      {({ value, onChange }: any) => (
        <AsyncPaginateSelect
          {...args}
          value={value}
          onChange={onChange}
          renderOption={({ option }) => (
            <Group justify="space-between" wrap="nowrap">
              <div>
                <Text size="sm">{option.label}</Text>
                {option.disabled !== true && option.value !== '__loading__' && option.value !== '__load_more__' && (
                  <Text size="xs" c="dimmed">
                    {(option as any).description}
                  </Text>
                )}
              </div>
              {(option as any).stars && (
                <Badge size="sm" variant="light">
                  ⭐ {(option as any).stars}
                </Badge>
              )}
            </Group>
          )}
          loadOptions={async (search, loadedOptions, additional) => {
            if (!search) {
              return { options: [], hasMore: false };
            }
            
            const page = additional?.page || 1;
            const perPage = 30;
            
            try {
              const response = await fetch(
                `https://api.github.com/search/repositories?q=${encodeURIComponent(search)}&page=${page}&per_page=${perPage}&sort=stars&order=desc`
              );
              const data = await response.json();
              
              return {
                options: data.items.map((repo: any) => ({
                  value: repo.id.toString(),
                  label: repo.full_name,
                  description: repo.description || 'No description',
                  stars: repo.stargazers_count,
                })),
                hasMore: data.total_count > page * perPage,
                additional: { page: page + 1 },
              };
            } catch (error) {
              console.error('Error loading repositories:', error);
              return { options: [], hasMore: false };
            }
          }}
        />
      )}
    </SelectWrapper>
  ),
  args: {
    label: 'Search GitHub repositories',
    placeholder: 'Type to search repositories...',
    description: 'Real-time search with custom option rendering',
    clearable: true,
    minSearchLength: 1,
    debounceTimeout: 300,
    loadingMessage: 'Searching repositories...',
    noOptionsMessage: 'Type to search repositories',
  },
};

// Error handling example
export const WithErrorHandling: Story = {
  render: (args) => (
    <SelectWrapper>
      {({ value, onChange }: any) => (
        <AsyncPaginateSelect
          {...args}
          value={value}
          onChange={onChange}
          loadOptions={async (search, loadedOptions, additional) => {
            // Simulate random errors
            if (Math.random() > 0.7) {
              throw new Error('Random API error occurred!');
            }
            
            // Simulate slow network
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            const page = additional?.page || 1;
            const options = Array.from({ length: 10 }, (_, i) => ({
              value: `${page}-${i}`,
              label: `Result ${(page - 1) * 10 + i + 1}`,
            }));
            
            return {
              options,
              hasMore: page < 5,
              additional: { page: page + 1 },
            };
          }}
        />
      )}
    </SelectWrapper>
  ),
  args: {
    label: 'Select with error handling',
    placeholder: 'May randomly fail...',
    description: 'This example randomly throws errors to demonstrate error handling',
    clearable: true,
    defaultOptions: true,
    cacheOptions: false,
    loadingMessage: 'Loading (may fail)...',
    noOptionsMessage: 'No options or error occurred',
  },
};