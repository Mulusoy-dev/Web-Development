import axios from "axios";
import { useEffect, useState } from "react";
import EquipmentList from "./components/EquipmentList";
import AddEquipment from "./components/AddEquipment";
// import UpdateEquipment from "./components/UpdateEquipment";
// import EquipmentDetail from "./components/EquipmentDetail";

const App = () => {
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/equipment/equipments/getAll")
      .then((response) => setEquipments(response.data))
      .catch((error) => console.error("Error fetching equipment data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ekipman Yönetim Sistemi</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <AddEquipment
            onAdd={(newEquipment) =>
              setEquipments([...equipments, newEquipment])
            }
          />
          {/* <UpdateEquipment
            selectedEquipment={selectedEquipment}
            onUpdate={(updatedEquipment) => {
              const updatedList = equipments.map((equip) =>
                equip.equipmentCode === updatedEquipment.equipmentCode
                  ? updatedEquipment
                  : equip
              );
              setEquipments(updatedList);
            }}
          /> */}
        </div>

        <div>
          <EquipmentList
            equipments={equipments}
            onSelect={(equipment) => setSelectedEquipment(equipment)}
          />
          {/* {selectedEquipment && (
            <EquipmentDetail equipment={selectedEquipment} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default App;
