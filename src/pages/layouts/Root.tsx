import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/main-navigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
