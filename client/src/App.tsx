import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import './App.css';
import ApplyForInsurance from './ApplyForInsurance';
import EditApplication from './EditApplication';
import './main.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <ApplyForInsurance />,
    },
    {
        path: '/applications/:id',
        element: <EditApplication />,
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
