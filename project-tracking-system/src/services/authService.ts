import { UpdatePasswordRequest } from './../models/requests/auth/UpdatePasswordRequest';
import { AuthLoginRequest } from './../models/requests/auth/AuthLoginRequest';
import axiosInstance from "../core/interceptors/axiosInterceptor";
import { AddUserRequest } from "../models/requests/user/addUserRequest";



class AuthService {
	async login(model : AuthLoginRequest) {
        try {
            const response = await axiosInstance.post("Auth/Login", model);

            if (response.data  && response.data.result.token) {
              localStorage.setItem('user', JSON.stringify(response.data));
          
              return response.data.result.token;
            } else {
              throw new Error("Token not found in the response data");
            }
          } catch (error) {
 
            throw new Error("Authentication error");
          }
        }

    logout() {
        localStorage.removeItem('user');
    }
    register(model: AddUserRequest) {
      return axiosInstance.post("/Auth/Register", model);
    }
    
  async isEmailRegistered(model:AddUserRequest) {
      const response = await axiosInstance.get(`Auth/IsEmailRegistered?email=${model.email}`);
      return response.data; 
    
  }

  async updatePassword(model:UpdatePasswordRequest){
    const response = await axiosInstance.post("Auth/UpdatePassword", model);
    return response;
  }
}



export default new AuthService();