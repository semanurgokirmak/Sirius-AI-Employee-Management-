import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EmployeeList } from "./components/employees/EmployeeList";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { SunIcon, MoonIcon } from "./components/ui/Icons";

// QueryClient oluşturuyoruz
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // pencere fokus değiştiğinde otomatik yenileme yapmaz
      retry: 1, // hata durumunda 1 kez tekrar dener
    },
  },
});

// Logo Component
const Logo = () => (
  <div className="flex items-center gap-2">
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-600 dark:text-blue-500"
    >
      <path
        d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"
        fill="currentColor"
      />
      <path
        d="M12 10C13.65 10 15 11.35 15 13C15 14.65 13.65 16 12 16C10.35 16 9 14.65 9 13C9 11.35 10.35 10 12 10ZM12 14.5C12.83 14.5 13.5 13.83 13.5 13C13.5 12.17 12.83 11.5 12 11.5C11.17 11.5 10.5 12.17 10.5 13C10.5 13.83 11.17 14.5 12 14.5Z"
        fill="currentColor"
      />
    </svg>
    <span className="font-bold text-gray-900 dark:text-white">EmployeeHub</span>
  </div>
);

// Ana uygulama içeriği
const AppContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-background transition-colors duration-200">
        <Toaster
          position="top-right"
          toastOptions={{
            className: "dark:bg-dark-paper dark:text-white",
            style: {
              borderRadius: "8px",
              background: "#fff",
              color: "#363636",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        />

        <nav className="bg-white dark:bg-dark-paper shadow-sm transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Logo />

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <EmployeeList />
        </main>
      </div>
    </QueryClientProvider>
  );
};

// Ana App bileşeni
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
