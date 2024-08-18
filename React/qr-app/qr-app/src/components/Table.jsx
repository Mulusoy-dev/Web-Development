import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdSettings } from "react-icons/io";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Verileri API'den çekme
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/equipment/equipments/getAll"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Veriler çekilirken hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-slate-800">
          <thead className="bg-slate-200 border-b-2 border-black">
            <tr>
              <th className="py-4 text-center border-x-2 border-x-black">
                Ürün ID
              </th>
              <th className="py-4 text-center border-x-2 border-x-black">
                Ürün Kodu
              </th>
              <th className="py-4 text-center border-x-2 border-x-black">
                Ürün Adı
              </th>
              <th className="py-4 text-center border-x-2 border-x-black">
                Yeri
              </th>
              <th className="py-4 text-center border-x-2 border-x-black">
                Sınıfı
              </th>
              <th className="py-4 text-center border-x-2 border-x-black">
                Seri No
              </th>
              {/* <th className="py-2 px-4 border-x-2 border-x-black">
                Kapasitesi
              </th> */}
              <th className="py-4 text-center border-x-2 border-x-black">
                Faal
              </th>
              {/* <th className="py-2 px-4 border-x-2 border-x-black">
                TMS Kullanımında Mı?
              </th>
              <th className="py-2 px-4 border-x-2 border-x-black">
                Son Kontrol Tarihi
              </th>
              <th className="py-2 px-4 border-x-2 border-x-black">
                Gelecek Kontrol Tarihi
              </th>
              <th className="py-2 px-4 border-x-2 border-x-black">Firma</th>
              <th className="py-2 px-4 border-x-2 border-x-black">Kalan Gün</th>
              <th className="py-2 px-4 border-x-2 border-x-black">Arızalar</th>
              <th className="py-2 px-4 border-x-2 border-x-black">
                Son Bakım Tarihi
              </th>
              <th className="py-2 px-4 border-x-2 border-x-black">
                Gelecek Bakım Tarihi
              </th> */}
              <th className="py-4 text-center border-x-2 border-x-black">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="border-x text-center">{product._id}</td>
                <td className="border-x text-center">
                  {product.equipmentCode}
                </td>
                <td className="border-x text-center">
                  {product.equipmentName}
                </td>
                <td className="border-x text-center">
                  {product.equipmentLocation}
                </td>
                <td className="border-x text-center">
                  {product.equipmentClass}
                </td>
                <td className="border-x text-center">
                  {product.equipmentSerieNo}
                </td>
                {/* <td className="py-3 px-4 border-x">
                  {product.equipmentCapacity}
                </td> */}
                <td className="border-x text-center">
                  {product.equipmentActive}
                </td>
                {/* <td className="py-3 px-4 border-x">
                  {product.equipmentTMSActive}
                </td>
                <td className="py-3 px-4 border-x">
                  {product.periodicControlLastDate}
                </td>
                <td className="py-3 px-4 border-x">
                  {product.periodicControlFutureDate}
                </td>
                <td className="py-3 px-4 border-x">
                  {product.periodicControlCompany}
                </td>
                <td className="py-3 px-4 border-x">{product.remainDay}</td>
                <td className="py-3 px-4 border-x">{product.fault}</td>
                <td className="py-3 px-4 border-x">
                  {product.periodicMaintenanceLastDate}
                </td>
                <td className="py-3 px-4 border-x">
                  {product.periodicMaintenanceFutureDate}
                </td> */}

                <td className="flex gap-2 border-b-0 items-center justify-center align-middle">
                  <FaEdit
                    className="text-blue-500 text-lg cursor-pointer"
                    title="Düzenle"
                  />
                  <FaTrash
                    className="text-red-500 text-lg cursor-pointer"
                    title="Sil"
                  />
                  <FaInfoCircle
                    className="text-green-500 text-lg cursor-pointer"
                    title="Görüntüle"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
