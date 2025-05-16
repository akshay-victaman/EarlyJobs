export const Input = ({ className, ...props }) => {
  return (
    <input
      className={`w-full p-2 rounded-md border ${className}`}
      {...props}
    />
  );
};