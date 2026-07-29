import { Routes, Route } from "react-router";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import PerformancePage from "./pages/PerformancePage";

function App() {
  return (
    <>
      <div className="flex bg-[#F8FAFC] text-slate-900 w-full h-full font-sans">
        <SideBar />
        <main className="flex-1 flex flex-col relative">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/performance" element={<PerformancePage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
