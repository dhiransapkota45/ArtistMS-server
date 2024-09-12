export class ApiError extends Error {
    status: number;
    errors: Error[];
    success: boolean;
    
    constructor(
        status: number,
        message = 'Internal Server Error',
        errors: Error[] = []
    ) {
        super(message); 
        this.status = status;
        this.errors = errors;
        this.success = false;
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
