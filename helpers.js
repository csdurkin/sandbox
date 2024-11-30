// Import required modules
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

// Classic checkArg
function checkArg(argument, type, argumentName) {
    

    if (argument === undefined) {
        throw new GraphQLError(`The argument (${argumentName}) is undefined.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    } 
    

    else if (argument === null) {
        throw new GraphQLError(`The argument (${argumentName}) is null.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    } 
    

    else if (type === 'array' && !Array.isArray(argument)) {
        throw new GraphQLError(`(${argumentName}) is not a valid array.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    } 
    

    else if (type !== 'array' && typeof argument !== type) {
        throw new GraphQLError(`The argument (${argumentName}) is not a ${type}.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }


    if (type === 'string' && argument.trim().length === 0) {
        throw new GraphQLError(`The argument (${argumentName}) is empty or only whitespace.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }


    if (type === 'number' && isNaN(argument)) {
        throw new GraphQLError(`The argument (${argumentName}) must be a number.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }


    if (type === 'number' && (argumentName === 'establishedYear' || argumentName === 'createdYear')) {
        const currentYear = new Date().getFullYear();
        if (argument < 2000 || argument > currentYear + 5) {
            throw new GraphQLError(`The established/created year must be between 2000 and the ${currentYear}.`, {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }
    }


    if (argumentName === 'id' && !ObjectId.isValid(argument)) {
        throw new GraphQLError(`The argument (${argumentName}) is not a valid ObjectId.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }


    if (argumentName === 'name') {

        const nameRegex = /^[a-zA-Z\s\-]+$/;

        if (!nameRegex.test(argument)) {
            throw new GraphQLError(`The argument (${argument}) contains invalid characters. Names should only include letters, spaces, and hyphens.`, {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }

    }


    if (argumentName === 'name' || argumentName === 'title') {

        const nameRegex = /^[a-zA-Z\s\-]+$/;

        if (!nameRegex.test(argument)) {
            throw new GraphQLError(`The argument (${argument}) contains invalid characters. Names should only include letters, spaces, and hyphens.`, {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }

    }


    if (argumentName === 'email') {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(argument)) {
            throw new GraphQLError(`The argument (${argument}) is not a valid email address.`, {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }

    }


    if (argumentName === 'password') {
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
        if (!passwordRegex.test(argument)) {
            throw new GraphQLError(`The argument (${argument}) does not meet the password complexity requirements. It must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.`, {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }

    }

    if (argumentName === 'bio') {

        if(argument.length > 250){
            throw new GraphQLError(`The provided bio must be 250 characters or less.) `, {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }
        
    }

    //ENUM CHECKS

    if (argumentName === 'department'){
        checkDepartment(argument);
    }

    if (argumentName === 'date'){
        checkDate(argument);
    }

    if (argumentName === 'subject'){
        checkSubject(argument);
    }
    
    if (argumentName === 'role'){
        checkRole(argument);
    }

    if (argumentName === 'applicationStatus'){
        checkApplicationStatus(argument);
    }
    

    //ARRAY CHECKS
    
    // Check for 'chapters' type
    if (type === 'chapters') {

        for (const chapter of argument) {
            if (typeof chapter.title !== 'string' || chapter.title.trim().length === 0) {
                throw new GraphQLError(`Each chapter in (${argumentName}) must have a valid title.`, {
                    extensions: { code: 'BAD_USER_INPUT' }
                });
            }
        }
        
    }

}

// Check Date: ensures MM/DD/YYYY
function checkDate(date) {
    
    if (typeof date !== 'string') {
        throw new GraphQLError(`The date must be a string in MM/DD/YYYY format.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }
    
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(date)) {
        throw new GraphQLError(`The date must be in MM/DD/YYYY format.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }

}

// Function to validate department against predefined departments
function checkDepartment(department) {

    const validDepartments = ['BIOMEDICAL_ENGINEERING', 'CHEMICAL_ENGINEERING_AND_MATERIALS_SCIENCE',
            'CHEMISTRY_AND_CHEMICAL_BIOLOGY',
            'CIVIL_ENVIRONMENTAL_AND_OCEAN_ENGINEERING',
            'COMPUTER_SCIENCE',
            'ELECTRICAL_AND_COMPUTER_ENGINEERING',
            'MATHEMATICAL_SCIENCES',
            'MECHANICAL_ENGINEERING',
            'PHYSICS',
            'SYSTEMS_AND_ENTERPRISES'];
    
    if (!validDepartments.includes(department.trim())) {
        throw new GraphQLError(`Invalid department: ${department}. Must be one of ${validDepartments.join(", ")}.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }
    
}

// Function to validate subject against predefined departments
function checkSubject(subject) {

    const validSubjects = [
        'CALL_FOR_APPLICANTS',
        'TEAM_UPDATE',
        'PROJECT_LAUNCH',
        'MILESTONE_REACHED',
        'PROGRESS_REPORT',
        'DEADLINE_UPDATE',
        'REQUEST_FOR_FEEDBACK',
        'FUNDING_UPDATE',
        'EVENT_ANNOUNCEMENT',
        'ISSUE_REPORTED',
        'PUBLISHED_ANNOUNCEMENT',
        'FINAL_RESULTS',
        'PROJECT_COMPLETION'
    ];
    
    if (!validSubjects.includes(subject.trim())) {
        throw new GraphQLError(`Invalid subject: ${subject}. Must be one of ${validSubjects.join(", ")}.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }
    
}

// Function to validate role against the predefined enum
function checkRole(role) {
    const validRoles = ['STUDENT', 'PROFESSOR', 'ADMIN'];

    if (!validRoles.includes(role.trim().toUpperCase())) {
        throw new GraphQLError(`Invalid role: ${role}. Must be one of ${validRoles.join(", ")}.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }
}

// Function to validate application status against the predefined enum
function checkApplicationStatus(applicationStatus) {
    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'WITHDRAWN', 'WAITLISTED'];

    if (!validStatuses.includes(applicationStatus.trim().toUpperCase())) {
        throw new GraphQLError(`Invalid application status: ${applicationStatus}. Must be one of ${validStatuses.join(", ")}.`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }
}

// Function to check year range validity
function checkYearRange(min, max) {
    
    const currentYear = new Date().getFullYear();
    
    if (min <= 0 || max < min || max > currentYear) {
        throw new GraphQLError(`Validation failed for the established years: "min" year must be greater than 0, "max" year must be greater than or equal to "min" year, and "max" year cannot be more than the current year (${currentYear}).`, {
            extensions: { code: 'BAD_USER_INPUT' }
        });
    }

}

// Export all helper functions
export {
    checkArg,
    checkDate,
    checkDepartment,
    checkSubject,
    checkYearRange, 
    checkRole
};
