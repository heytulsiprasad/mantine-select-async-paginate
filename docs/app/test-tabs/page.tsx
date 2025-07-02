'use client';

import { useState } from 'react';
import { Container, Title, Tabs } from '@mantine/core';

export default function TestTabsPage() {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">Test Tabs Page</Title>
      
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="first">First tab</Tabs.Tab>
          <Tabs.Tab value="second">Second tab</Tabs.Tab>
          <Tabs.Tab value="third">Third tab</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first" pt="xs">
          First tab content
        </Tabs.Panel>

        <Tabs.Panel value="second" pt="xs">
          Second tab content
        </Tabs.Panel>

        <Tabs.Panel value="third" pt="xs">
          Third tab content
        </Tabs.Panel>
      </Tabs>

      <p style={{ marginTop: '20px' }}>Active tab: {activeTab}</p>
    </Container>
  );
}