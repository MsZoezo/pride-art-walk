import { Flavor, BLACK, LIGHT, DARK } from '@protomaps/basemaps';

export const theme2: Flavor = {
    background: '#231f20',
    other: '#352f31',

    /* Natural features */  
    earth: '#231f20',

    water: '#c1e8fa',
    glacier: '#352f31',

    sand: '#352f31',
    beach: '#352f31',

    scrub_a: '#352f31',
    scrub_b: '#352f31',

    wood_a: '#352f31',
    wood_b: '#352f31',

    park_a: '#352f31',
    park_b: '#352f31',

    /* Land zones */
    hospital: '#352f31',
    industrial: '#352f31',
    school: '#352f31',
    zoo: '#352f31',
    military: '#352f31',
    aerodrome: '#352f31',
    runway: '#352f31',
    pedestrian: '#352f31',

    /* Transportational */
    bridges_other: '#fff',
    bridges_other_casing: '#fff',

    bridges_minor: '#fff',
    bridges_minor_casing: '#fff',
    
    bridges_link: '#fff',
    bridges_link_casing: '#fff',
    
    bridges_major: '#fff',
    bridges_major_casing: '#fff',
    
    bridges_highway: '#fff',
    bridges_highway_casing: '#fff',

    tunnel_minor: '#fff',
    tunnel_minor_casing: '#fff',

    tunnel_other: '#fff',
    tunnel_other_casing: '#fff',

    tunnel_link: '#fff',
    tunnel_link_casing: '#fff',

    tunnel_major: '#fff',
    tunnel_major_casing: '#fff',
    
    tunnel_highway: '#fff',
    tunnel_highway_casing: '#fff',
    
    minor_a: '#fff',
    minor_b: '#fff',
    minor_casing: '#fff',
    
    minor_service: '#fff',
    minor_service_casing: '#fff',
    
    major: '#fff',
    major_casing_early: '#fff',
    major_casing_late: '#fff',
    
    highway: '#fff',
    highway_casing_early: '#fff',
    highway_casing_late: '#fff',
    
    link: '#fff',
    link_casing: '#fff',
    
    railway: '#fff',
    
    pier: '#fff',
    
    /* Structures */
    buildings: '#352f31',

    /* Borders */
    boundaries: '#352f31',

    /* Labels */
    ocean_label: 'white',

    roads_label_minor: '#352f31',
    roads_label_minor_halo: '#352f31',
    
    roads_label_major: '#352f31',
    roads_label_major_halo: '#352f31',
    
    subplace_label: 'white',
    subplace_label_halo: 'white',
    
    address_label: 'white',
    address_label_halo: 'white',
    
    city_label: 'white',
    city_label_halo: 'white',
    
    state_label: 'white',
    state_label_halo: 'white',
    
    country_label: 'white',

    regular: 'white',
    bold: 'white',
    italic: 'white',

    pois: {
        blue: '#231f20',
        green: '#231f20',
        lapis: '#231f20',
        pink: '#231f20',
        red: '#231f20',
        slategray: '#231f20',
        tangerine: '#231f20',
        turquoise: '#231f20',
    }
};

export const theme: Flavor = {
    ...DARK,

    water: '#c1e8fa',
}