import { Type, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/Feature/InputModalSlice";
import { addHabit } from "../store/Feature/HabitSlice";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const HabitInputModal = () => {

  const categories = ["Health", "Fitness", "Mind", "Productivity", "Finance"];

  const colors = ["sky", "red", "orange", "green", "pink", "purple"];

  const modal = useSelector((state) => state.inputModal.isOpen);
  const dispatch = useDispatch();

  const [habitData, setHabitData] = useState({
    id: "",
    name: "",
    goal: "",
    category: "",
    color: "",
    completed: []
  })

  const handleHabitDetail = (e) => {
    e.preventDefault();

    const id = nanoid();
    const date = new Date();
    const currentDate = date.toLocaleDateString();

    const finalData = { ...habitData, id: id, completed: [{id: id, date: currentDate, status: false}] }
    dispatch(addHabit(finalData))

    setHabitData({
      id: "",
      name: "",
      goal: "",
      category: "",
      color: "",
      completed: []
    })

    toast.success("Successfully added Habit")

    setTimeout(() => {
      dispatch(closeModal())
    }, 250)

  };

  const handleModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"></div>
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900">New Habit</h2>
              <button
                onClick={handleModal}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleHabitDetail} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  What's the habit?
                </label>
                <div className="relative">
                  <Type
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    autoFocus
                    required
                    name="name"
                    placeholder="e.g. Morning Meditation"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    value={habitData.name}
                    onChange={(e) => setHabitData({ ...habitData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Daily Goal
                  </label>
                  <input
                    placeholder="e.g. 15 mins"
                    name="goal"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    value={habitData.goal}
                    onChange={(e) => setHabitData({ ...habitData, goal: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Category
                  </label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium appearance-none"
                    value={habitData.category}
                    onChange={(e) => setHabitData({ ...habitData, category: e.target.value })}
                    required
                    name="category"
                  >
                    <option value="">Choose</option>
                    {categories.map((cat) => {
                      return (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Theme Color
                </label>
                <div className="flex justify-between mt-3">
                  {colors.map(color => {
                      const colorMap = {
                          "sky": "bg-sky-600 border-sky-800",
                          "red": "bg-red-600 border-red-800",
                          "orange": "bg-orange-600 border-orange-800",
                          "green": "bg-green-600 border-green-800",
                          "pink": "bg-pink-600 border-pink-800",
                          "purple": "bg-purple-600 border-purple-800"
                      };

                      return (
                        <input
                          key={color}
                          type="button"
                          required
                          onClick={() => setHabitData({ ...habitData, color: color })}
                          className={`w-10 h-10 rounded-xl transition-all border-2 ${colorMap[color]} ${habitData.color === color ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'opacity-70 cursor-pointer hover:opacity-100'}`}
                        />
                      );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 cursor-pointer text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] mt-4"
              >
                Start Habit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HabitInputModal;
