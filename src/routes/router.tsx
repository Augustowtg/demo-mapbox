import { createRootRoute, Outlet, createRoute, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as TanStackQueryProvider from '../integrations/tanstack-query/root-provider';
import { HomePage } from '../pages/home.page';

// Rota raiz
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// Rota index (Home)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// Árvore de rotas
export const routeTree = rootRoute.addChildren([indexRoute]);

// Contexto do TanStack Query
export const TanStackQueryProviderContext = TanStackQueryProvider.getContext();

// Criando o router
export const rootRouter = createRouter({
  routeTree,
  context: TanStackQueryProviderContext,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Tipagem para TS
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof rootRouter;
  }
}
