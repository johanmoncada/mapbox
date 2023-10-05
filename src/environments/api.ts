export const api = {
    base: '',
    mapbox: {
        geocoding: {
            url: 'https://api.mapbox.com/geocoding/v5/mapbox.places', 
            limit: '6',
            country: 'co',
            routing: 'true',
            type: 'country'
        },
        directions: {
            url: 'https://api.mapbox.com/directions/v5/mapbox/driving',
            alternatives: false,
            geometries: 'geojson',
            languaje: 'es',
            overview: 'simplified',
            steps: false,
            notifications: 'none'
        },
        access_token: 'pk.eyJ1Ijoiam9oYW5tb25jYWRhIiwiYSI6ImNsbjR0c2tneDAzMDAycXFzNmY1NDB5Zm0ifQ.q3rE5v3tYjvh0-I640pTJQ',
        languaje: 'es',

    }
}