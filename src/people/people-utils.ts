import { MediaType } from '@/medias/media-enums';
import { isOfType } from '@/common/CommonUtils';
import { Person } from './people-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPerson(value: any): value is Person {
  return (
    value.media_type === MediaType.PERSON ||
    isOfType<Person>(value, ['name', 'gender'])
  );
}
