'use client';

import { Container, Title, Text, Paper, Stack, Group, Badge, Button, Code, List, Anchor, Grid, Card, Highlight } from '@mantine/core';
import { IconBook, IconCode, IconRocket, IconBrandGithub, IconBrandNpm, IconExternalLink, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Badge variant="light" color="blue" size="lg" mb="md">
            v0.2.0 - Multi-Select Support Added! 🎉
          </Badge>
          <Title order={1} size="3rem" mb="md" style={{ fontWeight: 800 }}>
            Mantine Select Async Paginate
          </Title>
          <Text size="xl" c="dimmed" mb="xl" maw={600} mx="auto">
            The most powerful async select component for Mantine UI. 
            Load options dynamically with pagination, search, and multi-select support.
          </Text>
          
          <Group justify="center" gap="md">
            <Button
              component={Link}
              href="/getting-started"
              leftSection={<IconRocket size="1rem" />}
              size="lg"
              variant="filled"
            >
              Get Started
            </Button>
            <Button
              component={Link}
              href="/examples"
              leftSection={<IconCode size="1rem" />}
              size="lg"
              variant="light"
            >
              View Examples
            </Button>
            <Button
              component="a"
              href="https://github.com/heytulsiprasad/mantine-select-async-paginate"
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconBrandGithub size="1rem" />}
              size="lg"
              variant="outline"
            >
              GitHub
            </Button>
          </Group>
        </div>

        {/* Quick Installation */}
        <Paper shadow="sm" p="lg" withBorder>
          <Group justify="space-between" align="center" mb="md">
            <Title order={2}>Quick Installation</Title>
            <Badge variant="light" color="green">Latest: v0.2.0</Badge>
          </Group>
          
          <Code block size="lg" mb="md">
            npm install mantine-select-async-paginate
          </Code>
          
          <Text c="dimmed">
            Requires React 18+, Mantine 7+ or 8+. Works with both CommonJS and ES modules.
          </Text>
        </Paper>

        {/* Key Features */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Key Features</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="sm">
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Async data loading with pagination</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Single and Multi-select modes</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Debounced search (300ms default)</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Infinite scroll support</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Built-in caching for performance</Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="sm">
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Full TypeScript support</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Custom option rendering</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Selection limits & filtering</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>All Mantine theming & styling</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size="1rem" color="green" />
                  <Text>Error handling & loading states</Text>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Quick Start */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Quick Start</Title>
          <Text mb="md" c="dimmed">
            Get up and running in minutes with these simple examples:
          </Text>
          
          <Code block>{`import { AsyncPaginateSelect, AsyncPaginateMultiSelect } from 'mantine-select-async-paginate';

// Single Select
<AsyncPaginateSelect
  loadOptions={loadOptions}
  defaultOptions
  cacheOptions
  placeholder="Search..."
/>

// Multi Select
<AsyncPaginateMultiSelect
  value={selectedValues}
  onChange={setSelectedValues}
  loadOptions={loadOptions}
  maxSelectedValues={5}
  excludeSelected={true}
/>`}</Code>
        </Paper>

        {/* Navigation Cards */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              component={Link}
              href="/getting-started"
              shadow="sm"
              padding="lg"
              withBorder
              style={{ height: '100%', cursor: 'pointer', textDecoration: 'none' }}
            >
              <Card.Section p="lg" pb="xs">
                <Group gap="sm">
                  <IconBook size="1.5rem" color="blue" />
                  <Title order={3}>Getting Started</Title>
                </Group>
              </Card.Section>
              <Text size="sm" c="dimmed" mb="md">
                Installation, setup, and basic usage guide to get you started quickly.
              </Text>
              <Badge variant="light" color="blue" size="sm">
                Beginner Friendly
              </Badge>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              component={Link}
              href="/examples"
              shadow="sm"
              padding="lg"
              withBorder
              style={{ height: '100%', cursor: 'pointer', textDecoration: 'none' }}
            >
              <Card.Section p="lg" pb="xs">
                <Group gap="sm">
                  <IconCode size="1.5rem" color="green" />
                  <Title order={3}>Examples</Title>
                </Group>
              </Card.Section>
              <Text size="sm" c="dimmed" mb="md">
                Real-world examples with paginated APIs, customization, and advanced features.
              </Text>
              <Badge variant="light" color="green" size="sm">
                Interactive Demos
              </Badge>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              component={Link}
              href="/api"
              shadow="sm"
              padding="lg"
              withBorder
              style={{ height: '100%', cursor: 'pointer', textDecoration: 'none' }}
            >
              <Card.Section p="lg" pb="xs">
                <Group gap="sm">
                  <IconRocket size="1.5rem" color="orange" />
                  <Title order={3}>API Reference</Title>
                </Group>
              </Card.Section>
              <Text size="sm" c="dimmed" mb="md">
                Complete API documentation with all props, types, and configuration options.
              </Text>
              <Badge variant="light" color="orange" size="sm">
                Full Reference
              </Badge>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              component={Link}
              href="/roadmap"
              shadow="sm"
              padding="lg"
              withBorder
              style={{ height: '100%', cursor: 'pointer', textDecoration: 'none' }}
            >
              <Card.Section p="lg" pb="xs">
                <Group gap="sm">
                  <IconExternalLink size="1.5rem" color="purple" />
                  <Title order={3}>Roadmap</Title>
                </Group>
              </Card.Section>
              <Text size="sm" c="dimmed" mb="md">
                Upcoming features, improvements, and community contributions.
              </Text>
              <Badge variant="light" color="purple" size="sm">
                What's Next
              </Badge>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Links */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Links & Resources</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group gap="sm" mb="xs">
                <IconBrandGithub size="1.2rem" />
                <Text fw={500}>GitHub Repository</Text>
              </Group>
              <Text size="sm" c="dimmed" mb="md">
                Source code, issues, and contributions
              </Text>
              <Anchor
                href="https://github.com/heytulsiprasad/mantine-select-async-paginate"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </Anchor>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group gap="sm" mb="xs">
                <IconBrandNpm size="1.2rem" />
                <Text fw={500}>NPM Package</Text>
              </Group>
              <Text size="sm" c="dimmed" mb="md">
                Install and version information
              </Text>
              <Anchor
                href="https://www.npmjs.com/package/mantine-select-async-paginate"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on NPM →
              </Anchor>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group gap="sm" mb="xs">
                <IconExternalLink size="1.2rem" />
                <Text fw={500}>Storybook Demo</Text>
              </Group>
              <Text size="sm" c="dimmed" mb="md">
                Interactive component playground
              </Text>
              <Anchor
                href="https://mantine-select-async-paginate-tulsi-prasads-projects.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Storybook →
              </Anchor>
            </Grid.Col>
          </Grid>
        </Paper>
      </Stack>
    </Container>
  );
}