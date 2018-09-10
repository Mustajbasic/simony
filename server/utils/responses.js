const StatusCodes = require('./status_codes');
const ResponseHandler = {
    general: {
        missing_data: (info) => {
            return {
                status: StatusCodes.MISSING_DATA,
                info,
            };
        },
        access_denied: () => {
            return {
                status: StatusCodes.ACCESS_DENIED,
            };
        },
        invalid_token_format: () => {
            return {
                status: StatusCodes.INVALID_TOKEN_FORMAT,
            };
        },
        success: (data) => {
            return {
                status: StatusCodes.OK,
                data,
            };
        },
    },
    user: {
        login_success: (data) => {
            return {
                status: StatusCodes.OK,
                data,
            };
        },
        logout_success: () => {
            return {
                status: StatusCodes.OK,
            };
        },
        login_failed: () => {
            return {
                status: StatusCodes.FAILED,
            };
        },
        register_success: () => {
            return {
                status: StatusCodes.OK,
            };
        },
        register_failed_invalid_data: () => {
            return {
                status: StatusCodes.INVALID_DATA,
            };
        },
        register_failed_unknown: (error) => {
            return {
                status: StatusCodes.UNKNOWN_ERROR,
                error,
            };
        },
        register_failed_unique_email: () => {
            return {
                status: StatusCodes.FAILED_UNIQUE_EMAIL,
            };
        },
    },
};

module.exports = ResponseHandler;
