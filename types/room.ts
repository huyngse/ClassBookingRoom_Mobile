import { RoomTypes } from "./room-type";
import { Slot } from "./slot";

export type Room = {
  id: number;
  roomName: string;
  capacity: number;
  status: string;
  roomType: RoomTypes;
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;
  roomSlots: Slot[];
  picture?: string;  
  numOfPendingBooking: number;
};
