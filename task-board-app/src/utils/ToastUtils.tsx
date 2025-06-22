import { toast } from 'react-toastify';

/**
 * Shows a success toast
 * @param {string} message - The message to display
 */
export const showSuccess = (message:string) => {
  toast.success(message);
};

/**
 * Shows an error toast
 * @param {string} message - The message to display
 */
export const showError = (message:string) => {
  toast.error(message);
};

/**
 * Shows an info toast
 * @param {string} message - The message to display
 */
export const showInfo = (message:string) => {
  toast.info(message);
};

/**
 * Shows a warning toast
 * @param {string} message - The message to display
 */
export const showWarning = (message:string) => {
  toast.warning(message);
};
