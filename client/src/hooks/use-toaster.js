export const useToast = () => {
  const toast = ({ title, description }) => {
    console.log({ title, description });
    // Implement your toast logic here
  };

  return { toast };
};