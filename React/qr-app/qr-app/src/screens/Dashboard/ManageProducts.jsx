import { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import axios from "axios";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/equipment/equipments/getAll"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  const data = useMemo(() => products, [products]);

  const columns = useMemo(
    () => [
      {
        Header: "Ürün ID",
        accessor: "_id",
      },
      {
        Header: "Ürün Kodu",
        accessor: "equipmentCode",
      },
      {
        Header: "Ürün Adı",
        accessor: "equipmentName",
      },
      // {
      //   Header: "Yeri",
      //   accessor: "equipmentLocation",
      // },
      // {
      //   Header: "Sınıfı",
      //   accessor: "equipmentClass",
      // },
      {
        Header: "Seri No",
        accessor: "equipmentSerieNo",
      },
      // {
      //   Header: "Faal",
      //   accessor: "equipmentActive",
      // },
      {
        Header: "QR Kod",
        accessor: "qrCode",
        Cell: ({ value }) => (
          <img
            src={value}
            alt="QR Code"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        Header: "İşlemler",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <FaEdit
              className="text-blue-500 text-base cursor-pointer"
              title="Düzenle"
            />
            <FaTrash
              className="text-red-500 text-base cursor-pointer"
              title="Sil"
            />
            <FaInfoCircle
              className="text-green-500 text-base cursor-pointer"
              title="Ayrıntılar"
            />
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Sayfalama için kullanılan veri
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Başlangıçta gösterilecek sayfa
    },
    useSortBy,
    usePagination // Sayfalama hook'u
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border-2 border-slate-800 rounded-lg overflow-hidden"
        >
          <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-3 text-left text-sm font-semibold tracking-wide"
                  >
                    {column.render("Header")}
                    {/* Sıralama göstergesi */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  key={row.id}
                  {...row.getRowProps()}
                  className={`border-b last:border-none ${
                    row.index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200 transition-colors duration-200`}
                >
                  {row.cells.map((cell) => (
                    <td
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      className="p-3 text-sm text-gray-700"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Sayfalama kontrolleri */}
        <div className="flex justify-between p-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="bg-gray-300 px-3 py-1 rounded disabled:bg-gray-100"
          >
            Önceki
          </button>
          <div>
            Sayfa{" "}
            <strong>
              {pageIndex + 1} / {pageOptions.length}
            </strong>
          </div>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="bg-gray-300 px-3 py-1 rounded disabled:bg-gray-100"
          >
            Sonraki
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
