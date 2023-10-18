import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to={``}>Home</NavLink>
          </li>
          <li>
            <NavLink to={`contact`}>create contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
