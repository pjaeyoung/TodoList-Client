import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export const APOLLO_STATE_PROP_NAME: string = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:4000',
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState = null,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// initialState에 따라 apolloClient 초기화
export function useApollo(
  initialState?: any,
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
