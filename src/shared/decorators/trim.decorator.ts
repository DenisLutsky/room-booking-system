import { Transform } from 'class-transformer';

export const Trim = (): PropertyDecorator => {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }

    if (Array.isArray(value)) {
      return value.map((item: unknown) => {
        if (typeof item === 'string') {
          return item.trim();
        }

        return item;
      });
    }

    return value;
  });
};
