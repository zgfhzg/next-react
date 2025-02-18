'use client';
// components/Table.tsx
import React from 'react';
import { useTable, Column } from 'react-table';
import '../public/css/table.css';
import Tfoot from "./tfoot";

interface TableProps<T extends object> {
    columns: Column<T>[];
    data: T[];
    totalPrice: number;
    tableId?: string;
    isTfoot: boolean;
}

const Table = <T extends object>({ columns, data, totalPrice, tableId, isTfoot }: TableProps<T>) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} id={tableId}>
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, j) => (
                            <th {...column.getHeaderProps()} key={j}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={index}>
                            {row.cells.map((cell, j) => (
                                <td {...cell.getCellProps()} key={j}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
            <Tfoot isTfoot={isTfoot} totalPrice={totalPrice} />
        </table>
    );
};

export default Table;
