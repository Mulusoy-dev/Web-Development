import { useState } from "react";
import axios from "axios";

function AddEquipment({ onAdd }) {
  const [formData, setFormData] = useState({
    equipmentCode: "",
    equipmentName: "",
    equipmentLocation: "",
    equipmentClass: "",
    equipmentSerieNo: "",
    equipmentCapacity: "",
    equipmentActive: "",
    equipmentTMSActive: "",
    periodicControlLastDate: "",
    periodicControlFutureDate: "",
    periodicControlCompany: "",
    remainDay: "",
    fault: "",
    periodicMaintenanceLastDate: "",
    periodicMaintenanceFutureDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/equipment/newEquipment", formData)
      .then((response) => {
        onAdd(response.data);
        setFormData({
          equipmentCode: "",
          equipmentName: "",
          equipmentLocation: "",
          equipmentClass: "",
          equipmentSerieNo: "",
          equipmentCapacity: "",
          equipmentActive: "",
          equipmentTMSActive: "",
          periodicControlLastDate: "",
          periodicControlFutureDate: "",
          periodicControlCompany: "",
          remainDay: "",
          fault: "",
          periodicMaintenanceLastDate: "",
          periodicMaintenanceFutureDate: "",
        });
      })
      .catch((error) => console.error("Error adding equipment:", error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-4 mb-4"
    >
      <h2 className="text-xl font-semibold mb-4">Yeni Ekipman Ekle</h2>
      {/* Form elemanları buraya gelecek */}
      <input
        type="text"
        placeholder="Ekipman Kodu"
        value={formData.equipmentCode}
        onChange={(e) =>
          setFormData({ ...formData, equipmentCode: e.target.value })
        }
        className="border rounded p-2 w-full mb-2"
        required
      />
      {/* Diğer form elemanları */}
      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 w-full"
      >
        Ekle
      </button>
    </form>
  );
}

export default AddEquipment;
