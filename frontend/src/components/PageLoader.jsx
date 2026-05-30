import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
      <div className="text-center space-y-3">
        <LoaderIcon className="animate-spin size-10 text-primary mx-auto" />
        <p className="text-sm opacity-70">Loading Fluently...</p>
      </div>
    </div>
  );
};
export default PageLoader;