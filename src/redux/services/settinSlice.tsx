import { RootState } from '@/redux/store';
import { createSlice } from "@reduxjs/toolkit"

interface SettingState {
    language: string,
}

// You should use a proper object initialization with curly braces here.
const initialSettingState: SettingState = {
    language : localStorage.getItem('language') || 'en',
}

// You should also use the `createSlice` function to define your reducer properly.
export const settingSlice = createSlice({
    name: 'setting',
    initialState: initialSettingState,
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload
        }
    }
})

export const {  changeLanguage } = settingSlice.actions

export const selectLanguage = (state: RootState) => (state.setting as SettingState).language

export default settingSlice.reducer
