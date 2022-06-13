import axios from "axios";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

const ApiData = () => {
  const [data, setData] = useState("Ahmedabad");
  const [resp, setResp] = useState();
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=cb02c58d5fda4f5582e112604220806&q=${data}&days=1&aqi=no&alerts=no`
      )
      .then((response: any) => {
        if (response.status === 200) {
          // console.log(response);
          setResp(response);
        }
      })
      .catch((error: any) => console.log(error));
  }, [data]);
  console.log(data);

  const handleSubmit = () => {
    console.log(resp);
  };

  return <div></div>;
};

export default ApiData;
