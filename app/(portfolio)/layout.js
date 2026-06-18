import Header from "@/components/Header";
import NavArrows from "@/components/NavArrows";
import { SettingsProvider } from "@/context/SettingsContext";

export default function PortfolioLayout({ children }) {
  return (
    <SettingsProvider>
      <div className="page">
        <div className="page-content">
          <Header />
          <NavArrows />
          <div className="content-area">
            <div className="animated-sections">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SettingsProvider>
  );
}
