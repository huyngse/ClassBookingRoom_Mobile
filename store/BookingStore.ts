import { Activity } from '@/types/department';
import { Room } from '@/types/room';
import { Slot } from '@/types/slot';
import { create } from 'zustand'

type BookingState = {
    bookingDate?: Date;
    slots?: Slot[];
    room?: Room;
    activity?: Activity;
    note: string;
    setBookingInfo: (bookingDate: Date, slots: Slot[], room: Room) => void;
    setActivity: (activity: Activity) => void;
    setNote: (note: string) => void;
    clearBookingInfo: () => void;
}
const useBookingStore = create<BookingState>((set) => {
    const localStorageState = localStorage.getItem("bookingState");
    const initialState = localStorageState ? JSON.parse(localStorageState) : {
        bookingDate: undefined,
        slots: [],
        room: undefined,
        note: "",
        activity: undefined
    };
    return {
        ...initialState,
        setBookingInfo: (bookingDate: Date, slots: Slot[], room: Room) => {
            const newState = {
                bookingDate: bookingDate,
                slots: slots,
                room: room
            };
            localStorage.setItem("bookingState", JSON.stringify(newState));
            set(newState);
        },
        setActivity: (activity: Activity) => {
            set((prev) => {
                const newState = {
                    ...prev, activity: activity
                };
                localStorage.setItem("bookingState", JSON.stringify(newState));
                return newState
            });
        },
        setNote: (note: string) => {
            set((prev) => {
                const newState = { ...prev, note: note };
                localStorage.setItem("bookingState", JSON.stringify(newState));
                return newState
            });
        },
        clearBookingInfo: () => {
            localStorage.removeItem("bookingState");
            set({
                bookingDate: undefined,
                slots: [],
                room: undefined,
                note: "",
                activity: undefined
            });
        }
    }
})

export default useBookingStore;