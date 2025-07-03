import { forwardRef, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  Select,
  MultiSelect,
  SelectProps,
  MultiSelectProps as MantineMultiSelectProps,
  ComboboxItem,
  Loader,
  Text,
  Group,
  Box,
  rem,
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
      onLoadMore,
      multiple = false,
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
    const selectRef = useRef<HTMLDivElement | null>(null);
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

    // Separate selected and unselected options for multi-select mode
    let selectData: ComboboxItem[] = [];
    
    if (multiple && Array.isArray(value)) {
      const selectedOptions: ComboboxItem[] = [];
      const unselectedOptions: ComboboxItem[] = [];

      options.forEach(option => {
        if (value.includes(option.value)) {
          selectedOptions.push(option);
        } else {
          unselectedOptions.push(option);
        }
      });

      // Add any selected values that might not be in current options
      value.forEach(val => {
        if (!selectedOptions.find(opt => opt.value === val) && selectedOptionsMap[val]) {
          selectedOptions.push(selectedOptionsMap[val]);
        }
      });

      // Always show selected items at the top
      selectData = [...selectedOptions, ...unselectedOptions];
    } else {
      // For single select, just use options as is
      selectData = [...options];
    }

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
    const customRenderOption: SelectProps['renderOption'] | MantineMultiSelectProps['renderOption'] = useCallback(
      ({ option, ...others }: { option: ComboboxItem; [key: string]: any }) => {
        // Manually check if option is selected for multi-select mode
        const isSelected = multiple && Array.isArray(value) ? value.includes(option.value) : false;
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

        // Default render with checkmark for selected items in multi-select mode
        if (multiple && isSelected) {
          return (
            <Group flex="1" gap="xs" {...others}>
              <Text size="sm">{option.label}</Text>
              <Text
                size="sm"
                c="blue"
                fw={700}
                style={{ marginInlineStart: 'auto', fontSize: rem(16) }}
              >
                ✓
              </Text>
            </Group>
          );
        }

        return (
          <Text size="sm" {...others}>
            {option.label}
          </Text>
        );
      },
      [loadMore, loadingMessage, renderOption, onLoadMore, multiple, value]
    );

    // Handle option selection
    const handleChange = useCallback(
      (val: string | null | string[], option?: ComboboxItem | null) => {
        if (multiple) {
          // Handle multi-select
          const values = val as string[];
          // Filter out special options
          const cleanValues = values.filter(v => v !== '__loading__' && v !== '__load_more__');
          
          // Respect maxSelectedValues limit
          const finalValues = maxSelectedValues 
            ? cleanValues.slice(0, maxSelectedValues)
            : cleanValues;
          
          if (onChange) {
            (onChange as (value: string[]) => void)(finalValues);
          }
        } else {
          // Handle single select
          const singleVal = val as string | null;
          // Ignore special options
          if (singleVal === '__loading__' || singleVal === '__load_more__') {
            return;
          }
          if (onChange) {
            (onChange as (value: string | null, option: ComboboxItem | null) => void)(singleVal, option || null);
          }
        }
      },
      [onChange, multiple, maxSelectedValues]
    );

    // Show loading state in dropdown if no options loaded yet
    const nothingFoundMessage = loading
      ? loadingMessage
      : error
      ? error.message
      : noOptionsMessage;

    // Check if max selections reached (for multi-select mode)
    const isMaxReached = multiple && maxSelectedValues && Array.isArray(value) && value.length >= maxSelectedValues;

    // Calculate how many values are hidden (for multi-select mode)
    const hiddenCount = useMemo(() => {
      if (!multiple || !maxDisplayedValues || !Array.isArray(value) || value.length <= maxDisplayedValues) {
        return 0;
      }
      return value.length - maxDisplayedValues;
    }, [multiple, maxDisplayedValues, value]);

    // Use effect to manipulate pills after render (for multi-select mode)
    useEffect(() => {
      if (!multiple || !maxDisplayedValues || !Array.isArray(value) || value.length <= maxDisplayedValues) return;
      
      // Find the MultiSelect input element
      const inputElement = selectRef.current || document.querySelector('.mantine-MultiSelect-root');
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
    }, [multiple, value, maxDisplayedValues, hiddenCount, hiddenCountStyles, hiddenCountClassName]);


    if (multiple) {
      const multiSelectRest = rest as Omit<MantineMultiSelectProps, 'data' | 'searchable' | 'onChange' | 'value'>;
      return (
        <Box ref={selectRef as any}>
          <MultiSelect
            ref={ref}
          value={(value as string[]) || []}
          onChange={handleChange}
          data={selectData}
          searchable
          searchValue={undefined}
          onSearchChange={handleSearch}
          nothingFoundMessage={nothingFoundMessage}
          renderOption={customRenderOption}
          disabled={isMaxReached || multiSelectRest.disabled}
          styles={{
            ...((typeof multiSelectRest.styles === 'object' ? multiSelectRest.styles : {}) || {}),
          }}
          classNames={{
            ...((typeof multiSelectRest.classNames === 'object' ? multiSelectRest.classNames : {}) || {}),
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
          rightSection={loading && options.length === 0 ? <Loader size="xs" /> : undefined}
          {...multiSelectRest}
          />
        </Box>
      );
    }

    const selectRest = rest as Omit<SelectProps, 'data' | 'searchable' | 'onChange' | 'value'>;
    return (
      <Select
        ref={ref}
        value={value as string | null}
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
        rightSection={loading && options?.length === 0 ? <Loader size="xs" /> : undefined}
        {...selectRest}
      />
    );
  }
);

AsyncPaginateSelect.displayName = 'AsyncPaginateSelect';