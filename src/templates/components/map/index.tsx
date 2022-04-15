import React from 'react';

import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from '@react-google-maps/api';
import { toast } from 'react-toastify';

import { IMap } from '@/templates/components/map/map';
import { Spinner } from '@components';

import { ILocation } from '../types';

const apiKey = process.env.NEXT_PUBLIC_API_MAP_KEY ?? '';

const Map = ({ onPlacesChange, defaultLocation, onMarkerChange }: IMap) => {
  const [location, setLocation] = React.useState<ILocation>(
    defaultLocation || {
      latitude: 10.8555043,
      longitude: 106.7866804,
    }
  );
  const [searchBox, setSearchBox] =
    React.useState<google.maps.places.SearchBox>();

  const { isLoaded } = useJsApiLoader({
    libraries: ['places'],
    googleMapsApiKey: apiKey,
  });

  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places[0] && places[0].geometry?.location) {
        setLocation({
          latitude: places[0].geometry.location.lat(),
          longitude: places[0].geometry.location.lng(),
        });
        if (onPlacesChange) {
          onPlacesChange(places[0]);
        }
      }
    }
  };

  const getCurrentLocation = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLocation(coords),
      (positionError) => toast.error(positionError.message)
    );
  }, []);

  React.useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div className="h-auto w-full rounded-lg">
      {isLoaded ? (
        <GoogleMap
          zoom={14}
          center={{ lat: location.latitude, lng: location.longitude }}
          mapContainerClassName="w-full h-96 rounded-lg"
          onClick={(e) => {
            setLocation((prevState) =>
              e.latLng
                ? {
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng(),
                  }
                : prevState
            );
          }}
        >
          <StandaloneSearchBox
            onLoad={setSearchBox}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              className="absolute top-14 left-2.5 rounded border-0 shadow-xl dark:bg-gray-700"
            />
          </StandaloneSearchBox>
          <Marker
            onPositionChanged={() =>
              onMarkerChange ? onMarkerChange(location) : undefined
            }
            position={{ lat: location.latitude, lng: location.longitude }}
          />
        </GoogleMap>
      ) : (
        <Spinner size="large" />
      )}
    </div>
  );
};

export default Map;
