"use client"

import { useEffect, useRef } from "react"

const RODOBRAS_LOCATIONS: [number, number][] = [
  [-27.604, -48.585528],
  [-27.62475, -48.655417],
  [-27.48825, -48.6505],
  [-27.4515, -48.40425],
]

const LOCATION_NAMES = ["Florianópolis", "Palhoça", "Biguaçu", "Ingleses"]

export function LocationsMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    // Evita duplicar o mapa no Strict Mode
    if (mapRef.current) return

    void import("leaflet").then((L) => {
      const container = containerRef.current
      if (!container) return
      if ((container as HTMLElement & { _leaflet_id?: number })._leaflet_id) return

      const map = L.default.map(container, {
        scrollWheelZoom: true,
        zoomControl: false,
        attributionControl: false,
      })

      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      L.default.control.attribution({ prefix: "" }).addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>').addTo(map)

      const rodobrasIcon = L.default.divIcon({
        className: "rodobras-marker",
        html: `<span style="display:block;width:28px;height:28px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="display:block;margin:2px;"><path fill-rule="evenodd" fill="#EB720C" stroke="#c4620a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0 M12 10m-3 0a3 3 0 1 1 6 0a3 3 0 1 1-6 0"/></svg></span>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })

      const bounds = L.default.latLngBounds(
        RODOBRAS_LOCATIONS.map(([lat, lng]) => [lat, lng] as [number, number])
      )

      RODOBRAS_LOCATIONS.forEach(([lat, lng], index) => {
        const name = LOCATION_NAMES[index] ?? `Unidade ${index + 1}`
        const ariaLabel = `Unidade Rodobras ${name} - Abrir localização no Google Maps`
        const marker = L.default.marker([lat, lng], {
          icon: rodobrasIcon,
          alt: ariaLabel,
        }).addTo(map)
        const setAriaLabel = () => {
          const iconEl = (marker as unknown as { _icon?: HTMLElement })._icon
          if (iconEl) iconEl.setAttribute("aria-label", ariaLabel)
        }
        setAriaLabel()
        marker.on("add", setAriaLabel)
        marker.on("click", () => {
          window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank", "noopener,noreferrer")
        })
      })

      map.fitBounds(bounds.pad(0.15))
      map.addControl(L.default.control.zoom({ position: "bottomright" }))

      mapRef.current = map
    })

    return () => {
      if (mapRef.current && typeof (mapRef.current as { remove: () => void }).remove === "function") {
        (mapRef.current as { remove: () => void }).remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-[200px] w-full min-h-[200px] rounded-lg z-0"
      aria-label="Mapa com as quatro unidades Rodobras"
    />
  )
}
