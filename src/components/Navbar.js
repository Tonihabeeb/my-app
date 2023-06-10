import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function NavBar() {
  const { path } = useRouteMatch();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/register" className={path === '/register' && 'active'}>Register</Link>
        </li>
        <li>
          <Link to="/login" className={path === '/login' && 'active'}>Log in</Link>
        </li>
        <li>
          <Link to="/task/new" className={path === '/task/new' && 'active'}>Create a task</Link>
        </li>
        <li>
          <Link to="/tasks" className={path === '/tasks' && 'active'}>View tasks</Link>
        </li>
        <li>
          <Link to="/websearch" className={path === '/websearch' && 'active'}>Web search</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
