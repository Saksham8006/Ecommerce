import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';

import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';


import { QueryClient, QueryClientProvider } from 'react-query';


import Products from './pages/Product/Products';
import ViewProduct from './pages/Product/ViewProduct';










function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  // Initialze the client
  const queryClient = new QueryClient();

  useEffect(() => {
    // Check if there is a token in local storage
    const token = localStorage.getItem('authorization');
    if (!token && pathname !== '/auth/signup') {
      // Redirect to sign-in route if there is no token and the current path is not the sign-up or forgotPassword route
      navigate('/auth/signin');
    }

    // Set loading to false after the check is done
    setLoading(false);
  }, [pathname, navigate]);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            index

            element={
              <>
                <PageTitle title="Dashboard | Ecommerce" />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <PageTitle title="Product | Ecommerce" />
                <Products />
              </>
            }
          />
          {/* <Route
            path="/product/viewProduct/:id"
            element={
              <>
                <PageTitle title="View Product | Ecommerce" />
                <ViewProduct />
              </>
            }
          /> */}





          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | Ecommerce" />
                <Profile />
              </>
            }
          />

          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | Ecommerce" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | Ecommerce" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | Ecommerce" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | Ecommerce" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | Ecommerce" />
                <Buttons />
              </>
            }
          />

          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | Ecommerce" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | Ecommerce" />
                <SignUp />
              </>
            }
          />

        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
