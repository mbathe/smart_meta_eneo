import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import MiniDrawer from "./pages/erp/ERP_Enter";
import AddClientForm from './pages/erp/add_client';
import AddProductForm from './pages/erp/add_product';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
       
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'erp_ecm', element: <MiniDrawer /> }
      ]
    },
    { path: '/erp_ecm',
     element: <MiniDrawer />,
     children:[
       {
         path: 'add_client', element: <AddClientForm /> 
       }
     ]
    },
    { path: '/add_clients',
     element: <AddClientForm /> 
    },
    { path: '/add_product',
     element: <AddProductForm /> 
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
