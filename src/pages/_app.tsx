import React from 'react';

import { AppProps } from "next/app";
import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

const MyApp = ({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) => {
  const [queryClient] = React.useState(() => new QueryClient());
	
	return (    
		<QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
	)
}

export default MyApp;
