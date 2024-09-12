export class ApiResponse {
    status: number;
    data: any;
    success: boolean;
    message: string;
  
    constructor(status: number, data: any, message: string = "Success", success: boolean = true) {
      this.status = status;
      this.data = data;
      this.message = message;
      this.success = success
    }
}