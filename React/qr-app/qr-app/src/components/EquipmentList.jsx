import React from "react";

function EquipmentList({ equipments, onSelect }) {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Tüm Ekipmanlar</h2>
      <ul>
        {equipments.map((equipment) => (
          <li
            key={equipment.equipmentCode}
            className="border-b py-2 cursor-pointer"
            onClick={() => onSelect(equipment)}
          >
            {equipment.equipmentName} ({equipment.equipmentCode})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EquipmentList;
