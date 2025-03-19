import {ColumnDef} from "@tanstack/table-core";

export type Data = {    // 데이터 구조체
    name: string
    price: number
    payDate: string
    payer: string
}

export const columns: ColumnDef<Data>[] = [
    { header: '항목', accessorKey: 'name' },
    { header: '금액', accessorKey: 'price' },
    { header: '날짜', accessorKey: 'payDate' },
    { header: '결제자', accessorKey: 'payer' },
];