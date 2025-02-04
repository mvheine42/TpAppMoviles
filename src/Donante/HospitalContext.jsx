import React, { createContext, useContext, useState } from 'react';

const HospitalContext = createContext({
  selectedHospital: null,
  setHospital: () => {}, // Función de no-op para valores iniciales
});

export const HospitalProvider = ({ children }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const setHospital = (hospital) => {
    //console.log("Set hospital: ", hospital);  // Aquí puedes ver si se está actualizando el hospital
    setSelectedHospital(hospital); // Guarda el hospital seleccionado
  };

  return (
    <HospitalContext.Provider value={{ selectedHospital, setHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospitalContext = () => {
  const context = useContext(HospitalContext);
  //console.log("useHospitalContext:", context); // Verifica que el contexto está siendo accesado correctamente
  return context;
};
