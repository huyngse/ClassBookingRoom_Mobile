export type RoomTypes = {
    id: number,
    name: string,
    allowedCohorts: {
        id: number;
        cohortCode: string;
    }[],
    allowedActivities: {
        id: number,
        name: string,
        code: string,
    }[],
    createdAt: string,
    deletedAt?: string,
    updatedAt: string
}