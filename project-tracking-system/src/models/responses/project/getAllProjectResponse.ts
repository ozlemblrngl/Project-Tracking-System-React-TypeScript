export interface GetAllProjectResponse{
    id :string
    name: string,
    startDate: Date,
    endDate: Date,
    status: string
 }

export interface GetAllProjectResponse{
    items: GetAllProjectResponse[]
}