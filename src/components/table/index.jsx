import { useEffect, useState } from "react";
import Header from "./header";

const initialState = {
  pageIndex: 0,
  pageSize: 10,
  pageCount: 1000,
  canNextPage: true,
  canPreviousPage: false,
};

const Table = ({ columns, initialData }) => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <table className="table-auto w-full">
      <Header column={columns} />
      <tbody className="text-sm divide-y divide-slate-200">
        {data.map((entity) => {
          return (
            <tr>
              {columns.map((column) => {
                const { accessor, Cell } = column;
                return (
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    {Cell
                      ? Cell(entity[accessor], entity, column)
                      : entity[accessor]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
