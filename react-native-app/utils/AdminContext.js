import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const setAdminStatus = (status) => {
    setIsAdmin(status);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, setAdminStatus }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
