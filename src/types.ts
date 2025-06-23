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

export interface AsyncPaginateSelectProps<Additional = any>
  extends Omit<SelectProps, 'data' | 'searchable'> {
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
}

export interface OptionsCache {
  [key: string]: {
    options: ComboboxItem[];
    hasMore: boolean;
    additional?: any;
  };
}