import React from "react";
import type { TestDataItem } from "../../services/testDataService";

interface DataListProps {
  data: TestDataItem[];
}

export const DataList: React.FC<DataListProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No hay datos disponibles
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3">Datos del Servidor</h3>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={item.id || index} className="p-2 bg-gray-50 rounded border">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
