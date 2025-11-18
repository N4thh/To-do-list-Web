// utils/helper/validator.js
export const isEmail = (email: string): boolean => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhone = (phone: string): boolean => 
    /^0\d{9,10}$/.test(phone);

// Fix isEmpty - nhận string thay vì any
export const isEmpty = (val: string | null | undefined): boolean => {
    if (val === null || val === undefined) return true;
    return val.trim() === "";
}

export const isStrongPassword = (password: string): boolean => 
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);