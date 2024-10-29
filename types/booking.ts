type RoomSlot = {
    id: number;
    startTime: string; 
    endTime: string; 
    roomId: number;
  };
  
  export type Booking = {
    createdAt: string; 
    deletedAt: string | null; 
    updatedAt: string; 
    isDeleted: boolean;
    id: number;
    code: string;
    status: string;
    studentId: string; 
    cohortCode: string;
    studentFullName: string;
    studentEmail: string;
    activityId: number;
    activityCode: string;
    activityName: string;
    departmentId: number;
    departmentName: string;
    description: string;
    response: string;
    roomSlots: RoomSlot[]; 
    bookingDate: string;
    roomName: string;
    roomId: number;
  };
  