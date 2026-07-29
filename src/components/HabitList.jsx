import { useDispatch, useSelector } from "react-redux"
import { CheckCircle2, Circle, Flame, X } from "lucide-react"
import { habitUpdater, toggleHabitCompletion } from "../store/Feature/HabitSlice";
import { openDeleteModal } from "../store/Feature/DeleteModalSlice";
import DeleteModal from "./DeleteModal";
import { useEffect } from "react"

const HabitList = () => {

  const resetTime = "00:00:00";
  const dispatch = useDispatch();
  const habitList = useSelector((state) => state.habit.habits)
  
  const today = new Date().toLocaleDateString();

  const isCompletedToday = (habit) => {
    return habit.completed.some((habit) => habit.date === today && habit.status === true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      if (newTime === resetTime) {
        habitList.forEach(habit => {
          dispatch(habitUpdater({ id: habit.id }));
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resetTime, habitList]);

  const handleToggle = (id) => {
    dispatch(toggleHabitCompletion({ id, date: today }));
  };

  const toggleDeleteModal = () => {
    dispatch(openDeleteModal())
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-10 pb-12 space-y-10">
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black uppercase tracking-widest text-slate-400">Daily Checklist</h2>
              </div>

              <div className="space-y-4">
                {habitList.length !== 0 ?

                  habitList.map(habit => {

                    const completed = isCompletedToday(habit);

                    return (
                      <div
                        key={habit.id}
                        className={`group border border-slate-200 rounded-4xl p-5 flex items-center gap-5 transition-all hover:shadow-xl hover:shadow-indigo-500/5 ${completed ? 'bg-slate-50' : 'bg-white'}`}
                      >
                        <button
                          onClick={() => handleToggle(habit.id)}
                          className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer
                              ${completed ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-400 hover:text-indigo-600'}
                              `}
                        >
                          {completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-2 h-2 rounded-full bg-${habit.color}-600`}></span>
                            <h3 className={`font-bold transition-all ${completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                              {habit.name}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{habit.goal} • {habit.category}</p>
                          {completed && (
                            <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                              Completed today
                            </span>
                          )}
                        </div>

                        <div className="md:flex gap-1.5 px-4 border-x border-slate-100">
                          {habit.completed.map((done, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-6 rounded-full transition-all ${done.status ? "bg-emerald-500" : 'bg-slate-200'}`}
                            ></div>
                          ))}
                        </div>

                        <div className="text-right px-4">
                          <div className="flex items-center gap-1 text-orange-500 font-black">
                            <Flame size={14} fill="currentColor" />
                            <span className="text-sm">{habit.completed.filter(habit => habit.status).length}</span>
                          </div>
                          <p className="text-[10px] font-black text-slate-300 uppercase">Streak</p>
                        </div>
                        <button onClick={toggleDeleteModal}>
                          <X size={24} className="text-slate-400 hover:text-red-600 cursor-pointer" />
                        </button>
                        <DeleteModal id={habit.id} />
                      </div>
                    );
                  }) : <p className="text-gray-400 font-black uppercase text-base">No Recently Habits Added</p>
                }
              </div>
            </section>
          </div>

        </div>
      </div>
    </>
  )
}

export default HabitList
