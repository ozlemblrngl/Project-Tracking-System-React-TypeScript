import {GetAllProjectResponse} from '../models/responses/project/getAllProjectResponse';
import { BaseService } from '../core/services/baseService';
import { GetProjectResponse } from '../models/responses/project/getProjectResponse';
import { AddProjectRequest } from '../models/requests/project/addProjectRequest';
import { AddProjectResponse } from '../models/responses/project/addProjectResponse';
import { UpdateProjectRequest } from '../models/requests/project/updateProjectRequest';
import { UpdateProjectResponse } from '../models/responses/project/updateProjectResponse';


class projectService extends BaseService<
GetAllProjectResponse,
GetProjectResponse,
AddProjectRequest,
AddProjectResponse,
UpdateProjectRequest,
UpdateProjectResponse
>{
    constructor() {
        super();
        this.apiUrl = "Projects";
    }
}

export default new projectService();