import { createSlice } from "@reduxjs/toolkit";

export const HabitSlice = createSlice({
    name: "habit",
    initialState: {
        habits: JSON.parse(localStorage.getItem("habits")) || [],
        streak: JSON.parse(localStorage.getItem("streak")) || [],
        longestStreak: JSON.parse(localStorage.getItem("longeststreak")) || 0,
    },
    reducers: {

        addHabit: (state, action) => {
            state.habits.push(action.payload)
            localStorage.setItem("habits", JSON.stringify(state.habits))
        },

        toggleHabitCompletion: (state, action) => {

            const { id, date } = action.payload;
            const habit = state.habits.find((habit) => habit.id === id);
            const existingHabit = habit.completed.find((habit) => habit.date === date);

            if (existingHabit) {
                existingHabit.status = !existingHabit.status;
            }

            const anyCompletedToday = state.habits.some((habit) => {
                const todayRecord = habit.completed.find((record) => record.date === date);
                return todayRecord.status === true;
            });

            if (anyCompletedToday) {
                const findExistingDate = state.streak.find((finds) => finds === date);
                if (!findExistingDate) {
                    state.streak.push(date);
                    localStorage.setItem("streak", JSON.stringify(state.streak));
                }
            } else {
                state.streak = state.streak.filter((finds) => finds !== date);
                localStorage.setItem("streak", JSON.stringify(state.streak));
            }
            
            localStorage.setItem("habits", JSON.stringify(state.habits))
        },

        habitUpdater: (state, action) => {

            const { id } = action.payload;
            const date = new Date().toLocaleDateString();
            const habit = state.habits.find((habit) => habit.id === id);
            const habitIndex = state.habits.findIndex((habit) => habit.id === id);
            
            if (state.habits[habitIndex].completed.length > 7) {
                state.habits[habitIndex].completed.shift()
            }
            
            if (habit) {
                state.habits[habitIndex].completed.push({ id: id, date: date, status: false })
            }  
            
            let index = 0;
            const findLongestStreak = state.habits.find((habit) => habit.id === id)
            findLongestStreak.completed.find((habits) => {
                if(habits.status == true) {
                    index++
                }
            })
    
            if(index > state.longestStreak) {
                state.longestStreak = index
                localStorage.setItem("longeststreak", JSON.stringify(state.longestStreak))
            }
            
            localStorage.setItem("longeststreak", JSON.stringify(state.longestStreak))
            localStorage.setItem("habits", JSON.stringify(state.habits))
        },

        deleteHabit: (state, action) => {
            state.habits = state.habits.filter((habit) => habit.id !== action.payload)
            localStorage.setItem("habits", JSON.stringify(state.habits))
        },

    }
})

export const { addHabit, toggleHabitCompletion, habitUpdater, deleteHabit } = HabitSlice.actions

export default HabitSlice.reducer