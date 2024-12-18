//validar contraseñas! 

function hasNumber(password) {
    return /\d/.test(password);
}

function hasLowerCase(password) {
    return /[a-z]/.test(password);
}

function hasUpperCase(password) {
    return /[A-Z]/.test(password); 
}

function hasSpecialCharacter(password) {
    return /[@$!%*?&]/.test(password);
}

function hasMinLength(password, min = 8) {
    return password.length >= min;
}

function isPasswordSecure(password) {
    return (
        hasMinLength(password) &&
        hasUpperCase(password) &&
        hasLowerCase(password) &&
        hasNumber(password) &&
        hasSpecialCharacter(password)
    );
}

module.exports = {
    hasNumber,
    hasLowerCase,
    hasUpperCase,
    hasSpecialCharacter,
    hasMinLength,
    isPasswordSecure
};
