import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EmployeeList } from './components/employees/EmployeeList';

// QueryClient oluşturuyoruz
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // pencere fokus değiştiğinde otomatik yenileme yapmaz
      retry: 1, // hata durumunda 1 kez tekrar dener
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-bold text-gray-900">Employee Management</h1>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <EmployeeList />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;