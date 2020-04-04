import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useColorMode } from '@xstyled/emotion';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import Box from './primitives/Box';
import { tripSelector } from '../redux/selectors';
import { path, stations } from '../data';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {
  const [colorMode] = useColorMode();

  const map = useRef();
  const mapRef = useRef();
  const marker = useRef();

  const { pathStep } = useSelector(tripSelector);

  useLayoutEffect(() => {
    function handleLoadMap() {
      map.current.addSource('route', {
        type: 'geojson',
        lineMetrics: true,
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'geojson',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: path
              }
            }
          ]
        }
      });
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#bf1e4e',
          'line-width': 3,
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            '#f80045',
            1,
            '#7d00f4'
          ]
        }
      });

      map.current.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features:
            stations.map(station => ({
              // feature for Mapbox DC
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: station.coordinates
              },
              properties: {
                title: 'Mapbox DC',
                icon: 'monument'
              }
            })) || []
        }
      });

      map.current.addLayer({
        id: 'points',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 7,
          'circle-color': '#616782',
          'circle-opacity': 0.95
        }
      });

      map.current.addSource('startPoint', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              // feature for Mapbox SF
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: path[0]
              },
              properties: {
                title: 'Mapbox SF',
                icon: 'harbor'
              }
            }
          ]
        }
      });
      map.current.addLayer({
        id: 'startPoint',
        type: 'circle',
        source: 'startPoint',
        paint: {
          'circle-radius': 10,
          'circle-color': '#f80045',
          'circle-opacity': 0.95
        }
      });

      map.current.addSource('endPoint', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              // feature for Mapbox DC
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: path[path.length - 1]
              },
              properties: {
                title: 'Mapbox DC',
                icon: 'monument'
              }
            }
          ]
        }
      });
      map.current.addLayer({
        id: 'endPoint',
        type: 'circle',
        source: 'endPoint',
        paint: {
          'circle-radius': 10,
          'circle-color': '#7d00f4',
          'circle-opacity': 0.95
        }
      });

      marker.current = new mapboxgl.Marker({ color: '#f80045' });
      marker.current.setLngLat(path[pathStep]);
      marker.current.addTo(map.current);
    }

    mapboxgl.accessToken =
      'pk.eyJ1IjoicmFteW0iLCJhIjoiY2s4YmNqdDgwMGFmaTNmcWZjYWtsd3RsNiJ9.tWlKUvU-XU-3LimUKS5ynQ';
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      pitch: 40, // pitch in degrees
      bearing: 30, // bearing in degrees

      style:
        colorMode === 'dark'
          ? 'mapbox://styles/ramym/ck8biaz6w0x5f1iq32sxhe1r9' //dark
          : 'mapbox://styles/ramym/ck8bi6rsp0x321io7etwo9cko', //light
      // center: [31.38688216, 30.03001257],
      bounds: [path[0], path[path.length - 1]],
      fitBoundsOptions: {
        padding: 20
      },
      zoom: 12 // TODO: set zoom level based on breakpoint
    });

    map.current.on('load', handleLoadMap);

    return () => map.current.off('load', handleLoadMap);
  }, [colorMode, pathStep]);

  useEffect(() => {
    if (marker.current) {
      marker.current.setLngLat(path[pathStep]);

      marker.current.addTo(map.current);
    }
  }, [marker, pathStep]);

  return (
    <Box
      ref={mapRef}
      backgroundColor={colorMode === 'dark' ? '#151515' : '#efefef'}
      boxShadow="greyInset"
      minHeight={{ xs: '30vh', md: '40vh' }}
      width="100%"
    ></Box>
  );
}
