import {ColumnDef} from "@tanstack/table-core";

export type Data = {    // 데이터 구조체
    name: string
    price: number
    payDate: string
    payer: string
}

export const columns: ColumnDef<Data>[] = [
    { header: '항목', accessorKey: 'name', size: 150 },
    { header: '금액', accessorKey: 'price', size: 100 },
    { header: '날짜', accessorKey: 'payDate', size: 150 },
    { header: '결제자', accessorKey: 'payer', size: 80 },
];
