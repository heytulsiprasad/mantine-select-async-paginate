import { forwardRef, useCallback, useEffect, useRef } from 'react';
import {
  Select,
  SelectProps,
  ComboboxItem,
  Loader,
  Text,
  Group,
  Box,
} from '@mantine/core';
import { useAsyncOptions } from './hooks/useAsyncOptions';
import { AsyncPaginateSelectProps } from './types';

export const AsyncPaginateSelect = forwardRef<
  HTMLInputElement,
  AsyncPaginateSelectProps
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
      ...rest
    },
    ref
  ) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
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
      }
    }, [loading, hasMore, loadMore]);

    // Attach scroll listener to dropdown
    useEffect(() => {
      const dropdown = dropdownRef.current;
      if (!dropdown) return;

      dropdown.addEventListener('scroll', handleScroll);
      return () => dropdown.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Prepare data for Select component
    const selectData: ComboboxItem[] = [...options];

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
    const customRenderOption: SelectProps['renderOption'] = useCallback(
      ({ option, ...others }: { option: ComboboxItem; [key: string]: any }) => {
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

        return (
          <Text size="sm" {...others}>
            {option.label}
          </Text>
        );
      },
      [loadMore, loadingMessage, renderOption]
    );

    // Handle option selection
    const handleChange = useCallback(
      (val: string | null, option: ComboboxItem | null) => {
        // Ignore special options
        if (val === '__loading__' || val === '__load_more__') {
          return;
        }
        if (onChange) {
          onChange(val, option);
        }
      },
      [onChange]
    );

    // Show loading state in dropdown if no options loaded yet
    const nothingFoundMessage = loading
      ? loadingMessage
      : error
      ? error.message
      : noOptionsMessage;

    return (
      <Select
        ref={ref}
        value={value}
        onChange={handleChange}
        data={selectData}
        searchable
        searchValue={undefined}
        onSearchChange={handleSearch}
        nothingFoundMessage={nothingFoundMessage}
        renderOption={customRenderOption}
        onDropdownOpen={() => {
          onDropdownOpen?.();
          // Set ref to dropdown when it opens
          setTimeout(() => {
            const dropdown = document.querySelector(
              '.mantine-Select-dropdown'
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
        rightSection={loading && options.length === 0 ? <Loader size="xs" /> : undefined}
        {...rest}
      />
    );
  }
);

AsyncPaginateSelect.displayName = 'AsyncPaginateSelect';