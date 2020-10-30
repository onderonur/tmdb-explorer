import React from 'react';
import { GetServerSideProps, NextPage, GetServerSidePropsContext } from 'next';
import { Maybe } from '@/modules/shared/SharedTypes';
import ErrorMessage from '@/modules/errors/ErrorMessage';

interface ServerSideError {
  statusCode: number;
  message: string;
}

export type ServerSideProps<Data> = {
  initialData?: Maybe<Data>;
  error?: Maybe<ServerSideError>;
};

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Q = any;

export function withGetServerSideError<P /* Q */>(
  getServerSideFn: GetServerSideProps<P, Q>,
) {
  return async function wrappedGetServerSideProps(
    ctx: GetServerSidePropsContext<Q>,
  ) {
    try {
      const result = await getServerSideFn(ctx);
      return result;
    } catch (err) {
      const error: ServerSideError = {
        statusCode: err.statusCode,
        message: err.message,
      };
      return { props: { error } };
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withError<P extends ServerSideProps<any>>(Page: NextPage<P>) {
  return function WrappedPage(props: P) {
    const { error } = props;
    if (error) {
      return (
        <ErrorMessage statusCode={error.statusCode} message={error.message} />
      );
    }

    return <Page {...props} />;
  };
}

export default withError;
