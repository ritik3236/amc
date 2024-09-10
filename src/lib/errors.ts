export class CustomError extends Error {
    code: string;
    name: string;
    errors: string[];

    constructor(name: string, message: string, code: string, errors: string[] = []) {
        super(message);
        this.name = name;
        this.code = code;
        this.errors = errors;
    }
}

export class OtpRequiredError extends CustomError {
    constructor(errors: string[] = []) {
        super('OtpRequiredError', 'OTP is required for authentication.', '1001', errors);
    }
}

export class AccountVerificationError extends CustomError {
    constructor(errors: string[] = []) {
        super('AccountVerificationError', 'Your account requires verification.', '1002', errors);
    }
}

export class InvalidCredentialsError extends CustomError {
    constructor(errors: string[] = []) {
        super('InvalidCredentialsError', 'Invalid email or password.', '1003', errors);
    }
}
