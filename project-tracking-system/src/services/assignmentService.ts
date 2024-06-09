import { BASE_API_URL } from './../environment/environment';
import { UpdateAssignmentResponse } from '../models/responses/assignment/updateAssignmentResponse';
import { UpdateAssignmentRequest } from '../models/requests/assignment/updateAssignmentRequest';
import { AddAssignmentResponse } from '../models/responses/assignment/addAssignmentResponse';
import { AddAssignmentRequest } from '../models/requests/assignment/addAssignmentRequest';
import { GetAssignmentResponse } from '../models/responses/assignment/getAssignmentResponse';
import { GetAllAssignmentResponse } from '../models/responses/assignment/getAllAssignmentResponse';
import { BaseService } from '../core/services/baseService';
import { AxiosResponse } from 'axios';
import axiosInstance from '../core/interceptors/axiosInterceptor';

class assignmentService extends BaseService<
GetAllAssignmentResponse,
GetAssignmentResponse,
AddAssignmentRequest,
AddAssignmentResponse,
UpdateAssignmentRequest,
UpdateAssignmentResponse
>{
    constructor() {
        super();
        this.apiUrl = "Assignments";
    }

getListByProjectId(pageIndex: number, pageSize:number, projectId:string):Promise<AxiosResponse<GetAllAssignmentResponse, any>>{
    return axiosInstance.get<GetAllAssignmentResponse>(this.apiUrl+'/getListByProjectId'+`?Index=${pageIndex}&Size=${pageSize}&ProjectId=${projectId}`);
}


getListByUserId(pageIndex: number, pageSize:number, userId:number):Promise<AxiosResponse<GetAllAssignmentResponse, any>>{
    return axiosInstance.get<GetAllAssignmentResponse>(this.apiUrl+'/getListByUserId'+`?Index=${pageIndex}&Size=${pageSize}&UserId=${userId}`);
}

}

export default new assignmentService();