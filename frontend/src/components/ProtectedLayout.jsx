import { Navigate } from "react-router-dom";
import PageLoader from "./PageLoader.jsx";
import Layout from "./Layout.jsx";
import useAuthUser from "../hooks/useAuthUser.js";

const ProtectedLayout = ({
  children,
  showSidebar = true,
  showAiPanel = false,
  fullHeight = false,
}) => {
  const { isLoading, authUser } = useAuthUser();

  if (isLoading) return <PageLoader />;

  if (!authUser) return <Navigate to="/login" replace />;
  if (!authUser.isOnboarded) return <Navigate to="/onboarding" replace />;

  return (
    <Layout showSidebar={showSidebar} showAiPanel={showAiPanel} fullHeight={fullHeight}>
      {children}
    </Layout>
  );
};

export default ProtectedLayout;
