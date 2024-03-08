'use client';
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from './Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  // Set default response language and region (optional).
  // This sets default values for language and region for geocoding requests.
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: 'en', // Default language for responses.
    region: 'us', // Default region for responses.
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        // check for results
        if (res.results.length === 0) {
          // no results found
          setGeocodeError(true);
          setLoading(false);
        } else {
          const { lat, lng } = res.results[0].geometry.location;

          setLat(lat);
          setLong(lng);
          setViewport({
            ...viewport,
            latitude: lat,
            longitude: lng,
          });
          setGeocodeError(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  // handle case where geocoding failed
  if (geocodeError) {
    return <div className='text-xl'>No location data found.</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Marker longitude={long} latitude={lat} anchor='bottom'>
          <Image src={pin} alt='location' width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
