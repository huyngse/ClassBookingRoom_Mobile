export type Report = {
    id: number;
    roomId: number;
    studentId:number
    title: string;
    studentFirstName: string,
    studentLastName: string,
    studentEmail: string,
    description: string;
    status: string;
    createdAt: string;
    deletedAt?: string;
    updatedAt: string;
  };
  