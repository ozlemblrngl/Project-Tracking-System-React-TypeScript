import { UpdateAssignmentResponse } from '../models/responses/assignment/updateAssignmentResponse';
import { UpdateAssignmentRequest } from '../models/requests/assignment/updateAssignmentRequest';
import { AddAssignmentResponse } from '../models/responses/assignment/addAssignmentResponse';
import { AddAssignmentRequest } from '../models/requests/assignment/addAssignmentRequest';
import { GetAssignmentResponse } from '../models/responses/assignment/getAssignmentResponse';
import { GetAllAssignmentResponse } from '../models/responses/assignment/getAllAssignmentResponse';
import { BaseService } from '../core/services/baseService';

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
}

export default new assignmentService();