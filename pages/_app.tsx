import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/apolloClient';
import 'styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
