import 'App.css';
import StartPage from 'pages/StartPage';
import GamePage from 'pages/GamePage';

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import Balloons from 'models/Balloons';


const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "*",
    element: <GamePage />,
    loader: ({ request, params }) => {
      const balloon = Balloons.fromBase64(params['*']);
      if (balloon === null || !balloon instanceof Balloons) {
        return redirect('/');
      }
      return true;
    },
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
