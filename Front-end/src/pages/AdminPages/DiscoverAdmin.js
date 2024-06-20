import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function DiscoverAdmin() {
    const [cwspaces, setCWSpaces] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    const [selected, setSelected] = useState({});
    const token = useSelector(store => store.auth).token;
    const getWorkSpaces = () => {
        fetch("http://localhost:4000/cw_spaces")
            .then(res => res.json())
            .then(responsedata => {
                setCWSpaces(responsedata.data);
            }
            ).catch(error => { setFetchError(true); });
    }
    useEffect(() => {
        getWorkSpaces();
    }, [])
    const EditCW = (cwspace) => {
        fetch(`http://localhost:4000/cw_spaces/${cwspace.cwID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "home": "home",
                "discoverType": selected[cwspace.name],
            }),
        }).then(res => res.json()).then((data) => { console.log(data) })
    }
    const removeCW = (cwID) => {
        fetch(`http://localhost:4000/cw_spaces/${cwID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "home": null,
                "discoverType": null,
            }),
        }).then(res => res.json()).then((data) => { console.log(data) })
    }
    const HandleChange = (e , name) => {
        // Function to receive value from child and update the state in the parent
        setSelected({...selected , [name] : e.target.value} ) ;
    };
    return (
        <div className="min-h-screen mt-[70px] w-4/5 mx-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">WorkSpace Name</th>
                        <th scope="col">Discover</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {cwspaces ? cwspaces.map((cwspace, index) => {
                        return (
                            <tr>
                                <th scope="row">{++index}</th>
                                <td>{cwspace.name}</td>
                                <td className="min-w-100 flex gap-8 justify-center">
                                    <button className="px-3 py-2 bg-green-500" onClick={() => EditCW(cwspace)}>Add</button>
                                    <button className="px-3 py-2 bg-red-500" onClick={() => removeCW(cwspace.cwID)}>remove</button>
                                </td>
                                <td><select aria-label="Default select example" className="py-2 border border-black rounded-md" onChange={(e) => HandleChange(e , cwspace.name)}>
                                <option value="New" className="w-full px-2" selected>Select</option>
                                    <option value="New" className="w-full px-2">New</option>
                                    <option value="Top-Rated">Top-Rated</option>
                                    <option value="Hot">Hot</option>
                                </select></td>
                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>
        </div>
    )
}

export default DiscoverAdmin;