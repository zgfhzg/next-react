'use client'
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {columns, Data} from "@/app/budget/columns";
import {DataTable} from "@/app/budget/data-table";

export default function Budget() {
    const [data, setRows] = useState<Data[]>([]);

    async function fetchData() {
        const res = await fetch('/api/budgets');
        return await res.json();
    }

    // const elements = [
    //     { type: 'text', name: 'title', placeholder: '항목' },
    //     { type: 'number', name: 'amount', placeholder: '가격' },
    //     { type: 'date', name: 'date', placeholder: '날짜', className: 'wid100' },
    //     { type: 'checkbox', name: 'name', title: '결제자', options: ['A', 'B'] },
    // ];

    // const totalPrice = data.reduce((sum, row) => sum + row.price, 0);

    function save() {
        fetch('/api/budget/save', {
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
        fetchData().then(res => setRows(res._embedded.budgets));
    }, []);

    return (
        <div id="main">
            <div className="inner">
                <h1 id="pageTitle" className="subtitle">결혼 예산 사용 내역</h1>
                <div style={{margin: "0 0 1em 0"}}>
                    <Button className={"bg-gray-200 hover:bg-gray-500 text-white"}>추가</Button>
                    {/*<Dialog isOpen={isDialogOpen} onClose={closeDialog} title={"경비 사용 내역"} elements={elements}/>*/}
                    <Button onClick={save} className={"bg-gray-200 hover:bg-gray-500 text-white right"}>저장</Button>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
