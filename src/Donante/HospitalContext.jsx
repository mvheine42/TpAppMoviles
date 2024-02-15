import React, { createContext, useContext, useState } from 'react';

interface HospitalContextProps {
  selectedHospital: any;
  setHospital: (hospital: any) => void;
}

const HospitalContext = createContext<HospitalContextProps>({ selectedHospital: null, setHospital: (hospital) => {} });

export const HospitalProvider: React.FC = ({ children }) => {
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
  return useContext(HospitalContext);
};
