import { create } from 'zustand';
import { format, addDays } from 'date-fns';

export const useAppointmentStore = create((set, get) => ({
  appointments: [],
  availableSlots: [
    { 
      id: 1, 
      day: 'الإثنين', 
      time: '9:00 ص - 11:00 ص', 
      available: true,
      date: format(new Date(), 'yyyy-MM-dd'),
      instructorId: 1,
      maxStudents: 4,
      bookedStudents: 2
    },
    { 
      id: 2, 
      day: 'الإثنين', 
      time: '2:00 م - 4:00 م', 
      available: true,
      date: format(new Date(), 'yyyy-MM-dd'),
      instructorId: 2,
      maxStudents: 4,
      bookedStudents: 1
    },
    { 
      id: 3, 
      day: 'الثلاثاء', 
      time: '9:00 ص - 11:00 ص', 
      available: true,
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      instructorId: 1,
      maxStudents: 4,
      bookedStudents: 0
    },
    { 
      id: 4, 
      day: 'الثلاثاء', 
      time: '2:00 م - 4:00 م', 
      available: false,
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      instructorId: 2,
      maxStudents: 4,
      bookedStudents: 4
    },
    { 
      id: 5, 
      day: 'الأربعاء', 
      time: '9:00 ص - 11:00 ص', 
      available: false,
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      instructorId: 1,
      maxStudents: 4,
      bookedStudents: 4
    },
    { 
      id: 6, 
      day: 'الأربعاء', 
      time: '2:00 م - 4:00 م', 
      available: true,
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      instructorId: 2,
      maxStudents: 4,
      bookedStudents: 1
    },
    { 
      id: 7, 
      day: 'الخميس', 
      time: '9:00 ص - 11:00 ص', 
      available: true,
      date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      instructorId: 1,
      maxStudents: 4,
      bookedStudents: 0
    },
    { 
      id: 8, 
      day: 'الخميس', 
      time: '2:00 م - 4:00 م', 
      available: true,
      date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      instructorId: 2,
      maxStudents: 4,
      bookedStudents: 0
    },
    { 
      id: 9, 
      day: 'الأحد', 
      time: '9:00 ص - 11:00 ص', 
      available: false,
      date: format(addDays(new Date(), 6), 'yyyy-MM-dd'),
      instructorId: 1,
      maxStudents: 4,
      bookedStudents: 4
    },
  ],

  // Add instructors data
  instructors: [
    { id: 1, name: 'أحمد محمد', specialization: 'قيادة عادية', experience: '5 سنوات' },
    { id: 2, name: 'خالد عبدالله', specialization: 'قيادة ليلية', experience: '7 سنوات' },
    { id: 3, name: 'محمد علي', specialization: 'قيادة الطرق السريعة', experience: '10 سنوات' },
    { id: 4, name: 'سعيد حسن', specialization: 'تدريب المبتدئين', experience: '8 سنوات' }
  ],

  // Add getAvailableDates function
  getAvailableDates: () => {
    const { availableSlots } = get();
    const datesSet = new Set();
    
    // Get all unique dates that have at least one available slot
    availableSlots.forEach(slot => {
      if (slot.available) {
        datesSet.add(slot.date);
      }
    });
    
    return Array.from(datesSet);
  },

  // Add getSlotsByDate function
  getSlotsByDate: (date) => {
    const { availableSlots } = get();
    return availableSlots.filter(slot => slot.date === date);
  },

  // Add getInstructor function
  getInstructor: (id) => {
    const { instructors } = get();
    return instructors.find(instructor => instructor.id === id);
  },

  bookAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment],
    availableSlots: state.availableSlots.map(slot => 
      slot.id === appointment.slotId ? { 
        ...slot, 
        bookedStudents: slot.bookedStudents + 1,
        available: slot.bookedStudents + 1 < slot.maxStudents
      } : slot
    )
  })),
  
  cancelAppointment: (appointmentId) => set((state) => {
    const appointment = state.appointments.find(app => app.id === appointmentId);
    if (!appointment) return state;
    
    return {
      appointments: state.appointments.filter(app => app.id !== appointmentId),
      availableSlots: state.availableSlots.map(slot => 
        slot.id === appointment.slotId ? { 
          ...slot, 
          bookedStudents: Math.max(0, slot.bookedStudents - 1),
          available: true
        } : slot
      )
    };
  }),
}));