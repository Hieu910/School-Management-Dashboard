import React from "react";
import Image from "next/image";
const Table = ({
  columns,
  renderRow,
  data
}: {
  columns: {
    header: string;
    accessor: string;
  }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, i) => {
              return <th key={i}>{col.header}</th>;
            })}

       
          </tr>
        </thead>
        <tbody>
            {data.map((item) => renderRow(item))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
