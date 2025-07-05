'use client';

import { useState } from 'react';
import { Container, Title, Text, Paper, Stack, Code, Group, Badge, Alert, Tabs } from '@mantine/core';
import { IconInfoCircle, IconUsers, IconShoppingCart, IconBrandGithub, IconSettings } from '@tabler/icons-react';
import { BasicExamples } from '../components/examples/BasicExamples';
import { ApiExamples } from '../components/examples/ApiExamples';
import { AdvancedExamples } from '../components/examples/AdvancedExamples';
import { CustomizationExamples } from '../components/examples/CustomizationExamples';

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState<string | null>('basic');
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title order={1} mb="md">Examples & API Integration</Title>
          <Text size="lg" c="dimmed" mb="md">
            Comprehensive examples showing how to integrate mantine-select-async-paginate with real paginated APIs.
            Learn best practices for handling async data, pagination, and user interactions.
          </Text>
          
          <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light">
            All examples use free, no-authentication APIs for easy testing and integration.
          </Alert>
        </div>

        {/* Feature Overview */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={3} mb="md">Key Features Demonstrated</Title>
          <Group gap="md">
            <Badge variant="light" color="blue" leftSection={<IconUsers size="0.8rem" />}>
              Single & Multi-select
            </Badge>
            <Badge variant="light" color="green" leftSection={<IconShoppingCart size="0.8rem" />}>
              Real API Integration
            </Badge>
            <Badge variant="light" color="purple" leftSection={<IconBrandGithub size="0.8rem" />}>
              Infinite Scroll
            </Badge>
            <Badge variant="light" color="orange" leftSection={<IconSettings size="0.8rem" />}>
              Advanced Customization
            </Badge>
          </Group>
        </Paper>

        {/* Tabs with Examples */}
        <Tabs value={activeTab} onChange={setActiveTab} variant="outline">
          <Tabs.List grow>
            <Tabs.Tab value="basic">Basic Examples</Tabs.Tab>
            <Tabs.Tab value="api">API Integration</Tabs.Tab>
            <Tabs.Tab value="advanced">Advanced Features</Tabs.Tab>
            <Tabs.Tab value="customization">Customization</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="basic" pt="xl">
            <BasicExamples />
          </Tabs.Panel>

          <Tabs.Panel value="api" pt="xl">
            <ApiExamples />
          </Tabs.Panel>

          <Tabs.Panel value="advanced" pt="xl">
            <AdvancedExamples />
          </Tabs.Panel>

          <Tabs.Panel value="customization" pt="xl">
            <CustomizationExamples />
          </Tabs.Panel>
        </Tabs>

        {/* API Quick Reference */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={3} mb="md">Quick API Reference</Title>
          <Text mb="md" c="dimmed">
            APIs used in these examples - all free and no authentication required:
          </Text>
          
          <Stack gap="md">
            <Group justify="space-between">
              <div>
                <Text fw={500}>DummyJSON</Text>
                <Text size="sm" c="dimmed">Users, products, posts with built-in pagination</Text>
              </div>
              <Code>https://dummyjson.com/</Code>
            </Group>
            
            <Group justify="space-between">
              <div>
                <Text fw={500}>ReqRes.in</Text>
                <Text size="sm" c="dimmed">User management with page-based pagination</Text>
              </div>
              <Code>https://reqres.in/api/</Code>
            </Group>
            
            <Group justify="space-between">
              <div>
                <Text fw={500}>GitHub API</Text>
                <Text size="sm" c="dimmed">Repositories, users with Link header pagination</Text>
              </div>
              <Code>https://api.github.com/</Code>
            </Group>
            
            <Group justify="space-between">
              <div>
                <Text fw={500}>JSONPlaceholder</Text>
                <Text size="sm" c="dimmed">Posts, users, todos with offset/limit pagination</Text>
              </div>
              <Code>https://jsonplaceholder.typicode.com/</Code>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}