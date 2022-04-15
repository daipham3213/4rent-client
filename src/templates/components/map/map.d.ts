import { ILocation } from '../types';
// eslint-disable-next-line import/order
import PlaceResult = google.maps.places.PlaceResult;

export interface IMap {
  defaultLocation?: ILocation;
  onPlacesChange?: (result: PlaceResult) => void;
  onMarkerChange?: (location: ILocation) => void;
}
