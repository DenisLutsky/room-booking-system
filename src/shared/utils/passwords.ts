import crypto from 'crypto';
import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash);
};

export const generateRandomPassword = (passwordLength = 12): string => {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const CHARSET = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

  let password = '';

  password += lowerCaseLetters.charAt(crypto.randomInt(lowerCaseLetters.length));
  password += upperCaseLetters.charAt(crypto.randomInt(upperCaseLetters.length));
  password += numbers.charAt(crypto.randomInt(numbers.length));
  password += specialCharacters.charAt(crypto.randomInt(specialCharacters.length));

  for (let i = 4; i < passwordLength; i++) {
    const randomIndex = crypto.randomInt(CHARSET.length);
    password += CHARSET[randomIndex];
  }

  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return password;
};
