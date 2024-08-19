// import { useMemo, useEffect, useState } from "react";
// import { useTable, useSortBy, usePagination } from "react-table";
// import axios from "axios";
// import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/equipment/equipments/getAll"
//         );
//         setProducts(response.data.equipments);
//         console.log(response.data.productCount);
//       } catch (error) {
//         console.error("Veri çekme hatası:", error);
//       }
//     };

//     fetchData();
//     console.log(products);
//   }, []);

//   const data = useMemo(() => products, [products]);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Ürün ID",
//         accessor: "_id",
//       },
//       {
//         Header: "Ürün Kodu",
//         accessor: "equipmentCode",
//       },
//       {
//         Header: "Ürün Adı",
//         accessor: "equipmentName",
//       },
//       {
//         Header: "Seri No",
//         accessor: "equipmentSerieNo",
//       },
//       {
//         Header: "QR Kod",
//         accessor: "qrCode",
//         Cell: ({ value }) => (
//           <img
//             src={value}
//             alt="QR Code"
//             className="w-[60px] h-[60px] text-center"
//           />
//         ),
//       },
//       {
//         Header: "İşlemler",
//         Cell: ({ row }) => (
//           <div className="flex gap-2">
//             <FaEdit
//               className="text-blue-500 text-base cursor-pointer"
//               title="Düzenle"
//               onClick={() => console.log(`Düzenle: ${row.original._id}`)}
//             />
//             <FaTrash
//               className="text-red-500 text-base cursor-pointer"
//               title="Sil"
//               onClick={() => console.log(`Sil: ${row.original._id}`)}
//             />
//             <FaInfoCircle
//               className="text-green-500 text-base cursor-pointer"
//               title="Ayrıntılar"
//               onClick={() => console.log(`Ayrıntılar: ${row.original._id}`)}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     nextPage,
//     previousPage,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 },
//     },
//     useSortBy,
//     usePagination
//   );

//   return (
//     <div className="flex flex-col">
//       <div className="overflow-x-auto">
//         <table
//           {...getTableProps()}
//           className="min-w-full bg-white border-2 border-slate-800 rounded-lg overflow-hidden"
//         >
//           <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
//             {headerGroups.map((headerGroup) => (
//               <tr
//                 key={headerGroup.getHeaderGroupProps().key}
//                 {...headerGroup.getHeaderGroupProps()}
//               >
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     key={column.getHeaderProps().key}
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     className="p-3 text-left text-sm font-semibold tracking-wide"
//                   >
//                     {column.render("Header")}
//                     <span>
//                       {column.isSorted
//                         ? column.isSortedDesc
//                           ? " 🔽"
//                           : " 🔼"
//                         : ""}
//                     </span>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr
//                   key={row.getRowProps().key}
//                   {...row.getRowProps()}
//                   className={`border-b last:border-none ${
//                     row.index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   } hover:bg-gray-200 transition-colors duration-200`}
//                 >
//                   {row.cells.map((cell) => (
//                     <td
//                       key={cell.getCellProps().key}
//                       {...cell.getCellProps()}
//                       className="p-3 text-sm text-gray-700"
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <div className="flex justify-between p-2">
//           <button
//             onClick={() => previousPage()}
//             disabled={!canPreviousPage}
//             className="bg-gray-300 px-3 py-1 rounded disabled:bg-gray-100"
//           >
//             Önceki
//           </button>
//           <div>
//             Sayfa{" "}
//             <strong>
//               {pageIndex + 1} / {pageOptions.length}
//             </strong>
//           </div>
//           <button
//             onClick={() => nextPage()}
//             disabled={!canNextPage}
//             className="bg-gray-300 px-3 py-1 rounded disabled:bg-gray-100"
//           >
//             Sonraki
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;

// import { useMemo, useEffect, useState } from "react";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/equipment/equipments/getAll"
//         );
//         setProducts(response.data.equipments);
//       } catch (error) {
//         console.error("Veri çekme hatası:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = useMemo(
//     () => [
//       { headerName: "Ürün ID", field: "_id" },
//       { headerName: "Ürün Kodu", field: "equipmentCode" },
//       { headerName: "Ürün Adı", field: "equipmentName" },
//       { headerName: "Seri No", field: "equipmentSerieNo" },
//       {
//         headerName: "QR Kod",
//         field: "qrCode",
//         cellRendererFramework: (params) => (
//           <img
//             src={params.value}
//             alt="QR Code"
//             className="w-[60px] h-[60px] text-center"
//           />
//         ),
//       },
//       {
//         headerName: "İşlemler",
//         cellRendererFramework: (params) => (
//           <div className="flex gap-2">
//             <FaEdit
//               className="text-blue-500 text-base cursor-pointer"
//               title="Düzenle"
//             />
//             <FaTrash
//               className="text-red-500 text-base cursor-pointer"
//               title="Sil"
//             />
//             <FaInfoCircle
//               className="text-green-500 text-base cursor-pointer"
//               title="Ayrıntılar"
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
//       <AgGridReact
//         rowData={products}
//         columnDefs={columns}
//         pagination={true}
//         paginationPageSize={10}
//       />
//     </div>
//   );
// };

// export default ManageProducts;

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Tag, Card, Col, Row } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  ProductFilled,
} from "@ant-design/icons";
import Header from "../../components/Header";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/equipment/equipments/getAll"
        );
        setProducts(response.data.equipments);
        console.log(response.data.productCount);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    console.log(`Düzenle: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Sil: ${id}`);
  };

  const handleInfo = (id) => {
    console.log(`Ayrıntılar: ${id}`);
  };

  const columns = [
    // {
    //   title: "Ürün ID",
    //   dataIndex: "_id",
    //   key: "_id",
    //   sorter: (a, b) => a._id.localeCompare(b._id),
    // },
    {
      title: "Ürün Kodu",
      dataIndex: "equipmentCode",
      key: "equipmentCode",

      sorter: (a, b) => a.equipmentCode.localeCompare(b.equipmentCode),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-4">
          <input
            placeholder="Filtrele"
            value={selectedKeys[0] || ""}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            className="mb-2 p-2 w-full border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={() => confirm()}
              className="px-4 py-2 bg-blue-800 text-white rounded"
            >
              Uygula
            </button>
            <button
              onClick={() => {
                clearFilters(); // Clear filter
                setSelectedKeys([]); // Clear selected keys
                confirm(); // Apply empty filter
              }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Temizle
            </button>
          </div>
        </div>
      ),
      onFilter: (value, record) => record.equipmentCode.includes(value),
    },
    {
      title: "Ürün Adı",
      dataIndex: "equipmentName",
      key: "equipmentName",
      width: 75,
    },
    {
      title: "Konum",
      dataIndex: "equipmentLocation",
      key: "equipmentLocation",
    },
    {
      title: "Sınıf",
      dataIndex: "equipmentClass",
      key: "equipmentClass",
    },
    {
      title: "Seri No",
      dataIndex: "equipmentSerieNo",
      key: "equipmentSerieNo",
    },
    // {
    //   title: "Kalan Gün",
    //   dataIndex: "remainDay",
    //   key: "remainDay",
    // },
    {
      title: "QR Kod",
      dataIndex: "qrCode",
      key: "qrCode",

      render: (text) => (
        <img src={text} alt="QR Code" style={{ width: 60, height: 60 }} />
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
            title="Düzenle"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            title="Sil"
            danger
          />
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleInfo(record._id)}
            title="Ayrıntılar"
            type="primary"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-1 p-2">
      <Header />
      {/* <div className="flex flex-row justify-between gap-4 items-center">
        <div className="flex flex-row bg-slate-200 gap-4 py-4 px-2 mb-2 rounded-md hover:bg-slate-300 ease-in-out duration-200 items-center">
          <ProductFilled className="font-bold text-2xl text-red-500" />
          <h1>Toplam Ürün Sayısı:</h1>
          <p>1000 Adet</p>
        </div>
        <div className="flex flex-row bg-slate-200 gap-4 py-4 px-2 mb-2">
          <h1>Toplam Ürün Sayısı:</h1>
          <p>1000 Adet</p>
        </div>
        <div className="flex flex-row bg-slate-200 gap-4 py-4 px-2 mb-2">
          <h1>Toplam Ürün Sayısı:</h1>
          <p>1000 Adet</p>
        </div>
        <div className="flex flex-row bg-slate-200 gap-4 py-4 px-2 mb-2">
          <h1>Toplam Ürün Sayısı:</h1>
          <p>1000 Adet</p>
        </div>
      </div> */}

      {/* Summary Card Section */}
      <div className="mb-2">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Toplam Ürün Sayısı"
              bordered={true}
              hoverable
              style={{
                backgroundColor: "#ffffff", // Light grey background
              }}
              headStyle={{ backgroundColor: "#4CAF50", color: "#ffffff" }} // Green header with white text
            >
              <div className="flex flex-row justify-start">
                <ProductFilled className="text-2xl mr-6 text-[#4CAF50]" />
                <h2 className="font-bold text-slate-800 text-base">
                  Card content
                </h2>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Ürün Katalog Sayısı"
              bordered={false}
              hoverable
              style={{
                backgroundColor: "#ffffff", // White background
              }}
              headStyle={{ backgroundColor: "#2196F3", color: "#ffffff" }} // Blue header with white text
            >
              <div className="flex flex-row justify-start">
                <ProductFilled className="text-2xl mr-6 text-[#2196F3]" />
                <h2 className="font-bold text-slate-800 text-base">
                  Card content
                </h2>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Arızalı Ürün Sayısı"
              bordered={false}
              hoverable
              style={{
                backgroundColor: "#ffffff", // White background
              }}
              headStyle={{ backgroundColor: "#A91D3A", color: "#ffffff" }} // Orange header with white text
            >
              <div className="flex flex-row justify-start">
                <ProductFilled className="text-2xl mr-6 text-[#A91D3A]" />
                <h2 className="font-bold text-slate-800 text-base">
                  Card content
                </h2>
              </div>
            </Card>
          </Col>

          <Col span={8} className="mt-2">
            <Card
              title="Kontrol Zamanı Gelmiş Ürün Sayısı"
              bordered={false}
              hoverable
              style={{
                backgroundColor: "#ffffff", // White background
              }}
              headStyle={{ backgroundColor: "#FF6500", color: "#ffffff" }} // Orange header with white text
            >
              <div className="flex flex-row justify-start">
                <ProductFilled className="text-2xl mr-6 text-[#FF6500]" />
                <h2 className="font-bold text-slate-800 text-base">
                  Card content
                </h2>
              </div>
            </Card>
          </Col>

          <Col span={8} className="mt-2">
            <Card
              title="Bakım Zamanı Gelmiş Ürün Sayısı"
              bordered={false}
              hoverable
              style={{
                backgroundColor: "#ffffff", // White background
              }}
              headStyle={{ backgroundColor: "#6C0345", color: "#ffffff" }} // Orange header with white text
            >
              <div className="flex flex-row justify-start">
                <ProductFilled className="text-2xl mr-6 text-[#6C0345]" />
                <h2 className="font-bold text-slate-800 text-base">
                  Card content
                </h2>
              </div>
            </Card>
          </Col>
          <Col span={8} className="mt-2">
            <Card
              title="Faal Ürün Sayısı"
              bordered={false}
              hoverable
              style={{
                backgroundColor: "#ffffff", // White background
              }}
              headStyle={{ backgroundColor: "#496989", color: "#ffffff" }} // Orange header with white text
            >
              <div className="flex flex-row justify-start">
                <ProductFilled className="text-2xl mr-6 text-[#496989]" />
                <h2 className="font-bold text-slate-800 text-base">
                  Card content
                </h2>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        className="mb-4 mt-2 overflow-x-auto"
      />
    </div>
  );
};

export default ManageProducts;
