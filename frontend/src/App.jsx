import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";
import CallsPage from "./pages/CallsPage.jsx";
import AICoachPage from "./pages/AICoachPage.jsx";
import VocabularyPage from "./pages/VocabularyPage.jsx";
import PracticePage from "./pages/PracticePage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";

import PageLoader from "./components/PageLoader.jsx";
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen overflow-hidden" data-theme={theme}>
      <Routes>
        <Route path="/" element={<Navigate to="/discover" replace />} />

        <Route
          path="/discover"
          element={
            <ProtectedLayout showSidebar showAiPanel>
              <DiscoverPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedLayout showSidebar showAiPanel>
              <MessagesPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/calls"
          element={
            <ProtectedLayout showSidebar>
              <CallsPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/coach"
          element={
            <ProtectedLayout showSidebar>
              <AICoachPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/vocabulary"
          element={
            <ProtectedLayout showSidebar showAiPanel>
              <VocabularyPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/practice"
          element={
            <ProtectedLayout showSidebar showAiPanel>
              <PracticePage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedLayout showSidebar>
              <ActivityPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedLayout showSidebar>
              <SettingsPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedLayout showSidebar>
              <NotificationsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/discover" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/discover" : "/onboarding"} />
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedLayout showSidebar={false} fullHeight>
              <ChatPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/discover" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "glass-card text-sm",
        }}
      />
    </div>
  );
};

export default App;
