# Issue Tracker

- next.js
- tailwindcss
- Typescript
- MySQL
- Prisma
- Zod (Data Validation)
- Radix UI
- react-simpleMDE
- react hook form (with zod resolver) -- 
- delay (help creating loading page)
- tailwind typograph (beautiful typographic defaults)
- react-loading-skeleton 
- Seperate of Concerns & Single Responsibility

-Data Cache
  - fetch(..., {cache: 'not_store'})
  - full route cache (on the server): store the output of statically rendered routes
    - Static Rendering (routes without parameters)
      ```tsx
      export const dynamic = 'force-dynamic' // opt out static rendering
      ```
  - client side cache
    ```tsx
    router.refresh() // refresh the page on the brwoser
    ```

- NextAuth

- React Query

- react-hot-toast Notification

-react cache -- issue detail page performance