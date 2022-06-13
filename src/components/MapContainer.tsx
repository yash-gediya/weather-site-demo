import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
import axios from "axios";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { mapBoxGeocodingAPI } from "../Map.services";
import { Autocomplete, TextField } from "@mui/material";
import { setPriority } from "os";
import { error } from "console";
import WeatherModal from "./WeatherModal";

const MapContainer = () => {
  const mapContainer: any = useRef();
  const [data, setData] = useState("Ahmedabad, Gujarat, India");
  const [location, setLocation] = useState([]);
  const [coordinateData, setCoordinateData]: any = useState([
    72.579707, 23.021624,
  ]);
  const [properties, setProperties] = useState({ wikidata: "Q11854" });
  const [map, setMap]: any = useState(null);

  const [modalShow, setModalShow] = useState(false);

  const locationData = location?.map((item: any) => item?.place_name);

  mapboxgl.accessToken =
    "pk.eyJ1IjoieWFzaGdlZGl5YSIsImEiOiJjbDQ1ajZyazQwYnd4M2luamN3bngzazNsIn0.aCY1j9PoTtMWEtpg-q0Pdg";

  useEffect(() => {
    if (map) return;
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: coordinateData, // starting position
        zoom: 13, // starting zoom
      });
      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "marker";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);

        const handleIcon = () => {
          setModalShow(true);
        };

        el.addEventListener("click", handleIcon);
      }

      // setMap(map);
    }
  }, [coordinateData]);

  const handleSearch = () => {
    fetchRequestedData(data);
  };

  const onSelectHandler = (e: any) => {
    setData(e.target.value);
  };

  const fetchRequestedData = (searchData: any) => {
    axios
      .get(mapBoxGeocodingAPI(searchData), {
        //@ts-ignore
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Charset": "utf-8",
        }),
      })
      .then((res) => {
        setLocation(res?.data?.features);
      })
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    location.filter((item: any) => {
      if (item?.place_name === data) {
        console.log(item);

        setProperties(item?.properties);
        setCoordinateData(item?.center);
      }
    });
  }, [data]);

  const geojson: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinateData,
        },
        properties: properties,
      },
    ],
  };

  return (
    <div ref={mapContainer} className="map-container">
      <div className="sidebar">
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={locationData}
          autoHighlight
          renderInput={(params) => (
            <TextField
              name={data}
              onSelect={onSelectHandler}
              onChange={handleSearch}
              {...params}
              label="Choose a City"
            />
          )}
        />

        <WeatherModal data={data} open={modalShow} setOpen={setModalShow} />
      </div>
    </div>
  );
};

export default MapContainer;