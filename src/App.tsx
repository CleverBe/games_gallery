import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/HomePage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
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
        <main className="container mx-auto min-h-screen border-x p-4">
          <HomePage />
        </main>
      </div>
    </Providers>
  );
}

export default App;
