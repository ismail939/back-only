import { useState , useRef, useMemo, useCallback } from "react"
import { MapContainer, TileLayer, Marker , Popup } from 'react-leaflet'
import { useSelector } from "react-redux";
import mapIcon from "./images/mapIcon.png"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"
const center = {
    lat: 30.0666670,
    lng: 31.2833330,
}

function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const role = useSelector(store => store.auth).role;
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const customIcon = new Icon({
        iconUrl:mapIcon,
        iconSize:[38,38],
        iconAnchor: [20,40]
    })
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])
    return (
        <Marker
            draggable={ draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={customIcon}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Click Again to Fix location'
                        : 'Click here change location'}
                </span>
            </Popup>
        </Marker>
    )
}


export default function OpenStreetMap(){
    return(
        <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker />
        </MapContainer>
    )
}

