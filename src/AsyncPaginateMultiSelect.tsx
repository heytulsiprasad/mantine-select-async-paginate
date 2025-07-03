import { forwardRef, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  MultiSelect,
  MultiSelectProps,
  ComboboxItem,
  Loader,
  Text,
  Group,
  Box,
  rem,
} from '@mantine/core';
import { useAsyncOptions } from './hooks/useAsyncOptions';
import { AsyncPaginateMultiSelectProps } from './types';

export const AsyncPaginateMultiSelect = forwardRef<
  HTMLInputElement,
  AsyncPaginateMultiSelectProps
>(
  (
    {
      loadOptions,
      defaultOptions = false,
      cacheOptions = false,
      debounceTimeout = 300,
      loadingMessage = 'Loading...',
      noOptionsMessage = 'No options',
      additional,
      loadMoreText = 'Load more...',
      minSearchLength = 0,
      value,
      onDropdownOpen,
      onDropdownClose,
      renderOption,
      onChange,
      onLoadMore,
      maxSelectedValues,
      excludeSelected = true,
      maxDisplayedValues,
      pillStyles,
      pillClassName,
      hiddenCountStyles,
      hiddenCountClassName,
      ...rest
    },
    ref
  ) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const multiSelectRef = useRef<HTMLDivElement | null>(null);
    const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<string, ComboboxItem>>({});
    const {
      options,
      loading,
      error,
      hasMore,
      loadMore,
      handleSearch,
    } = useAsyncOptions({
      loadOptions,
      defaultOptions,
      cacheOptions,
      debounceTimeout,
      additional,
      minSearchLength,
    });

    // Handle dropdown scroll for infinite loading
    const handleScroll = useCallback(() => {
      if (!dropdownRef.current || loading || !hasMore) return;

      const dropdown = dropdownRef.current;
      const scrollPosition = dropdown.scrollTop + dropdown.clientHeight;
      const scrollHeight = dropdown.scrollHeight;

      // Load more when scrolled to bottom (with 50px threshold)
      if (scrollHeight - scrollPosition < 50) {
        loadMore();
        onLoadMore?.();
      }
    }, [loading, hasMore, loadMore, onLoadMore]);

    // Attach scroll listener to dropdown
    useEffect(() => {
      const dropdown = dropdownRef.current;
      if (!dropdown) return;

      dropdown.addEventListener('scroll', handleScroll);
      return () => dropdown.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Update selected options map whenever options change
    useEffect(() => {
      const newMap = { ...selectedOptionsMap };
      options.forEach(option => {
        newMap[option.value] = option;
      });
      setSelectedOptionsMap(newMap);
    }, [options]);

    // Separate selected and unselected options
    const selectedOptions: ComboboxItem[] = [];
    const unselectedOptions: ComboboxItem[] = [];

    options.forEach(option => {
      if (value && value.includes(option.value)) {
        selectedOptions.push(option);
      } else {
        unselectedOptions.push(option);
      }
    });

    // Add any selected values that might not be in current options
    if (value && value.length > 0) {
      value.forEach(val => {
        if (!selectedOptions.find(opt => opt.value === val) && selectedOptionsMap[val]) {
          selectedOptions.push(selectedOptionsMap[val]);
        }
      });
    }

    // Prepare data for MultiSelect component
    // Always show selected items at the top
    const selectData: ComboboxItem[] = [
      ...selectedOptions,
      ...unselectedOptions
    ];

    // Add loading indicator at the end
    if (loading && options.length > 0) {
      selectData.push({
        value: '__loading__',
        label: loadingMessage,
        disabled: true,
      });
    }

    // Add load more option
    if (!loading && hasMore) {
      selectData.push({
        value: '__load_more__',
        label: loadMoreText,
        disabled: false,
      });
    }

    // Custom render option
    const customRenderOption: MultiSelectProps['renderOption'] = useCallback(
      ({ option, ...others }: { option: ComboboxItem; [key: string]: any }) => {
        // Manually check if option is selected
        const isSelected = value?.includes(option.value) || false;
        if (option.value === '__loading__') {
          return (
            <Group gap="xs" {...others}>
              <Loader size="xs" />
              <Text size="sm" c="dimmed">
                {option.label}
              </Text>
            </Group>
          );
        }

        if (option.value === '__load_more__') {
          return (
            <Box
              {...others}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                loadMore();
                onLoadMore?.();
              }}
              style={{ cursor: 'pointer' }}
            >
              <Text size="sm" c="blue" fw={500}>
                {option.label}
              </Text>
            </Box>
          );
        }

        // Use custom renderOption if provided
        if (renderOption) {
          return renderOption({ option, ...others });
        }

        // Default render with checkmark for selected items
        return (
          <Group flex="1" gap="xs" {...others}>
            <Text size="sm">{option.label}</Text>
            {isSelected && (
              <Text
                size="sm"
                c="blue"
                fw={700}
                style={{ marginInlineStart: 'auto', fontSize: rem(16) }}
              >
                ✓
              </Text>
            )}
          </Group>
        );
      },
      [loadMore, loadingMessage, renderOption, onLoadMore, value]
    );

    // Handle option selection
    const handleChange = useCallback(
      (val: string[]) => {
        // Filter out special options
        const cleanValues = val.filter(v => v !== '__loading__' && v !== '__load_more__');
        
        // Respect maxSelectedValues limit
        const finalValues = maxSelectedValues 
          ? cleanValues.slice(0, maxSelectedValues)
          : cleanValues;
        
        if (onChange) {
          onChange(finalValues);
        }
      },
      [onChange, maxSelectedValues]
    );

    // Show loading state in dropdown if no options loaded yet
    const nothingFoundMessage = loading
      ? loadingMessage
      : error
      ? error.message
      : noOptionsMessage;

    // Check if max selections reached
    const isMaxReached = maxSelectedValues && value && value.length >= maxSelectedValues;

    // Calculate how many values to display and how many are hidden
    const hiddenCount = useMemo(() => {
      if (!maxDisplayedValues || !value || value.length <= maxDisplayedValues) {
        return 0;
      }
      return value.length - maxDisplayedValues;
    }, [maxDisplayedValues, value]);

    // Use effect to manipulate pills after render
    useEffect(() => {
      if (!maxDisplayedValues || !value || value.length <= maxDisplayedValues) return;
      
      // Find the MultiSelect input element
      const inputElement = multiSelectRef.current || document.querySelector('.mantine-MultiSelect-root');
      if (!inputElement) return;
      
      // Find all pills
      const pills = inputElement.querySelectorAll('.mantine-MultiSelect-pill');
      
      // Hide pills beyond maxDisplayedValues
      pills.forEach((pill, index) => {
        if (index >= maxDisplayedValues) {
          (pill as HTMLElement).style.display = 'none';
        }
      });
      
      // Check if we already added the count indicator
      const existingIndicator = inputElement.querySelector('.mantine-MultiSelect-hidden-count');
      if (!existingIndicator && hiddenCount > 0) {
        // Create and insert the hidden count indicator
        const lastVisiblePill = pills[maxDisplayedValues - 1];
        if (lastVisiblePill && lastVisiblePill.parentElement) {
          const indicator = document.createElement('div');
          indicator.className = 'mantine-MultiSelect-hidden-count';
          indicator.textContent = `+${hiddenCount} more`;
          indicator.style.cssText = `
            display: inline-flex;
            align-items: center;
            padding: 0 8px;
            height: 24px;
            border-radius: 12px;
            background-color: var(--mantine-color-gray-2);
            color: var(--mantine-color-gray-7);
            font-size: 0.875rem;
            margin-left: 4px;
          `;
          if (hiddenCountStyles) {
            Object.assign(indicator.style, hiddenCountStyles);
          }
          if (hiddenCountClassName) {
            indicator.className += ` ${hiddenCountClassName}`;
          }
          lastVisiblePill.parentElement.insertBefore(indicator, lastVisiblePill.nextSibling);
        }
      } else if (existingIndicator) {
        // Update existing indicator
        existingIndicator.textContent = `+${hiddenCount} more`;
      }
    }, [value, maxDisplayedValues, hiddenCount, hiddenCountStyles, hiddenCountClassName]);


    return (
      <Box ref={multiSelectRef as any}>
        <MultiSelect
          ref={ref}
        value={value || []}
        onChange={handleChange}
        data={selectData}
        searchable
        searchValue={undefined}
        onSearchChange={handleSearch}
        nothingFoundMessage={nothingFoundMessage}
        renderOption={customRenderOption}
        disabled={isMaxReached || rest.disabled}
        styles={{
          ...((typeof rest.styles === 'object' ? rest.styles : {}) || {}),
        }}
        classNames={{
          ...((typeof rest.classNames === 'object' ? rest.classNames : {}) || {}),
          ...(pillClassName ? { pill: pillClassName } : {}),
        }}
        onDropdownOpen={() => {
          onDropdownOpen?.();
          // Set ref to dropdown when it opens
          setTimeout(() => {
            const dropdown = document.querySelector(
              '.mantine-MultiSelect-dropdown'
            ) as HTMLDivElement;
            if (dropdown) {
              dropdownRef.current = dropdown;
            }
          }, 0);
        }}
        onDropdownClose={() => {
          onDropdownClose?.();
          dropdownRef.current = null;
        }}
        rightSection={loading && options?.length === 0 ? <Loader size="xs" /> : undefined}
        {...rest}
        />
      </Box>
    );
  }
);

AsyncPaginateMultiSelect.displayName = 'AsyncPaginateMultiSelect';