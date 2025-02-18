import React from "react";

export default function Tfoot({ isTfoot , totalPrice }: { isTfoot: boolean , totalPrice: number }) {
    if (!isTfoot) {
        return null;
    }
    
    return (
        <tfoot>
            <tr>
                <td>합계</td>
                <td colSpan={3}>{totalPrice}</td>
            </tr>
        </tfoot>
    )
}
