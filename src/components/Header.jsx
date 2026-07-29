import { Flame, Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../store/Feature/InputModalSlice";

function Header() {

  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.tab.currentTab)
  const streak = useSelector((state) => state.habit.streak)
  const date = new Date();  

  const handleModal = () => {
    dispatch(openModal())
  }

  return (
    <>
      <header className="px-10 py-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {currentTab === "performance" ? "Performance Analytics" : "Today's Journey"}
          </h1>
          <p className="text-slate-500 font-medium">{date.toDateString()}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-sm border border-orange-100">
            <Flame size={18} fill="currentColor" />
            <span>{streak.length} Day Streak</span>
          </div>
          <button
            onClick={handleModal}
            className="bg-indigo-600 cursor-pointer text-white px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <Plus size={20} /> New Habit
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
