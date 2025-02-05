import React, { createContext, useContext, useState } from 'react';

const HospitalContext = createContext({
  selectedHospital: null,
  setHospital: () => {},
});

export const HospitalProvider = ({ children }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const setHospital = (hospital) => {
    setSelectedHospital(hospital);
  };

  return (
    <HospitalContext.Provider value={{ selectedHospital, setHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospitalContext = () => {
  const context = useContext(HospitalContext);
  return context;
};
