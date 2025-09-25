import MapComponent from "@/components/maps/map.component"
import { ListMenu } from "./map/components/list-menu"

export const HomePage = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen py-2">
            <MapComponent />
            <div>
                <ListMenu />
            </div>
        </div>
    )
}