export const Layout = {
  Basic: 'BASIC',
  Round: 'ROUND',
} as const;

export type Layout = (typeof Layout)[keyof typeof Layout];
