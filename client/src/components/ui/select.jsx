export const Select = ({ children, ...props }) => {
  return (
    <select 
      className="w-full p-2 rounded-md border"
      {...props}
    >
      {children}
    </select>
  );
};

export const SelectTrigger = Select;
export const SelectContent = ({ children }) => <div>{children}</div>;
export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
export const SelectValue = ({ children }) => children;