import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/HomePage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

function App() {
  return (
    <Providers>
      <div className="bg-background">
        <header className="container mx-auto flex flex-wrap items-center justify-between space-y-4 border border-t-0 bg-black p-4 sm:space-y-0">
          <div className="text-3xl">GamesApp</div>
        </header>
        <main className="container mx-auto min-h-screen border-x px-4">
          <HomePage />
        </main>
      </div>
    </Providers>
  );
}

export default App;
