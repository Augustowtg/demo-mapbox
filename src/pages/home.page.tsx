import MapComponent from "@/components/maps/map.component"

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <MapComponent />
        </div>
    )
}