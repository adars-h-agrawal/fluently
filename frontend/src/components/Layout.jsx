import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import AiInsightsPanel from "./AiInsightsPanel.jsx";

const Layout = ({ children, showSidebar = false, showAiPanel = false, fullHeight = false }) => {
  return (
    <div className={`${fullHeight ? "h-screen" : "min-h-screen"} text-base-content flex overflow-hidden`}>
      {showSidebar && <Sidebar />}

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <Navbar />

        <div className="flex flex-1 min-h-0">
          <main className={`workspace-main flex-1 ${fullHeight ? "overflow-hidden" : ""}`}>
            {children}
          </main>

          {showAiPanel && <AiInsightsPanel />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
