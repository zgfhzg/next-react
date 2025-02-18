export default function IdPage({
    params: { id },
}: {
    params: { id: string };
}) {
    return (
        <div id="main">
            <h2 id="subTitle">Page Id : {id}</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{id}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
