'use client';

import { Container, Title, Text, Paper, Stack, Badge, Timeline, Progress, List, Alert, Group, Anchor } from '@mantine/core';
import { IconGitBranch, IconRocket, IconCode, IconBug, IconBrandGithub, IconCheck, IconClock, IconStar } from '@tabler/icons-react';

export default function RoadmapPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title order={1} mb="md">Roadmap</Title>
          <Text size="lg" c="dimmed" mb="md">
            Future plans, upcoming features, and development priorities for mantine-select-async-paginate.
            Help shape the future by contributing or suggesting features!
          </Text>
          
          <Group gap="md">
            <Anchor
              href="https://github.com/heytulsiprasad/mantine-select-async-paginate/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="light" color="blue" leftSection={<IconBrandGithub size="0.8rem" />}>
                Report Issues
              </Badge>
            </Anchor>
            <Anchor
              href="https://github.com/heytulsiprasad/mantine-select-async-paginate/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="light" color="green" leftSection={<IconGitBranch size="0.8rem" />}>
                Feature Requests
              </Badge>
            </Anchor>
          </Group>
        </div>

        {/* Current Version */}
        <Paper shadow="sm" p="lg" withBorder>
          <Group justify="space-between" align="center" mb="md">
            <Title order={2}>Current Release</Title>
            <Badge size="lg" color="green">v0.2.0</Badge>
          </Group>
          
          <Text mb="md" c="dimmed">
            Released with comprehensive multi-select support and advanced features.
          </Text>
          
          <List spacing="sm" icon={<IconCheck size="1rem" color="green" />}>
            <List.Item>AsyncPaginateMultiSelect component</List.Item>
            <List.Item>Multiple prop support on single component</List.Item>
            <List.Item>maxSelectedValues and excludeSelected props</List.Item>
            <List.Item>onLoadMore callback</List.Item>
            <List.Item>Enhanced TypeScript generics</List.Item>
            <List.Item>Improved documentation with real API examples</List.Item>
          </List>
        </Paper>

        {/* Development Progress */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Development Progress</Title>
          
          <Stack gap="md">
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>Core Features</Text>
                <Text size="sm" c="dimmed">100%</Text>
              </Group>
              <Progress value={100} color="green" />
            </div>
            
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>Documentation</Text>
                <Text size="sm" c="dimmed">95%</Text>
              </Group>
              <Progress value={95} color="blue" />
            </div>
            
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>Testing Coverage</Text>
                <Text size="sm" c="dimmed">75%</Text>
              </Group>
              <Progress value={75} color="orange" />
            </div>
            
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>Performance Optimization</Text>
                <Text size="sm" c="dimmed">80%</Text>
              </Group>
              <Progress value={80} color="purple" />
            </div>
          </Stack>
        </Paper>

        {/* Timeline */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Development Timeline</Title>
          
          <Timeline active={2} bulletSize={24} lineWidth={2}>
            <Timeline.Item
              bullet={<IconCheck size={12} />}
              title="v0.1.0 - Initial Release"
              color="green"
            >
              <Text c="dimmed" size="sm">Basic async pagination select</Text>
              <Text c="dimmed" size="sm">Single select support</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconCheck size={12} />}
              title="v0.2.0 - Multi-Select Support"
              color="green"
            >
              <Text c="dimmed" size="sm">AsyncPaginateMultiSelect component</Text>
              <Text c="dimmed" size="sm">Enhanced TypeScript support</Text>
              <Text c="dimmed" size="sm">Advanced customization options</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconClock size={12} />}
              title="v0.3.0 - Performance & UX"
              color="blue"
            >
              <Text c="dimmed" size="sm">Virtualization for large datasets</Text>
              <Text c="dimmed" size="sm">Infinite scroll improvements</Text>
              <Text c="dimmed" size="sm">Better mobile experience</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconStar size={12} />}
              title="v0.4.0 - Advanced Features"
              color="gray"
            >
              <Text c="dimmed" size="sm">Grouping support</Text>
              <Text c="dimmed" size="sm">Creatable options</Text>
              <Text c="dimmed" size="sm">Advanced filtering</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconRocket size={12} />}
              title="v1.0.0 - Stable Release"
              color="gray"
            >
              <Text c="dimmed" size="sm">Full test coverage</Text>
              <Text c="dimmed" size="sm">Performance benchmarks</Text>
              <Text c="dimmed" size="sm">Long-term support</Text>
            </Timeline.Item>
          </Timeline>
        </Paper>

        {/* Upcoming Features */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Planned Features</Title>
          
          <Stack gap="md">
            <div>
              <Group gap="sm" mb="xs">
                <IconCode size="1.2rem" />
                <Text fw={500}>High Priority</Text>
                <Badge size="sm" color="red">Next Release</Badge>
              </Group>
              <List spacing="sm" ml="xl">
                <List.Item>
                  <Text>Virtualization support for rendering thousands of options efficiently</Text>
                </List.Item>
                <List.Item>
                  <Text>Infinite scroll instead of &quot;Load more&quot; button option</Text>
                </List.Item>
                <List.Item>
                  <Text>Better accessibility with ARIA announcements</Text>
                </List.Item>
                <List.Item>
                  <Text>Comprehensive test suite with React Testing Library</Text>
                </List.Item>
              </List>
            </div>

            <div>
              <Group gap="sm" mb="xs">
                <IconRocket size="1.2rem" />
                <Text fw={500}>Medium Priority</Text>
                <Badge size="sm" color="orange">v0.4.0</Badge>
              </Group>
              <List spacing="sm" ml="xl">
                <List.Item>
                  <Text>Option grouping with headers</Text>
                </List.Item>
                <List.Item>
                  <Text>Creatable options (allow users to add new options)</Text>
                </List.Item>
                <List.Item>
                  <Text>Advanced filtering with multiple criteria</Text>
                </List.Item>
                <List.Item>
                  <Text>Custom dropdown positioning strategies</Text>
                </List.Item>
                <List.Item>
                  <Text>Server-side validation support</Text>
                </List.Item>
              </List>
            </div>

            <div>
              <Group gap="sm" mb="xs">
                <IconStar size="1.2rem" />
                <Text fw={500}>Future Considerations</Text>
                <Badge size="sm" color="blue">Research</Badge>
              </Group>
              <List spacing="sm" ml="xl">
                <List.Item>
                  <Text>React Native support</Text>
                </List.Item>
                <List.Item>
                  <Text>Built-in data fetching with SWR/React Query</Text>
                </List.Item>
                <List.Item>
                  <Text>Keyboard navigation improvements</Text>
                </List.Item>
                <List.Item>
                  <Text>Custom dropdown portal support</Text>
                </List.Item>
                <List.Item>
                  <Text>Drag and drop for reordering multi-select</Text>
                </List.Item>
              </List>
            </div>
          </Stack>
        </Paper>

        {/* Known Issues */}
        <Paper shadow="sm" p="lg" withBorder>
          <Group gap="sm" mb="md">
            <IconBug size="1.5rem" />
            <Title order={2}>Known Issues</Title>
          </Group>
          
          <List spacing="sm">
            <List.Item>
              <Text>Dropdown position may be incorrect in certain scroll containers</Text>
              <Text size="sm" c="dimmed">Workaround: Use portal prop when available</Text>
            </List.Item>
            <List.Item>
              <Text>Performance degradation with 1000+ loaded options</Text>
              <Text size="sm" c="dimmed">Fix planned: Virtualization in v0.3.0</Text>
            </List.Item>
            <List.Item>
              <Text>Search highlight not implemented</Text>
              <Text size="sm" c="dimmed">Enhancement planned for future release</Text>
            </List.Item>
          </List>
        </Paper>

        {/* Contributing */}
        <Paper shadow="sm" p="lg" withBorder>
          <Title order={2} mb="md">Contributing</Title>
          
          <Text mb="md">
            We welcome contributions! Here&apos;s how you can help:
          </Text>
          
          <List spacing="md">
            <List.Item>
              <Text fw={500}>Report Bugs</Text>
              <Text size="sm" c="dimmed">
                Found an issue? Please report it on our{' '}
                <Anchor href="https://github.com/heytulsiprasad/mantine-select-async-paginate/issues" target="_blank">
                  GitHub Issues
                </Anchor>
              </Text>
            </List.Item>
            
            <List.Item>
              <Text fw={500}>Suggest Features</Text>
              <Text size="sm" c="dimmed">
                Have an idea? Start a discussion on{' '}
                <Anchor href="https://github.com/heytulsiprasad/mantine-select-async-paginate/discussions" target="_blank">
                  GitHub Discussions
                </Anchor>
              </Text>
            </List.Item>
            
            <List.Item>
              <Text fw={500}>Submit Pull Requests</Text>
              <Text size="sm" c="dimmed">
                Code contributions are always welcome. Please read our contributing guidelines first.
              </Text>
            </List.Item>
            
            <List.Item>
              <Text fw={500}>Improve Documentation</Text>
              <Text size="sm" c="dimmed">
                Help us improve docs, add examples, or fix typos.
              </Text>
            </List.Item>
          </List>
        </Paper>

        {/* Feature Request */}
        <Alert icon={<IconRocket size="1rem" />} color="blue" variant="light">
          <Text fw={500} mb="xs">Have a feature request?</Text>
          <Text size="sm">
            We&apos;d love to hear your ideas! Please open a discussion on GitHub or reach out to the maintainers.
            Your feedback helps shape the future of this library.
          </Text>
        </Alert>
      </Stack>
    </Container>
  );
}