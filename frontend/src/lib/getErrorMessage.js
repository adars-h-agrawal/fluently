export const getErrorMessage = (error, fallbackMessage = "Something went wrong. Please try again.") => {
  if (!error) return fallbackMessage;

  return error?.response?.data?.message || error?.message || fallbackMessage;
};
