import { CheckCircle2, Target, Flame } from "lucide-react"
import { useSelector } from "react-redux"

const Performance = () => {

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  const habitList = useSelector((state) => state.habit.habits)
  const longestStreak = useSelector((state) => state.habit.longestStreak)

  return (
    <>
      <div className="animate-in px-4 sm:px-8 mb-10 fade-in slide-in-from-right-4 w-full h-full duration-500">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
                  <StatCard label="Total Habits" value={habitList.length} sub="Active tracking" icon={<Target className="text-indigo-600" />} />
                  <StatCard label="Longest Streak" value={longestStreak} sub="Days in a row" icon={<Flame className="text-orange-600" />} />
               </div>

               {habitList.length !== 0?
                <div className="bg-white border border-slate-200 rounded-3xl sm:rounded-[3rem] p-4 sm:p-10">
                   <div className="flex items-center justify-between mb-12">
                     <h3 className="text-xl font-black">Weekly Trends</h3>
                   </div>
 
                   <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
                     <div className="min-w-[650px]">
                       <div className="grid grid-cols-7 ml-40 gap-4 mb-8 text-center">
                         {days.map(day => (
                           <div key={day} className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{day}</div>
                         ))}
                       </div>
     
                       <div className="space-y-6">
                         {habitList.map(habit => (
                           <div key={habit.id} className="flex items-center gap-8">
                              <div className="w-32 shrink-0">
                                <p className="text-sm font-bold text-slate-700">{habit.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{habit.category}</p>
                              </div>
                              <div className="flex-1 grid grid-cols-7 gap-4">
                                {habit.completed.map((done, i) => {
                                 return (
                                  <div 
                                    key={i} 
                                    className={`h-14 rounded-2xl flex items-center justify-center transition-all ${done.status == true ? `bg-${habit.color}-600 text-white shadow-lg` : 'bg-slate-50 border border-slate-100'}`}
                                  >
                                    {done.status == true? <CheckCircle2 size={20} />: null}
                                  </div>
                                 )
                                 
                                })}
                              </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                </div>: <p className="text-gray-400 font-black uppercase text-base">No Recently Habits Added</p>

               }
             </div>
    </>
  )
}

export default Performance

function StatCard({ label, value, sub, icon }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-4xl hover:shadow-lg transition-all">
       <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
         {icon}
       </div>
       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</h4>
       <p className="text-2xl font-black text-slate-900 mb-1">{value}</p>
       <p className="text-[10px] font-bold text-slate-400">{sub}</p>
    </div>
  );
}
