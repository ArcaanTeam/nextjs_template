# The content of this doc changes for each branch

## TODO

- Check all locales Consistency against default locale as single source of truth for messages.

## i18n boilerplate

- `./src/config/i18n.ts` single source of truth for internationalization.
- `./src/i18n/*.ts` next-intl specific files
- `./src/hooks/useI18n.ts` client hook for i18n toolkit
- `./src/utils/cookie.ts` cookie utils
- `./src/constants/*.ts` constants
- `./src/app/[locale]/layout.tsx` providing i18n
- `/messages/*.json` translation files

## How to use?

### Configure your i18n

1. configure i18n basics (locales, default locales) from `./src/config/i18n.ts`.
2. add corresponding `[locale].json` files to `/messages/`
3. _(optional)_ change `locale prefix` scenario from `./src/i18n/routing.ts`
4. **DON'T** mutate other files unless you know what you're doing

### Usage

1. use translations like `./src/app/[locale]/examples/i18n/page.tsx`
