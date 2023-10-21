import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

const NavigationContainer = styled.nav`
  display: flex;
  gap: 1rem;
`;

const MainNavigation = () => {
  return (
    <header>
      <NavigationContainer>
        <NavLink to={``}>
          <img src="/icons/contacts.svg" alt="contacts" title="contacts" />
        </NavLink>
      </NavigationContainer>
    </header>
  );
};

export default MainNavigation;
