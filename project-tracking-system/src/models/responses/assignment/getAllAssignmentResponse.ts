export interface GetAllAssignmentResponse{
    id: string
    projectId: string,
    title: string,
    description: string,
    createdDate: Date,
    status: string

 }
 export interface GetAllAssignmentResponse{
    items: GetAllAssignmentResponse[]
}