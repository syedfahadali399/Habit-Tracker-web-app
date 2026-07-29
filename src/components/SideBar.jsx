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
      <aside className="h-screen w-20 bg-white border-r border-slate-200 flex flex-col items-center justify-between py-8 gap-10">
        <div className="flex flex-col items-center gap-8">
          <div className="w-12 h-12 mb-6 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <NavLink to={"/"} className={`bg-indigo-600 p-3 text-white font-semibold rounded-xl transition-all hover:cursor-pointer flex items-center text-indigo-600`}>
              <button className="hover:cursor-pointer" onClick={() => setCurrentTab("home")}><Target size={24} /></button>
            </NavLink>
          </div>
          <nav className="flex flex-col gap-15 flex-1 items-center">
            <NavLink to={"/"} className={({isActive}) => isActive?`bg-indigo-600 p-3 text-white font-semibold rounded-xl transition-all hover:cursor-pointer flex items-center`:`text-indigo-600 font-semibold hover:cursor-pointer flex items-center`}>
              <button className="hover:cursor-pointer" onClick={() => setCurrentTab("home")}><Calendar size={22} /></button>
            </NavLink>
            <NavLink to={"/performance"} className={({isActive}) => isActive?`bg-indigo-600 p-3 font-semibold rounded-xl text-white transition-all hover:cursor-pointer flex items-center`:`text-indigo-600 font-semibold hover:cursor-pointer flex items-center`}>
              <button className="hover:cursor-pointer" onClick={() => setCurrentTab("performance")}><BarChart3 size={22} /></button>
            </NavLink>
          </nav>
        </div>

        <div className="mt-auto flex flex-col items-center gap-6">
          <Settings size={22} />
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
