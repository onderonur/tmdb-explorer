'use client';

import { httpClient } from '@/http-client/httpClient';
import { SWRConfig } from 'swr';

type BaseSWRConfigProps = React.PropsWithChildren;

export default function BaseSWRConfig({ children }: BaseSWRConfigProps) {
  return (
    <SWRConfig
      value={{
        fetcher: httpClient.get,
      }}
    >
      {children}
    </SWRConfig>
  );
}
