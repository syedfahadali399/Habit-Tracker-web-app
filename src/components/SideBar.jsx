import { Target, Calendar, BarChart3, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { setTab } from "../store/Feature/ActiveTabSlice";

const SideBar = () => {

    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.tab.currentTab)

    const [currentTab, setCurrentTab] = useState(activeTab);
    
    useEffect(() => {
      dispatch(setTab(currentTab))
    }, [currentTab])

  return (
    <>
      <aside className="h-16 w-full fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex flex-row items-center justify-between px-6 py-2 md:static md:h-screen md:w-20 md:border-r md:border-t-0 md:flex-col md:justify-between md:py-8 md:px-0 md:gap-10">
        <div className="flex flex-row md:flex-col items-center gap-6 md:gap-8">
          <div className="hidden md:flex w-12 h-12 mb-6 bg-indigo-600 rounded-2xl items-center justify-center text-white shadow-lg shadow-indigo-200">
            <NavLink to={"/"} className={`bg-indigo-600 p-3 text-white font-semibold rounded-xl transition-all hover:cursor-pointer flex items-center text-indigo-600`}>
              <button className="hover:cursor-pointer" onClick={() => setCurrentTab("home")}><Target size={24} /></button>
            </NavLink>
          </div>
          <nav className="flex flex-row md:flex-col gap-6 md:gap-15 items-center">
            <NavLink to={"/"} className={({isActive}) => isActive?`bg-indigo-600 p-3 text-white font-semibold rounded-xl transition-all hover:cursor-pointer flex items-center`:`text-indigo-600 font-semibold hover:cursor-pointer flex items-center`}>
              <button className="hover:cursor-pointer" onClick={() => setCurrentTab("home")}><Calendar size={22} /></button>
            </NavLink>
            <NavLink to={"/performance"} className={({isActive}) => isActive?`bg-indigo-600 p-3 font-semibold rounded-xl text-white transition-all hover:cursor-pointer flex items-center`:`text-indigo-600 font-semibold hover:cursor-pointer flex items-center`}>
              <button className="hover:cursor-pointer" onClick={() => setCurrentTab("performance")}><BarChart3 size={22} /></button>
            </NavLink>
          </nav>
        </div>

        <div className="mt-0 flex flex-row items-center gap-6 md:mt-auto md:flex-col">
          <Settings size={22} className="text-slate-400 hover:text-indigo-600 cursor-pointer" />
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 p-0.5">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
