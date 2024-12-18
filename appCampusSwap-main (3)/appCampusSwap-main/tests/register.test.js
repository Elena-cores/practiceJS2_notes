const assert = require('assert');
const { 
    hasNumber,
    hasLowerCase,
    hasUpperCase,
    hasSpecialCharacter,
    hasMinLength,
    isPasswordSecure
    } = require('../public/javascript/comprobaciones.js');

describe('Validación de contraseñas', () => {
    it('Validar que contraseña contiene al menos un número', () => {
        const password = 'SecurePassword';
        assert.strictEqual(hasNumber(password), false);
        assert.strictEqual(hasNumber('SecurePassword1!'), true);
    });

    it('Validar que contraseña contiene al menos una letra minúscula', () => {
        const password = 'SECUREPASSWORD';
        assert.strictEqual(hasLowerCase(password), false);
        assert.strictEqual(hasLowerCase('SECUREPASSWORDy'), true);
    });

    it('Validar que contraseña contiene al menos una letra mayúscula', () => {
        const password = 'password1';
        assert.strictEqual(hasUpperCase(password), false);
        assert.strictEqual(hasUpperCase('Password1'), true);
    });

    it('Validar que contraseña contiene al menos un carácter especial', () => {
        const password = 'Secure123';
        assert.strictEqual(hasSpecialCharacter(password), false);
        assert.strictEqual(hasSpecialCharacter('Secure123!'), true);
    });

    it('Validar que contraseña tiene longitud mínima de 8 caracteres', () => {
        const password = 'Short';
        assert.strictEqual(hasMinLength(password), false);
        assert.strictEqual(hasMinLength('LongEnough'), true);
    });

    it('Contraseña válida', () => {
        const password = 'secure!';
        assert.strictEqual(isPasswordSecure(password), false);
        assert.strictEqual(isPasswordSecure('Secure123!'), true);
    });

});
