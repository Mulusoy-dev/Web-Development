import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  // TODO: Fetch available places from backend API

  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
