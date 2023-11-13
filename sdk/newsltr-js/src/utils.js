function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

class InvalidEmailError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidEmailError";
    }
}

class IncorrectResponseError extends Error {
    constructor(message) {
        super(message);
        this.name = "IncorrectResponseError"
    }
}