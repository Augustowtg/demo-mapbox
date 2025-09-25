import React, { useEffect, useRef } from "react";

const citiesGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Cumaru" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-38.5, -7.7],
            [-38.4, -7.7],
            [-38.4, -7.6],
            [-38.5, -7.6],
            [-38.5, -7.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "OutraCidade" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-38.6, -7.8],
            [-38.5, -7.8],
            [-38.5, -7.7],
            [-38.6, -7.7],
            [-38.6, -7.8],
          ],
        ],
      },
    },
  ],
};

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // Mapbox será carregado dinamicamente

  const initializeMap = () => {
    if (mapRef.current || !mapContainer.current) return;

    const mapboxgl = (window as any).mapboxgl;
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-38.45, -7.65],
      zoom: 10,
    });

    mapRef.current.on("load", () => {
      // Fonte GeoJSON
      mapRef.current.addSource("cities", {
        type: "geojson",
        data: citiesGeoJSON,
      });

      // Layer de preenchimento
      mapRef.current.addLayer({
        id: "cities-layer",
        type: "fill",
        source: "cities",
        paint: {
          "fill-color": [
            "case",
            ["==", ["get", "name"], "Cumaru"],
            "#f00", // Cumaru em vermelho
            "#00f", // outras cidades em azul
          ],
          "fill-opacity": 0.5,
        },
      });

      // Contorno
      mapRef.current.addLayer({
        id: "cities-outline",
        type: "line",
        source: "cities",
        paint: {
          "line-color": "#000",
          "line-width": 2,
        },
      });
    });
  };

  const loadMapbox = async () => {
    // Adiciona CSS se não existir
    if (!document.querySelector('link[href*="mapbox-gl"]')) {
      const link = document.createElement("link");
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Adiciona JS se não existir
    if (!(window as any).mapboxgl) {
      const script = document.createElement("script");
      script.src = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js";
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  };

  useEffect(() => {
    loadMapbox();
    return () => mapRef.current?.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: 500 }} />;
}
