export class ApiError {
    status: number;
    errors: Error[];
    success: boolean;
    message: string;
    
    constructor(
        status: number,
        message = 'Internal Server Error',
        errors: Error[] = []
    ) {
        // super(message); 
        this.status = status;
        this.errors = errors;
        this.success = false;
        this.message = message;
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
