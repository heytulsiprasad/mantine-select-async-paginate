import { useState, useEffect, useRef, useCallback } from 'react';
import { ComboboxItem } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { LoadOptionsFunction, OptionsCache } from '../types';

interface UseAsyncOptionsProps<Additional = any> {
  loadOptions: LoadOptionsFunction<Additional>;
  defaultOptions?: boolean | ComboboxItem[];
  cacheOptions?: boolean;
  debounceTimeout?: number;
  additional?: Additional;
  minSearchLength?: number;
}

interface UseAsyncOptionsReturn {
  options: ComboboxItem[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  handleSearch: (search: string) => void;
  clearCache: () => void;
}

export function useAsyncOptions<Additional = any>({
  loadOptions,
  defaultOptions = false,
  cacheOptions = false,
  debounceTimeout = 300,
  additional,
  minSearchLength = 0,
}: UseAsyncOptionsProps<Additional>): UseAsyncOptionsReturn {
  const [options, setOptions] = useState<ComboboxItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  
  const cacheRef = useRef<OptionsCache>({});
  const additionalRef = useRef<Additional | undefined>(additional);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Update additional ref when it changes
  useEffect(() => {
    additionalRef.current = additional;
  }, [additional]);
  
  // Load options function
  const loadOptionsInternal = useCallback(
    async (search: string, loadMore = false) => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Check cache
      const cacheKey = `${search}-${loadMore ? options.length : 0}`;
      if (cacheOptions && cacheRef.current[cacheKey]) {
        const cached = cacheRef.current[cacheKey];
        setOptions(loadMore ? [...options, ...cached.options] : cached.options);
        setHasMore(cached.hasMore);
        setError(null);
        return;
      }
      
      // Create new abort controller
      abortControllerRef.current = new AbortController();
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await loadOptions(
          search,
          loadMore ? options : [],
          additionalRef.current
        );
        
        // Check if request was aborted
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }
        
        const newOptions = loadMore
          ? [...options, ...result.options]
          : result.options;
        
        setOptions(newOptions);
        setHasMore(result.hasMore);
        
        // Update additional ref if returned
        if (result.additional !== undefined) {
          additionalRef.current = result.additional;
        }
        
        // Cache results
        if (cacheOptions) {
          cacheRef.current[cacheKey] = {
            options: result.options,
            hasMore: result.hasMore,
            additional: result.additional,
          };
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err : new Error('Failed to load options'));
      } finally {
        setLoading(false);
      }
    },
    [options, loadOptions, cacheOptions]
  );
  
  // Debounced search handler
  const debouncedLoadOptions = useDebouncedCallback(
    (search: string) => {
      if (search.length >= minSearchLength) {
        loadOptionsInternal(search, false);
      } else if (search.length === 0 && defaultOptions) {
        // Load default options
        loadOptionsInternal('', false);
      } else {
        setOptions([]);
        setHasMore(false);
      }
    },
    debounceTimeout
  );
  
  // Handle search
  const handleSearch = useCallback(
    (search: string) => {
      setCurrentSearch(search);
      debouncedLoadOptions(search);
    },
    [debouncedLoadOptions]
  );
  
  // Load more handler
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadOptionsInternal(currentSearch, true);
    }
  }, [loading, hasMore, currentSearch, loadOptionsInternal]);
  
  // Clear cache
  const clearCache = useCallback(() => {
    cacheRef.current = {};
  }, []);
  
  // Load default options on mount
  useEffect(() => {
    if (defaultOptions === true) {
      loadOptionsInternal('', false);
    } else if (Array.isArray(defaultOptions)) {
      setOptions(defaultOptions);
    }
    
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return {
    options,
    loading,
    error,
    hasMore,
    loadMore,
    handleSearch,
    clearCache,
  };
}