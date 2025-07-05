'use client';

import { useState } from 'react';
import { Stack, Title, Text, Paper, Group, Code, Alert, Badge, ColorInput, Select, Textarea, ComboboxItem, ComboboxLikeRenderOptionInput } from '@mantine/core';
import { IconPalette, IconInfoCircle, IconAdjustments, IconBrush } from '@tabler/icons-react';
import { AsyncPaginateSelect, AsyncPaginateMultiSelect, LoadOptionsResult } from 'mantine-select-async-paginate';

export function CustomizationExamples() {
  // Customization states
  const [styledValue, setStyledValue] = useState<string | null>(null);
  const [themedMulti, setThemedMulti] = useState<string[]>([]);
  const [messagesValue, setMessagesValue] = useState<string | null>(null);
  
  // Customization options
  const [primaryColor, setPrimaryColor] = useState('#228be6');
  const [variant, setVariant] = useState<string>('default');
  const [size, setSize] = useState<string>('md');
  const [radius, setRadius] = useState<string>('sm');
  const [loadingMessage, setLoadingMessage] = useState('Loading awesome options...');
  const [noOptionsMessage, setNoOptionsMessage] = useState('No options found');
  const [loadMoreText, setLoadMoreText] = useState('Load more items');

  // Color-themed data generator
  const generateThemedData = async (
    search: string,
    loadedOptions: unknown[],
    additional?: { page: number }
  ): Promise<LoadOptionsResult<{ page: number }>> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const colors = [
      'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Cyan',
      'Teal', 'Indigo', 'Violet', 'Lime', 'Amber', 'Emerald', 'Rose', 'Sky'
    ];

    const currentPage = additional?.page || 0;
    const pageSize = 8;

    const allData = colors.flatMap(color => 
      Array.from({ length: 5 }, (_, i) => ({
        id: `${color.toLowerCase()}-${i + 1}`,
        name: `${color} Shade ${i + 1}`,
        color: color.toLowerCase(),
        hex: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        category: i < 2 ? 'Light' : i < 4 ? 'Medium' : 'Dark'
      }))
    );

    const filtered = search
      ? allData.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.color.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
        )
      : allData;

    const start = currentPage * pageSize;
    const end = start + pageSize;
    const pageData = filtered.slice(start, end);

    return {
      options: pageData.map(item => ({
        value: item.id,
        label: item.name,
        group: item.category,
        data: item,
      })),
      hasMore: end < filtered.length,
      additional: { page: currentPage + 1 },
    };
  };

  // Simple themed data for basic customization
  const loadBasicThemedData = async (
    search: string,
    loadedOptions: unknown[],
    additional?: { page: number }
  ): Promise<LoadOptionsResult<{ page: number }>> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    const themes = [
      'Ocean Breeze', 'Sunset Glow', 'Forest Whisper', 'Mountain Peak',
      'Desert Sand', 'Arctic Ice', 'Tropical Paradise', 'Urban Nights',
      'Vintage Classic', 'Modern Minimal', 'Retro Future', 'Natural Earth'
    ];

    const currentPage = additional?.page || 0;
    const pageSize = 6;

    const filtered = search
      ? themes.filter(theme =>
          theme.toLowerCase().includes(search.toLowerCase())
        )
      : themes;

    const start = currentPage * pageSize;
    const end = start + pageSize;
    const pageData = filtered.slice(start, end);

    return {
      options: pageData.map((theme, index) => ({
        value: `theme-${start + index + 1}`,
        label: theme,
      })),
      hasMore: end < filtered.length,
      additional: { page: currentPage + 1 },
    };
  };

  // Custom color-based render option
  const colorRenderOption = (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => {
    const { option, ...others } = item;
    const optionWithData = option as ComboboxItem & { data?: { hex: string; category: string } };
    const data = optionWithData.data;
    if (!data) return <div {...others}>{option.label}</div>;
    
    return (
      <div {...others} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div 
          style={{ 
            width: '16px', 
            height: '16px', 
            borderRadius: '4px', 
            backgroundColor: data.hex,
            border: '1px solid #ddd',
            flexShrink: 0
          }} 
        />
        <div>
          <div style={{ fontWeight: 500 }}>{option.label}</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            {data.hex} • {data.category}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="md">Customization & Theming</Title>
        <Text c="dimmed" mb="xl">
          Explore extensive customization options including styling, theming, messages, 
          and custom rendering to match your application&apos;s design system.
        </Text>
      </div>

      {/* Customization Controls */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={3}>Customization Controls</Title>
            <IconAdjustments size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Adjust these controls to see how they affect the components below.
          </Text>

          <Group grow>
            <ColorInput
              label="Primary Color"
              value={primaryColor}
              onChange={setPrimaryColor}
              placeholder="Pick a color"
            />
            <Select
              label="Variant"
              value={variant}
              onChange={(value) => setVariant(value || 'default')}
              data={['default', 'filled', 'outline', 'unstyled']}
            />
            <Select
              label="Size"
              value={size}
              onChange={(value) => setSize(value || 'md')}
              data={['xs', 'sm', 'md', 'lg', 'xl']}
            />
            <Select
              label="Radius"
              value={radius}
              onChange={(value) => setRadius(value || 'sm')}
              data={['xs', 'sm', 'md', 'lg', 'xl']}
            />
          </Group>

          <Group>
          </Group>

          <Group grow>
            <Textarea
              label="Loading Message"
              value={loadingMessage}
              onChange={(event) => setLoadingMessage(event.currentTarget.value)}
              minRows={1}
              maxRows={2}
            />
            <Textarea
              label="No Options Message"
              value={noOptionsMessage}
              onChange={(event) => setNoOptionsMessage(event.currentTarget.value)}
              minRows={1}
              maxRows={2}
            />
            <Textarea
              label="Load More Text"
              value={loadMoreText}
              onChange={(event) => setLoadMoreText(event.currentTarget.value)}
              minRows={1}
              maxRows={2}
            />
          </Group>
        </Stack>
      </Paper>

      {/* Styled Single Select */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <div>
              <Title order={3}>Styled Single Select</Title>
              <Group gap="xs" mt={4}>
                <Badge size="sm" color="blue">Dynamic Styling</Badge>
                <Badge size="sm" color="green">Custom Messages</Badge>
                <Badge size="sm" color="orange">Mantine Props</Badge>
              </Group>
            </div>
            <IconPalette size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Single select with customizable styling, messages, and Mantine component props.
            All settings from the controls above are applied here.
          </Text>

          <AsyncPaginateSelect
            label="Customized Theme Selector"
            placeholder="Choose your theme..."
            value={styledValue}
            onChange={setStyledValue}
            loadOptions={loadBasicThemedData}
            defaultOptions
            cacheOptions
            clearable
            variant={variant as 'default' | 'filled' | 'outline' | 'unstyled'}
            size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
            radius={radius as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
            loadingMessage={loadingMessage}
            noOptionsMessage={noOptionsMessage}
            loadMoreText={loadMoreText}
            description="Fully customizable styling and messages"
            styles={{
              input: {
                borderColor: primaryColor,
                '&:focus': {
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 2px ${primaryColor}20`,
                },
              },
              dropdown: {
                borderColor: primaryColor,
              }
            }}
          />

          {styledValue && (
            <Alert icon={<IconInfoCircle size="1rem" />} color="green" variant="light">
              Selected theme: <Code>{styledValue}</Code>
            </Alert>
          )}

          <Code block>{`// Styled component with custom properties
<AsyncPaginateSelect
  variant="${variant}"
  size="${size}"
  radius="${radius}"
  loadingMessage="${loadingMessage}"
  noOptionsMessage="${noOptionsMessage}"
  loadMoreText="${loadMoreText}"
  styles={{
    input: {
      borderColor: '${primaryColor}',
      '&:focus': {
        borderColor: '${primaryColor}',
        boxShadow: \`0 0 0 2px \${primaryColor}20\`,
      },
    },
    dropdown: {
      borderColor: '${primaryColor}',
    }
  }}
  loadOptions={loadOptions}
/>`}</Code>
        </Stack>
      </Paper>

      {/* Color-Themed Multi Select */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <div>
              <Title order={3}>Color-Themed Multi Select</Title>
              <Group gap="xs" mt={4}>
                <Badge size="sm" color="purple">Custom Render</Badge>
                <Badge size="sm" color="blue">Color Swatches</Badge>
                <Badge size="sm" color="green">Grouped Options</Badge>
              </Group>
            </div>
            <IconBrush size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Multi-select with custom color rendering, showing color swatches and grouped options.
            Demonstrates advanced renderOption customization.
          </Text>

          <AsyncPaginateMultiSelect
            label="Color Palette Selector"
            placeholder="Select colors for your palette..."
            value={themedMulti}
            onChange={setThemedMulti}
            loadOptions={generateThemedData}
            renderOption={colorRenderOption}
            defaultOptions
            cacheOptions
            clearable
            maxSelectedValues={6}
            excludeSelected={true}
            variant={variant as 'default' | 'filled' | 'outline' | 'unstyled'}
            size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
            radius={radius as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
            loadingMessage={loadingMessage}
            noOptionsMessage={noOptionsMessage}
            loadMoreText={loadMoreText}
            description="Custom color swatches with hex values and categories"
            styles={{
              input: {
                borderColor: primaryColor,
                '&:focus': {
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 2px ${primaryColor}20`,
                },
              }
            }}
          />

          {themedMulti.length > 0 && (
            <Alert icon={<IconInfoCircle size="1rem" />} color="blue" variant="light">
              Selected colors ({themedMulti.length}/6): <Code>{themedMulti.join(', ')}</Code>
            </Alert>
          )}

          <Code block>{`// Custom color render with swatches
const colorRenderOption = ({ option, ...others }) => {
  const data = option.data;
  if (!data) return <div {...others}>{option.label}</div>;
  
  return (
    <div {...others} style={{ 
      padding: '8px 12px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px' 
    }}>
      <div style={{ 
        width: '16px', 
        height: '16px', 
        borderRadius: '4px', 
        backgroundColor: data.hex,
        border: '1px solid #ddd',
        flexShrink: 0
      }} />
      <div>
        <div style={{ fontWeight: 500 }}>{option.label}</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>
          {data.hex} • {data.category}
        </div>
      </div>
    </div>
  );
};

<AsyncPaginateMultiSelect
  renderOption={colorRenderOption}
  loadOptions={loadColorData}
/>`}</Code>
        </Stack>
      </Paper>

      {/* Message Customization */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <div>
              <Title order={3}>Message Customization</Title>
              <Group gap="xs" mt={4}>
                <Badge size="sm" color="orange">Custom Messages</Badge>
                <Badge size="sm" color="blue">Error Handling</Badge>
                <Badge size="sm" color="green">Loading States</Badge>
              </Group>
            </div>
            <IconInfoCircle size="1.5rem" />
          </Group>
          
          <Text size="sm" c="dimmed">
            Demonstrates custom loading, error, and empty state messages.
            Try different scenarios to see how messages appear.
          </Text>

          <AsyncPaginateSelect
            label="Message Customization Demo"
            placeholder="Test custom messages..."
            value={messagesValue}
            onChange={setMessagesValue}
            loadOptions={loadBasicThemedData}
            defaultOptions
            cacheOptions
            clearable
            minSearchLength={0}
            loadingMessage={loadingMessage}
            noOptionsMessage={noOptionsMessage}
            loadMoreText={loadMoreText}
            description="Custom messages for all interaction states"
          />

          <Code block>{`// Message customization options
<AsyncPaginateSelect
  loadingMessage="Loading awesome options..."
  noOptionsMessage="No options found"
  loadMoreText="Load more items"
  nothingFoundMessage="Try a different search term"
  
  // For error handling in loadOptions:
  loadOptions={async (search, loadedOptions, additional) => {
    try {
      // API call
    } catch (error) {
      // Return empty with error message
      return { 
        options: [], 
        hasMore: false,
        error: { message: 'Failed to load data' }
      };
    }
  }}
/>`}</Code>
        </Stack>
      </Paper>

      {/* All Mantine Props */}
      <Paper shadow="sm" p="lg" withBorder>
        <Title order={3} mb="md">Available Mantine Props</Title>
        <Text mb="md" c="dimmed">
          All standard Mantine Select/MultiSelect props are supported:
        </Text>
        
        <Group gap="xs" mb="md">
          <Badge variant="light">label</Badge>
          <Badge variant="light">placeholder</Badge>
          <Badge variant="light">description</Badge>
          <Badge variant="light">error</Badge>
          <Badge variant="light">required</Badge>
          <Badge variant="light">disabled</Badge>
          <Badge variant="light">variant</Badge>
          <Badge variant="light">size</Badge>
          <Badge variant="light">radius</Badge>
          <Badge variant="light">leftSection</Badge>
          <Badge variant="light">rightSection</Badge>
          <Badge variant="light">styles</Badge>
          <Badge variant="light">classNames</Badge>
          <Badge variant="light">wrapperProps</Badge>
        </Group>

        <Code block>{`// Full prop support example
<AsyncPaginateSelect
  // Basic props
  label="Advanced Select"
  placeholder="Type to search..."
  description="With full Mantine prop support"
  error={error}
  required
  disabled={isDisabled}
  
  // Styling props
  variant="filled"
  size="lg"
  radius="md"
  
  // Sections
  leftSection={<IconSearch size="1rem" />}
  rightSection={<IconChevronDown size="1rem" />}
  
  // Custom styling
  styles={{
    input: { fontWeight: 500 },
    dropdown: { border: '2px solid blue' }
  }}
  classNames={{
    input: 'my-custom-input',
    dropdown: 'my-custom-dropdown'
  }}
  
  // Wrapper props
  wrapperProps={{ 'data-testid': 'select-wrapper' }}
  
  // Async props
  loadOptions={loadOptions}
  defaultOptions
  cacheOptions
  multiple={true}
  maxSelectedValues={5}
  excludeSelected={true}
  onLoadMore={() => console.log('Load more')}
/>`}</Code>
      </Paper>

      {/* Styling Best Practices */}
      <Paper shadow="sm" p="lg" withBorder>
        <Title order={3} mb="md">Styling Best Practices</Title>
        <Stack gap="sm">
          <Text><strong>Use Mantine&apos;s Design System:</strong> Leverage built-in variants, sizes, and themes</Text>
          <Text><strong>Custom Styles:</strong> Use the styles prop for component-specific customization</Text>
          <Text><strong>CSS-in-JS:</strong> Utilize Mantine&apos;s emotion-based styling system</Text>
          <Text><strong>Theme Integration:</strong> Align with your application&apos;s color scheme</Text>
          <Text><strong>Responsive Design:</strong> Consider different screen sizes for mobile</Text>
          <Text><strong>Accessibility:</strong> Maintain proper contrast ratios and focus states</Text>
          <Text><strong>Performance:</strong> Use CSS variables for dynamic theming</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}