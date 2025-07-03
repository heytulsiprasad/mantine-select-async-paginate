import { ComboboxItem, SelectProps } from '@mantine/core';

export interface LoadOptionsResult<Additional = any> {
  options: ComboboxItem[];
  hasMore: boolean;
  additional?: Additional;
}

export type LoadOptionsFunction<Additional = any> = (
  search: string,
  loadedOptions: ComboboxItem[],
  additional?: Additional
) => Promise<LoadOptionsResult<Additional>>;

// Base props shared between single and multi-select
interface BaseAsyncPaginateProps<Additional = any> {
  // Core async pagination props
  loadOptions: LoadOptionsFunction<Additional>;
  
  // Options loading behavior
  defaultOptions?: boolean | ComboboxItem[];
  cacheOptions?: boolean;
  
  // Timing
  debounceTimeout?: number;
  
  // Messages
  loadingMessage?: string;
  noOptionsMessage?: string;
  
  // Additional data to pass to loadOptions
  additional?: Additional;
  
  // Pagination
  loadMoreText?: string;
  
  // Minimum search length to trigger loading
  minSearchLength?: number;
  
  // Callbacks
  onLoadMore?: () => void;
  
  // Multi-select specific props
  maxSelectedValues?: number;
  excludeSelected?: boolean;
  maxDisplayedValues?: number;
  
  // Pill customization
  pillStyles?: React.CSSProperties;
  pillClassName?: string;
  hiddenCountStyles?: React.CSSProperties;
  hiddenCountClassName?: string;
}

// Single select props
interface SingleSelectProps<Additional = any>
  extends Omit<SelectProps, 'data' | 'searchable' | 'onChange' | 'multiple'>,
    BaseAsyncPaginateProps<Additional> {
  multiple?: false;
  value?: string | null;
  onChange?: (value: string | null, option: ComboboxItem | null) => void;
}

// Multi select props
interface MultiSelectProps<Additional = any>
  extends Omit<import('@mantine/core').MultiSelectProps, 'data' | 'searchable' | 'onChange'>,
    BaseAsyncPaginateProps<Additional> {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

// Union type for the main component
export type AsyncPaginateSelectProps<Additional = any> = 
  | SingleSelectProps<Additional> 
  | MultiSelectProps<Additional>;

// Dedicated multi-select component props
export interface AsyncPaginateMultiSelectProps<Additional = any>
  extends Omit<import('@mantine/core').MultiSelectProps, 'data' | 'searchable' | 'onChange'>,
    BaseAsyncPaginateProps<Additional> {
  value?: string[];
  onChange?: (value: string[]) => void;
}

export interface OptionsCache {
  [key: string]: {
    options: ComboboxItem[];
    hasMore: boolean;
    additional?: any;
  };
}