const TOKEN =
  "pk.eyJ1IjoieWFzaGdlZGl5YSIsImEiOiJjbDQ1ajZyazQwYnd4M2luamN3bngzazNsIn0.aCY1j9PoTtMWEtpg-q0Pdg";

export const mapBoxGeocodingAPI = (query: any) => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?&country=In&region=Gujarat&district=Ahmadabad&place=Ahmedabad&access_token=${TOKEN}`;
};
