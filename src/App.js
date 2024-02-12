import logo from 'logo.svg';
import 'App.css';
import ColorSchemeSwitch from 'components/ColorSchemeSwitch';
import StartPage from 'pages/StartPage';
import GamePage from 'pages/GamePage';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/game/:data",
    element: <GamePage />,
    action: (params) => {
      console.log('hyoungphi - game action', params);
      alert('hyoungphi - game action', params.data);
    }
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
