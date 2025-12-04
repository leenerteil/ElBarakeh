import { create } from 'zustand';

export const useAppointmentStore = create((set) => ({
  appointments: [],
  availableSlots: [
    { id: 1, day: 'الاثنين', time: '9:00 ص - 11:00 ص', available: true },
    { id: 2, day: 'الاثنين', time: '2:00 م - 4:00 م', available: true },
    { id: 3, day: 'الثلاثاء', time: '9:00 ص - 11:00 ص', available: true },
    { id: 4, day: 'الثلاثاء', time: '2:00 م - 4:00 م', available: true },
    { id: 5, day: 'الأربعاء', time: '9:00 ص - 11:00 ص', available: false },
    { id: 6, day: 'الأربعاء', time: '2:00 م - 4:00 م', available: true },
  ],
  
  bookAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment],
    availableSlots: state.availableSlots.map(slot => 
      slot.id === appointment.slotId ? { ...slot, available: false } : slot
    )
  })),
  
  cancelAppointment: (appointmentId) => set((state) => ({
    appointments: state.appointments.filter(app => app.id !== appointmentId)
  })),
}));