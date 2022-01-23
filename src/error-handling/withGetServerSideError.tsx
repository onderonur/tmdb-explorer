import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ServerSideError } from './ErrorHandlingTypes';

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
        statusCode: (err as ServerSideError).statusCode,
        message: (err as ServerSideError).message,
      };
      return { props: { error } };
    }
  };
}
