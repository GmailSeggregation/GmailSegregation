import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import GroupDashboard from './group/GroupDashboard';
import Intro from './css/Intro'
import EmailDashboard from './EmailDashboard';
import Search from './dashboard/Search';
import About from './css/About';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/group-dashboard',
        element: <GroupDashboard/>,
    },
    {
        path:'/intro',
        element:<Intro/>
    },
    {
        path:'/dashboard',
        element:<EmailDashboard/>
    },
    {
        path:'/search',
        element:<Search/>
    },
    {
        path:'/about',
        element:<About/>
    },
]);

function Route() {
    return (
        <main>
            {/* Pass the router prop to RouterProvider */}
            <RouterProvider router={router} />
        </main>
    );
}

export default Route;
