import { Maybe } from '@/common/CommonTypes';

export interface ServerSideError {
  statusCode: number;
  message: string;
}

export type ServerSideProps = {
  error?: Maybe<ServerSideError>;
};
