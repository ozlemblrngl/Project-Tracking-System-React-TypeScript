export interface GetAllAssignmentResponse{
    id: string
    projectId: string,
    projectName: string,
    title: string,
    description: string,
    createdDate: Date,
    status: string,
    statusText: string

 }
 export interface GetAllAssignmentResponse{
    items: GetAllAssignmentResponse[]
}