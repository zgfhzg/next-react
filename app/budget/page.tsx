'use client'
import Table from "../../components/table";
import {Column} from "react-table";
import React, {useEffect, useState} from "react";
import {format} from "date-fns";
import Dialog from "../../components/dialog";

interface Data {    // 데이터 구조체
    name: string;
    price: number;
    payDate: string;
    payer: string;
}

export default function Budget() {
    const [data, setRows] = useState<Data[]>([]);

    async function fetchData() {
        const res = await fetch('https://api.example.com/data');
        return await res.json();
    }
    
    const columns: Column<Data>[] = [
        { Header: '항목', accessor: 'name' },
        { Header: '금액', accessor: 'price' },
        { Header: '날짜', accessor: 'payDate' },
        { Header: '결제자', accessor: 'payer' },
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const elements = [
        { type: 'text', name: 'title', placeholder: '항목' },
        { type: 'number', name: 'amount', placeholder: '가격' },
        { type: 'date', name: 'date', placeholder: '날짜', className: 'wid100' },
        { type: 'checkbox', name: 'name', title: '결제자', options: ['A', 'B'] },
    ];

    const totalPrice = data.reduce((sum, row) => sum + row.price, 0);
    const addRow = (subData: Record<string, any>) => {
        const newData: Data = {
            name: subData.name,
            price: Number(subData.price),
            payDate: format(subData.payDate, 'yy/MM/dd'),
            payer: subData.payer,
        }
        setRows([...data, newData]);
    }

    function save() {
        fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
            fetchData().then(res => setRows(res));
        })
        .catch(error => {
            console.error('Error:', error);
            alert('저장 중 오류가 발생했습니다.');
        });
    }

    useEffect(() => {
        fetchData().then(res => setRows(res));
    }, []);

    return (
        <div id="main">
            <div className="inner">
                <h1 id="pageTitle" className="subtitle">결혼 예산 사용 내역</h1>
                <div>
                    <div className="button left plus" onClick={openDialog}>추가</div>
                    <Dialog isOpen={isDialogOpen} onClose={closeDialog} onSubmit={addRow} title={"경비 사용 내역"} elements={elements}/>
                    <div className="button right" onClick={save}>저장</div>
                </div>
                <Table tableId="budgetTable" columns={columns} data={data} totalPrice={totalPrice} isTfoot={true}/>
            </div>
        </div>
    )
}
