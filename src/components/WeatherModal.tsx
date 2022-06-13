import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WeatherModal = (props: any) => {
  // const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);
  const [res, setRes]: any = React.useState();
  console.log(props.open);

  React.useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=cb02c58d5fda4f5582e112604220806&q=${props.data}&days=1&aqi=no&alerts=no`
      )
      .then((response: any) => {
        if (response.status === 200) {
          setRes(response?.data);
        }
      })
      .catch((error: any) => console.log(error));
  }, [props.data]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <h2>{props.data}</h2>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Current Temp : {res?.current?.temp_c} C
            </Typography>
            {res?.forecast?.forecastday.map((item: any) => {
              return (
                <>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    max Temp: {item?.day?.maxtemp_c} C{" "}
                  </Typography>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Min Temp: {item?.day?.mintemp_c} C
                  </Typography>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Sunrice : {item?.astro?.sunrise}{" "}
                  </Typography>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Sunset : {item?.astro?.sunset}{" "}
                  </Typography>
                </>
              );
            })}
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Last Updated : {res?.current?.last_updated}{" "}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default WeatherModal;
