import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { SectorsService } from './sectors/sectors.service';
import { EnquiriesService } from './enquiries/enquiries.service';
import { VideosService } from './videos/videos.service';

const videosSeed = [
  {
    id: 'SWkGWVDOtoM',
    title: 'Outdoor Gym Live Demonstration',
    category: 'Fitness Equipment',
    url: 'https://www.youtube.com/shorts/SWkGWVDOtoM',
    embedUrl: 'https://www.youtube.com/embed/SWkGWVDOtoM?autoplay=1&mute=1&loop=1&playlist=SWkGWVDOtoM&controls=1',
    order: 1,
    isActive: true
  },
  {
    id: 'Z4U7ULbBhKU',
    title: 'Playground Multi-Play System Installation',
    category: 'Play Equipment',
    url: 'https://www.youtube.com/shorts/Z4U7ULbBhKU',
    embedUrl: 'https://www.youtube.com/embed/Z4U7ULbBhKU?autoplay=1&mute=1&loop=1&playlist=Z4U7ULbBhKU&controls=1',
    order: 2,
    isActive: true
  },
  {
    id: 'K4ka1PmXV0Q',
    title: 'Solar High Mast Erection & Field Test',
    category: 'Solar Infrastructure',
    url: 'https://www.youtube.com/shorts/K4ka1PmXV0Q',
    embedUrl: 'https://www.youtube.com/embed/K4ka1PmXV0Q?autoplay=1&mute=1&loop=1&playlist=K4ka1PmXV0Q&controls=1',
    order: 3,
    isActive: true
  },
  {
    id: 'C_iYOyWlGb0',
    title: 'Solar RO Water Plant Demonstration',
    category: 'Water Purification',
    url: 'https://www.youtube.com/shorts/C_iYOyWlGb0',
    embedUrl: 'https://www.youtube.com/embed/C_iYOyWlGb0?autoplay=1&mute=1&loop=1&playlist=C_iYOyWlGb0&controls=1',
    order: 4,
    isActive: true
  },
  {
    id: '1dzwbVmiHu0',
    title: 'Paras Yoga Mat Cushioning & Grip Test',
    category: 'Yoga & Wellness',
    url: 'https://www.youtube.com/shorts/1dzwbVmiHu0',
    embedUrl: 'https://www.youtube.com/embed/1dzwbVmiHu0?autoplay=1&mute=1&loop=1&playlist=1dzwbVmiHu0&controls=1',
    order: 5,
    isActive: true
  }
];

const enquiriesSeed = [
  {
    name: 'APURV JAIN',
    email: 'APURV.jain@example.com',
    phone: '+91 98765 43210',
    subject: 'Bulk Gym Setup Quote',
    product: 'Air Walker',
    message: 'We are looking to set up an outdoor gym for our housing society. Please provide a detailed bulk price quote and installation charges.',
    status: 'New',
    date: '2026-07-15'
  },
  {
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91 91234 56789',
    subject: 'Playground Equipment for School',
    product: 'Multi Play Station',
    message: 'Need 2 sets of Multi Play Station for our school playground. Delivery expected by next month.',
    status: 'Contacted',
    date: '2026-07-16'
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 88888 77777',
    subject: 'General Partnership Enquiry',
    product: 'General',
    message: 'Hello, I want to discuss a potential partnership opportunity for supplying solar street lights in municipal parks.',
    status: 'Completed',
    date: '2026-07-17'
  }
];

const categoriesSeed = [
  { id: 'outdoor-gym', name: 'Outdoor Gym Equipment', iconName: 'Gym' },
  { id: 'playground', name: 'Playground Equipment', iconName: 'Playground' },
  { id: 'solar-lighting', name: 'Solar Lighting Solutions', iconName: 'Solar' },
  { id: 'solar-energy', name: 'Solar Energy Solutions', iconName: 'Solar' },
  { id: 'solar-ro-water', name: 'Solar RO Water Systems', iconName: 'Water' },
  { id: 'civil-infrastructure', name: 'Civil & Infrastructure Works', iconName: 'Civil' },
  { id: 'engineering-procurement', name: 'Engineering Procurement & Supply', iconName: 'Supply' },
  { id: 'yoga-mats', name: 'Yoga Mats & Accessories', iconName: 'Yoga' },
  { id: 'park-furniture', name: 'Park Furniture', iconName: 'Furniture' },
  { id: 'custom', name: 'Custom Fabrication', iconName: 'Custom' },
];

const sectorsSeed = [
  { id: 1, title: 'PUBLIC PARKS & SOCIETIES', image: '/src/assets/sector_parks.png', isOrange: false, iconName: 'Parks' },
  { id: 2, title: 'SCHOOLS & INSTITUTES', image: '/src/assets/sector_schools.png', isOrange: true, iconName: 'Schools' },
  { id: 3, title: 'GOVERNMENT PROJECTS & PSUS', image: '/src/assets/sector_government.png', isOrange: false, iconName: 'Government' },
  { id: 4, title: 'LUXURY RESORTS & HOTELS', image: '/src/assets/sector_resorts.png', isOrange: true, iconName: 'Resorts' },
  { id: 5, title: 'CORPORATE & IT PARKS', image: '/src/assets/sector_corporate.png', isOrange: false, iconName: 'Corporate' },
  { id: 6, title: 'HOUSING TOWNSHIPS', image: '/src/assets/sector_housing.png', isOrange: true, iconName: 'Housing' },
  { id: 7, title: 'SMART CITY PROJECTS', image: '/src/assets/sector_government.png', isOrange: false, iconName: 'SmartCity' },
  { id: 8, title: 'RURAL DEVELOPMENT & PANCHAYATS', image: '/src/assets/sector_parks.png', isOrange: true, iconName: 'Rural' },
  { id: 9, title: 'HEALTHCARE & HOSPITALS', image: '/src/assets/sector_schools.png', isOrange: false, iconName: 'Hospitals' },
  { id: 10, title: 'CSR & NGO PROJECTS', image: '/src/assets/sector_corporate.png', isOrange: true, iconName: 'CSR' },
];

const productsSeed = [
  {
    title: 'Air Walker',
    category: 'outdoor-gym',
    categoryLabel: 'OUTDOOR GYM EQUIPMENT',
    type: 'Cardio Equipment',
    material: 'GI Steel',
    price: 32000,
    suitability: 'Parks',
    image: '/src/assets/air_walker.png',
    desc: 'Cardio Equipment',
    bestSeller: true,
    heavyDuty: true,
    longDesc: 'The Air Walker is designed to improve leg strength, enhance cardiovascular endurance, and promote overall lower body fitness. Ideal for parks, fitness zones, societies, and public spaces.',
    highlights: [
      { label: 'Improves Leg Strength', icon: 'legs' },
      { label: 'Enhances Cardio', icon: 'cardio' },
      { label: 'Full Body Workout', icon: 'workout' },
      { label: 'Suitable For All Ages', icon: 'age' }
    ],
    specs: {
      category: 'Outdoor Gym Equipment',
      usage: 'Parks, Societies, Schools, Gyms',
      material: 'GI Steel (Heavy Duty)',
      coating: 'Powder Coated (Weather Resistant)',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/air_walker.png', '/src/assets/chest_press.png', '/src/assets/col_playground.png', '/src/assets/col_gym.png'],
    overviewBullets: [
      'Strengthens legs, hips, and glute muscles',
      'Improves balance and coordination',
      'Boosts cardiovascular endurance',
      'Suitable for all age groups',
      'Ideal for community and public fitness parks'
    ],
    muscleGroup: {
      primary: 'Legs, Hips',
      secondary: 'Core, Arms',
      focusArea: 'lower-body'
    },
    techSpecs: {
      modelName: 'Air Walker',
      productCode: 'PG-OG-AW-01',
      material: 'GI Steel (Heavy Duty)',
      pipeThickness: '2.5 mm to 3.0 mm',
      finish: 'Powder Coated',
      weatherResistance: 'Yes',
      mountingType: 'Surface / Ground Mounted',
      userCapacity: '1 Person',
      ageGroup: '12 Years & Above',
      dimension: '1100 x 500 x 1500 mm',
      safePlayArea: '1500 x 2000 mm',
      netWeight: '55 kg (Approx.)',
      maxUserWeight: '120 kg',
      certification: 'ISO 9001:2015 Certified'
    }
  },
  {
    title: 'Cross Trainer',
    category: 'outdoor-gym',
    categoryLabel: 'OUTDOOR GYM EQUIPMENT',
    type: 'Cardio Equipment',
    material: 'GI Steel',
    price: 38000,
    suitability: 'Gyms',
    image: '/src/assets/air_walker.png',
    desc: 'Cardio Equipment',
    bestSeller: false,
    heavyDuty: true,
    longDesc: 'Our heavy-duty Cross Trainer simulates walking, running, and climbing stairs to provide an effective low-impact cardiovascular workout for public spaces.',
    highlights: [
      { label: 'Low Impact Cardio', icon: 'cardio' },
      { label: 'Joint Friendly', icon: 'legs' },
      { label: 'Full Body Sync', icon: 'workout' },
      { label: 'High Durability', icon: 'age' }
    ],
    specs: {
      category: 'Outdoor Gym Equipment',
      usage: 'Parks, Societies, Gyms',
      material: 'GI Steel (Heavy Duty)',
      coating: 'Powder Coated (Weather Resistant)',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/air_walker.png', '/src/assets/chest_press.png', '/src/assets/col_playground.png', '/src/assets/col_gym.png'],
    overviewBullets: [
      'Simulates walking and climbing motions simultaneously',
      'Minimizes joint stress while maximizing calorie burn',
      'Strengthens thighs, calves, and chest muscles',
      'Equipped with anti-skid foot pedals',
      'Maintenance-free sealed ball bearings'
    ],
    muscleGroup: {
      primary: 'Quads, Calves, Chest',
      secondary: 'Core, Upper Arms',
      focusArea: 'full-body'
    },
    techSpecs: {
      modelName: 'Cross Trainer Pro',
      productCode: 'PG-OG-CT-02',
      material: 'GI Steel (Heavy Duty)',
      pipeThickness: '2.75 mm to 3.0 mm',
      finish: 'Dual Layer Powder Coated',
      weatherResistance: 'Yes',
      mountingType: 'Surface Mounted',
      userCapacity: '1 Person',
      ageGroup: '12 Years & Above',
      dimension: '1200 x 600 x 1600 mm',
      safePlayArea: '1600 x 2000 mm',
      netWeight: '62 kg (Approx.)',
      maxUserWeight: '130 kg',
      certification: 'ISO 9001:2015 Certified'
    }
  },
  {
    title: 'Chest Press',
    category: 'outdoor-gym',
    categoryLabel: 'OUTDOOR GYM EQUIPMENT',
    type: 'Strength Equipment',
    material: 'GI Steel',
    price: 42000,
    suitability: 'Parks',
    image: '/src/assets/chest_press.png',
    desc: 'Strength Equipment',
    bestSeller: true,
    heavyDuty: true,
    longDesc: 'Designed to build upper body strength, specifically targeting the chest, shoulders, and triceps in an outdoor, user-weight-resistance format.',
    highlights: [
      { label: 'Chest Strength', icon: 'workout' },
      { label: 'Upper Body Focus', icon: 'cardio' },
      { label: 'Robust Build', icon: 'legs' },
      { label: 'Safe Mechanics', icon: 'age' }
    ],
    specs: {
      category: 'Outdoor Gym Equipment',
      usage: 'Parks, Societies, Schools, Gyms',
      material: 'GI Steel (Heavy Duty)',
      coating: 'Powder Coated (Weather Resistant)',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/chest_press.png', '/src/assets/air_walker.png', '/src/assets/col_playground.png', '/src/assets/col_gym.png'],
    overviewBullets: [
      'Builds chest, shoulder, and tricep strength',
      'Ergonomically angled handles for grip safety',
      'Dual seat setup for social workouts',
      'Rust-proof heavy gauge construction',
      'Smooth resistance stroke matching user effort'
    ],
    muscleGroup: {
      primary: 'Chest, Triceps',
      secondary: 'Shoulders, Core',
      focusArea: 'upper-body'
    },
    techSpecs: {
      modelName: 'Chest Press Duo',
      productCode: 'PG-OG-CP-03',
      material: 'GI Steel (Heavy Duty)',
      pipeThickness: '3.0 mm structural tubes',
      finish: 'Thermosetting Powder Coated',
      weatherResistance: 'Yes',
      mountingType: 'Surface Ground Mounted',
      userCapacity: '2 Persons',
      ageGroup: '14 Years & Above',
      dimension: '1400 x 800 x 1800 mm',
      safePlayArea: '2000 x 2000 mm',
      netWeight: '78 kg (Approx.)',
      maxUserWeight: '120 kg per seat',
      certification: 'ISO 9001:2015 Certified'
    }
  },
  {
    title: 'Shoulder Press',
    category: 'outdoor-gym',
    categoryLabel: 'OUTDOOR GYM EQUIPMENT',
    type: 'Strength Equipment',
    material: 'GI Steel',
    price: 45000,
    suitability: 'Gyms',
    image: '/src/assets/chest_press.png',
    desc: 'Strength Equipment',
    bestSeller: false,
    heavyDuty: true,
    longDesc: 'Enhances deltoid and tricep strength, utilizing ergonomic handles and heavy-gauge steel for long lifespan in outdoor environments.',
    highlights: [
      { label: 'Shoulder Push', icon: 'workout' },
      { label: 'Arm Strength', icon: 'legs' },
      { label: 'Heavy Duty Frame', icon: 'cardio' },
      { label: 'Ergonomic Grips', icon: 'age' }
    ],
    specs: {
      category: 'Outdoor Gym Equipment',
      usage: 'Parks, Gyms, Societies',
      material: 'GI Steel (Heavy Duty)',
      coating: 'Powder Coated (Weather Resistant)',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/chest_press.png', '/src/assets/air_walker.png', '/src/assets/col_playground.png', '/src/assets/col_gym.png'],
    overviewBullets: [
      'Focuses on deltoid, trap, and arm strengthening',
      'Dual active handles for symmetric motion',
      'Weatherproof construction prevents structural rust',
      'Smooth pivot points reduce elbow joint strain',
      'Safe self-guided pressing track'
    ],
    muscleGroup: {
      primary: 'Shoulders, Deltoids',
      secondary: 'Triceps, Traps',
      focusArea: 'upper-body'
    },
    techSpecs: {
      modelName: 'Shoulder Press Outdoor',
      productCode: 'PG-OG-SP-04',
      material: 'GI Steel (Heavy Duty)',
      pipeThickness: '3.0 mm structural GI',
      finish: 'Powder Coated (Weather Resistant)',
      weatherResistance: 'Yes',
      mountingType: 'Surface Ground Mounted',
      userCapacity: '1 Person',
      ageGroup: '12 Years & Above',
      dimension: '1000 x 700 x 1700 mm',
      safePlayArea: '1500 x 2000 mm',
      netWeight: '58 kg (Approx.)',
      maxUserWeight: '125 kg',
      certification: 'ISO 9001:2015 Certified'
    }
  },
  {
    title: 'Leg Press',
    category: 'outdoor-gym',
    categoryLabel: 'OUTDOOR GYM EQUIPMENT',
    type: 'Strength Equipment',
    material: 'GI Steel',
    price: 48000,
    suitability: 'Public Use',
    image: '/src/assets/chest_press.png',
    desc: 'Strength Equipment',
    bestSeller: true,
    heavyDuty: true,
    longDesc: 'Features high-quality footplates and heavy bearings to allow users to build quadricep and calf strength safely using user-body-weight.',
    highlights: [
      { label: 'Quadricep Strength', icon: 'legs' },
      { label: 'Calf Strength', icon: 'workout' },
      { label: 'User Weight Res.', icon: 'cardio' },
      { label: 'Comfort Footrest', icon: 'age' }
    ],
    specs: {
      category: 'Outdoor Gym Equipment',
      usage: 'Parks, Societies, Public Use',
      material: 'GI Steel (Heavy Duty)',
      coating: 'Powder Coated (Weather Resistant)',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/chest_press.png', '/src/assets/air_walker.png', '/src/assets/col_playground.png', '/src/assets/col_gym.png'],
    overviewBullets: [
      'Strengthens quadriceps, calves, and gluteal muscles',
      'Dual pressing station allows joint training',
      'Extra-wide anti-slip rubber-molded footplates',
      'Thick steel guide shafts for seamless sliding',
      'Weather-resistant high-density plastic seats'
    ],
    muscleGroup: {
      primary: 'Quads, Glutes',
      secondary: 'Calves, Core',
      focusArea: 'lower-body'
    },
    techSpecs: {
      modelName: 'Leg Press Duo',
      productCode: 'PG-OG-LP-05',
      material: 'GI Steel (Heavy Duty)',
      pipeThickness: '3.2 mm structural columns',
      finish: 'Weather-Proof Powder Coated',
      weatherResistance: 'Yes',
      mountingType: 'Surface Mount / Concrete Foundation',
      userCapacity: '2 Persons',
      ageGroup: '12 Years & Above',
      dimension: '1600 x 600 x 1500 mm',
      safePlayArea: '2200 x 2000 mm',
      netWeight: '92 kg (Approx.)',
      maxUserWeight: '130 kg per seat',
      certification: 'ISO 9001:2015 Certified'
    }
  },
  {
    title: 'Rower',
    category: 'outdoor-gym',
    categoryLabel: 'OUTDOOR GYM EQUIPMENT',
    type: 'Cardio Equipment',
    material: 'GI Steel',
    price: 35000,
    suitability: 'Societies',
    image: '/src/assets/air_walker.png',
    desc: 'Cardio Equipment',
    bestSeller: false,
    heavyDuty: true,
    longDesc: 'Delivers full body cardio and back muscle training. Features non-slip grips and smooth pivot points for an authentic rowing feel outdoors.',
    highlights: [
      { label: 'Back Strength', icon: 'workout' },
      { label: 'Cardio Focus', icon: 'cardio' },
      { label: 'Full Body Sync', icon: 'legs' },
      { label: 'Low Friction', icon: 'age' }
    ],
    specs: {
      category: 'Outdoor Gym Equipment',
      usage: 'Parks, Societies, Gyms',
      material: 'GI Steel (Heavy Duty)',
      coating: 'Powder Coated (Weather Resistant)',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/air_walker.png', '/src/assets/chest_press.png', '/src/assets/col_playground.png', '/src/assets/col_gym.png'],
    overviewBullets: [
      'Combines cardiovascular cardio with back muscle training',
      'Provides full-body synchronization benefits',
      'Low friction pivots for smooth pulling stroke',
      'Ergonomic seats with natural water drains',
      'GI steel handles with high grip safety'
    ],
    muscleGroup: {
      primary: 'Upper Back, Biceps',
      secondary: 'Hamstrings, Core',
      focusArea: 'full-body'
    },
    techSpecs: {
      modelName: 'Rower Active',
      productCode: 'PG-OG-RW-06',
      material: 'GI Steel (Heavy Duty)',
      pipeThickness: '2.5 mm GI tubes',
      finish: 'Electrostatic Powder Coated',
      weatherResistance: 'Yes',
      mountingType: 'Surface Ground Mounted',
      userCapacity: '1 Person',
      ageGroup: '12 Years & Above',
      dimension: '1150 x 800 x 1000 mm',
      safePlayArea: '1600 x 1800 mm',
      netWeight: '48 kg (Approx.)',
      maxUserWeight: '110 kg',
      certification: 'ISO 9001:2015 Certified'
    }
  },
  {
    title: 'Double Swing',
    category: 'playground',
    categoryLabel: 'PLAYGROUND EQUIPMENT',
    type: 'Flexibility Equipment',
    material: 'MS Steel',
    price: 28000,
    suitability: 'Schools',
    image: '/src/assets/double_swing.png',
    desc: 'Playground Equipment',
    bestSeller: true,
    heavyDuty: true,
    longDesc: 'A classic double-seat playground swing built with high-tensile chains and thick anti-rust steel tubes, guaranteeing maximum safety for children.',
    highlights: [
      { label: 'Safe Chain Links', icon: 'cardio' },
      { label: 'Heavy Double Seat', icon: 'legs' },
      { label: 'Child Friendly', icon: 'workout' },
      { label: 'High Fun Factor', icon: 'age' }
    ],
    specs: {
      category: 'Playground Equipment',
      usage: 'Parks, Schools, Societies',
      material: 'MS Steel (Heavy Gauge)',
      coating: 'Anti-Rust Powder Coated',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/double_swing.png', '/src/assets/seesaw.png', '/src/assets/multi_play_station.png', '/src/assets/col_playground.png'],
    overviewBullets: [
      'High-tensile steel swing chains with rubber coatings',
      'Comfortable anti-slide bucket seats for kids',
      'Extra reinforced A-frame design',
      'Heavy duty MS steel tubes prevent swinging bend',
      'Rust-proof powder coated finish'
    ],
    muscleGroup: {
      primary: 'Core, Balance',
      secondary: 'Arms, Grip',
      focusArea: 'full-body'
    },
    techSpecs: {
      modelName: 'Double A-Swing',
      productCode: 'PG-PL-DS-07',
      material: 'MS Steel & Rubber Seats',
      pipeThickness: '3.0 mm heavy columns',
      finish: 'UV-Resistant Powder Coating',
      weatherResistance: 'Yes',
      mountingType: 'Deep Ground Anchor / Concrete J-Bolts',
      userCapacity: '2 Children',
      ageGroup: '4 Years to 12 Years',
      dimension: '2200 x 1200 x 2400 mm',
      safePlayArea: '3000 x 4000 mm',
      netWeight: '72 kg (Approx.)',
      maxUserWeight: '80 kg per seat',
      certification: 'ISO 9001:2015 Certified'
    }
  },
  {
    title: 'Multi Play Station',
    category: 'playground',
    categoryLabel: 'PLAYGROUND EQUIPMENT',
    type: 'Multi-Station',
    material: 'GI Steel',
    price: 85000,
    suitability: 'Parks',
    image: '/src/assets/multi_play_station.png',
    desc: 'Playground Equipment',
    bestSeller: true,
    heavyDuty: true,
    longDesc: 'A complete children activity hub with slides, ladders, tunnels, and active play units designed to boost motor skills and coordinate play.',
    highlights: [
      { label: 'Multi Slide Unit', icon: 'workout' },
      { label: 'Active Play Hub', icon: 'cardio' },
      { label: 'LLDPE Plastic Parts', icon: 'legs' },
      { label: 'Max Child Safety', icon: 'age' }
    ],
    specs: {
      category: 'Playground Equipment',
      usage: 'Parks, Communities, Schools',
      material: 'GI Steel & LLDPE Plastic',
      coating: 'UV Resistant Powder Coating',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/multi_play_station.png', '/src/assets/double_swing.png', '/src/assets/seesaw.png', '/src/assets/col_playground.png'],
    overviewBullets: [
      'Includes dual slides, climbing ladders, and tunnels',
      'Food-grade LLDPE rotational molded plastic parts',
      'Non-slip textured steps prevent falling injuries',
      'Vibrant UV-resistant pigment colors',
      'Encourages coordination and active social play'
    ],
    muscleGroup: {
      primary: 'Agility, Balance',
      secondary: 'Full Body Coordination',
      focusArea: 'full-body'
    },
    techSpecs: {
      modelName: 'Multi Station Alpha',
      productCode: 'PG-PL-MS-08',
      material: 'GI Steel Columns & LLDPE Plastic',
      pipeThickness: '3.2 mm GI columns',
      finish: 'UV Guard Powder Coating',
      weatherResistance: 'Yes',
      mountingType: 'Ground Embedded J-Bolts',
      userCapacity: '6-8 Children',
      ageGroup: '3 Years to 12 Years',
      dimension: '3800 x 2800 x 2800 mm',
      safePlayArea: '5000 x 4000 mm',
      netWeight: '185 kg (Approx.)',
      maxUserWeight: '60 kg per child',
      certification: 'ISO 9001:2015 / CE Certified'
    }
  },
  {
    title: 'Seesaw',
    category: 'playground',
    categoryLabel: 'PLAYGROUND EQUIPMENT',
    type: 'Flexibility Equipment',
    material: 'MS Steel',
    price: 18000,
    suitability: 'Schools',
    image: '/src/assets/seesaw.png',
    desc: 'Playground Equipment',
    bestSeller: false,
    heavyDuty: true,
    longDesc: 'Durable dual-seat seesaw with rubber stopper shocks and heavy-duty center pivot bearing for kids children parks.',
    highlights: [
      { label: 'Dual Stopper Shocks', icon: 'legs' },
      { label: 'Comfort Handles', icon: 'workout' },
      { label: 'Heavy Pivot Bearing', icon: 'cardio' },
      { label: 'Anti-Skid Seats', icon: 'age' }
    ],
    specs: {
      category: 'Playground Equipment',
      usage: 'Parks, Schools, Societies',
      material: 'MS Steel Frame',
      coating: 'Powder Coated Anti-Rust',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/seesaw.png', '/src/assets/double_swing.png', '/src/assets/multi_play_station.png', '/src/assets/col_playground.png'],
    overviewBullets: [
      'Features heavy rubber bumper pads under seats to absorb impact',
      'Sturdy center pivot pin with grease nipples',
      'Comfortable powder coated grip handles',
      'Heavy-duty molded plastic seats',
      'Thick MS steel tubing reduces bending risk'
    ],
    muscleGroup: {
      primary: 'Balance, Core',
      secondary: 'Leg Push, Grip',
      focusArea: 'full-body'
    },
    techSpecs: {
      modelName: 'Pivot Seesaw',
      productCode: 'PG-PL-SS-09',
      material: 'MS Steel & LLDPE Seats',
      pipeThickness: '2.5 mm MS tubes',
      finish: 'Weatherproof Powder Coating',
      weatherResistance: 'Yes',
      mountingType: 'Surface Base bolted / Anchored',
      userCapacity: '2 Children',
      ageGroup: '4 Years to 10 Years',
      dimension: '1800 x 400 x 800 mm',
      safePlayArea: '2500 x 1500 mm',
      netWeight: '32 kg (Approx.)',
      maxUserWeight: '50 kg per seat',
      certification: 'ISO 9001:2015 Certified'
    }
  },
  {
    title: 'Solar Light Pole',
    category: 'solar-lighting',
    categoryLabel: 'SOLAR LIGHTING SOLUTIONS',
    type: 'Multi-Station',
    material: 'GI Steel',
    price: 25000,
    suitability: 'Public Use',
    image: '/src/assets/solar_light.png',
    desc: 'Solar Lighting Solutions',
    bestSeller: true,
    heavyDuty: true,
    longDesc: 'Integrated solar street lighting solution with automated dusk-to-dawn sensors, high-capacity lithium battery, and premium hot-dip GI poles.',
    highlights: [
      { label: 'Automatic Sensors', icon: 'workout' },
      { label: 'Lithium Battery', icon: 'cardio' },
      { label: 'Hot Dip GI Pole', icon: 'legs' },
      { label: 'Eco-Friendly Light', icon: 'age' }
    ],
    specs: {
      category: 'Solar Lighting Solutions',
      usage: 'Parks, Pathways, Societies',
      material: 'GI Steel Pole',
      coating: 'Hot-Dip Galvanized Coating',
      installation: 'Free Installation Support Pan India',
      warranty: '2 Years on Battery & LED'
    },
    thumbnails: ['/src/assets/solar_light.png', '/src/assets/yoga_mat_hero.png', '/src/assets/col_gym.png', '/src/assets/sector_parks.png'],
    overviewBullets: [
      'High conversion efficiency solar panels',
      'LiFePO4 battery pack with intelligent BMS system',
      'Automated smart radar motion sensor',
      'Rust-proof hot-dip galvanized steel pole',
      'Maintenance-free waterproof IP65 design'
    ],
    muscleGroup: {
      primary: 'None (Utility)',
      secondary: 'None (Utility)',
      focusArea: 'none'
    },
    techSpecs: {
      modelName: 'Solar Pole Integra',
      productCode: 'PG-SL-SP-10',
      material: 'GI Steel & Aluminium LED casing',
      pipeThickness: '2.5 mm hot dip GI',
      finish: 'Hot-Dip Galvanized / Painted option',
      weatherResistance: 'Yes (IP65)',
      mountingType: 'J-Bolt Concrete Base foundation',
      userCapacity: 'Utility Lighting',
      ageGroup: 'All Public Pathways',
      dimension: '6000 mm Pole Height',
      safePlayArea: '2000 x 2000 mm foundation',
      netWeight: '85 kg (Approx.)',
      maxUserWeight: 'N/A',
      certification: 'CE, RoHS, ISO 9001:2015'
    }
  },
  {
    title: 'Yoga Mat (TPE)',
    category: 'yoga-mats',
    categoryLabel: 'YOGA MATS & ACCESSORIES',
    type: 'Flexibility Equipment',
    material: 'Stainless Steel',
    price: 2500,
    suitability: 'Gyms',
    image: '/src/assets/yoga_mat_hero.png',
    desc: 'Yoga Mats & Accessories',
    bestSeller: true,
    heavyDuty: false,
    longDesc: 'Biodegradable TPE eco yoga mat featuring non-slip laser textures, supreme 6mm dual-layer cushioning, and waterproof properties.',
    highlights: [
      { label: 'Biodegradable TPE', icon: 'legs' },
      { label: '6mm Cushioning', icon: 'workout' },
      { label: 'Double Sided Grip', icon: 'cardio' },
      { label: 'Sweat Resistant', icon: 'age' }
    ],
    specs: {
      category: 'Yoga Mats & Accessories',
      usage: 'Home, Gyms, Yoga Centers',
      material: 'Eco-friendly TPE',
      coating: 'Anti-microbial Textured Layer',
      installation: 'No Installation Required',
      warranty: 'Manufacturing Defects Covered'
    },
    thumbnails: ['/src/assets/yoga_mat_hero.png', '/src/assets/solar_light.png', '/src/assets/col_gym.png', '/src/assets/sector_parks.png'],
    overviewBullets: [
      'Eco-friendly biodegradable TPE composite materials',
      'Dual-layer structure provides comfortable 6mm joint cushion',
      'Double sided non-slip textures ensure ultimate grip',
      'Moisture-resistant closed cell design prevents sweat absorption',
      'Laser aligned guidelines for yoga posturing posture'
    ],
    muscleGroup: {
      primary: 'Balance, Core stability',
      secondary: 'Hamstrings, Spine',
      focusArea: 'full-body'
    },
    techSpecs: {
      modelName: 'TPE Yoga Mat Deluxe',
      productCode: 'PG-YM-TPE-11',
      material: 'Premium TPE (Thermal Plastic Elastomer)',
      pipeThickness: '6 mm thickness',
      finish: 'Laser Engraved Texture',
      weatherResistance: 'Water Resistant / Hand Washable',
      mountingType: 'Rollable / Portable',
      userCapacity: '1 Person',
      ageGroup: 'All Age Groups',
      dimension: '1830 x 610 x 6 mm',
      safePlayArea: '2000 x 1000 mm',
      netWeight: '1.2 kg (Approx.)',
      maxUserWeight: 'N/A',
      certification: 'SGS Certified Non-Toxic'
    }
  },
  {
    title: 'Mark Bench',
    category: 'park-furniture',
    categoryLabel: 'PARK FURNITURE',
    type: 'Flexibility Equipment',
    material: 'MS Steel',
    price: 12000,
    suitability: 'Societies',
    image: '/src/assets/sector_parks.png',
    desc: 'Park Furniture',
    bestSeller: false,
    heavyDuty: true,
    longDesc: 'Ergonomic cast-iron outdoor bench with powder-coated steel slats, ideal for parks, garden pathways, and community seating.',
    highlights: [
      { label: 'Comfort Backrest', icon: 'legs' },
      { label: 'Heavy Cast Iron', icon: 'workout' },
      { label: 'Powder Coat Slats', icon: 'cardio' },
      { label: 'Weather Resistant', icon: 'age' }
    ],
    specs: {
      category: 'Park Furniture',
      usage: 'Parks, Garden Pathways, Societies',
      material: 'Cast Iron & MS Steel',
      coating: 'Weather-Proof Powder Coating',
      installation: 'Free Installation Support Pan India',
      warranty: '1 Year on Manufacturing Defect'
    },
    thumbnails: ['/src/assets/sector_parks.png', '/src/assets/col_gym.png', '/src/assets/col_playground.png', '/src/assets/solar_light.png'],
    overviewBullets: [
      'Ergonomic contour curve backrest design',
      'Heavy cast iron support legs for maximum load stability',
      'Thick MS steel slats are powder coated against corrosion',
      'Anchor holes in feet enable secure anti-theft ground mounting',
      'Modern sleek finish matches any garden landscaping'
    ],
    muscleGroup: {
      primary: 'Comfort seating',
      secondary: 'None (Furniture)',
      focusArea: 'none'
    },
    techSpecs: {
      modelName: 'Mark Garden Bench',
      productCode: 'PG-PF-MB-12',
      material: 'Cast Iron Legs & MS Steel Slats',
      pipeThickness: '8 mm cast iron / 2.0 mm slats',
      finish: 'Weatherproof Powder Coating',
      weatherResistance: 'Yes',
      mountingType: 'Surface Bolted / Ground Anchored',
      userCapacity: '3-4 Persons',
      ageGroup: 'All Age Groups',
      dimension: '1500 x 600 x 850 mm',
      safePlayArea: '2000 x 1000 mm',
      netWeight: '42 kg (Approx.)',
      maxUserWeight: '320 kg total load',
      certification: 'ISO 9001:2015 Certified'
    }
  }
];

async function run() {
  console.log('Seeding process starting...');
  const app = await NestFactory.createApplicationContext(AppModule);

  const productsService = app.get(ProductsService);
  const categoriesService = app.get(CategoriesService);
  const sectorsService = app.get(SectorsService);
  const enquiriesService = app.get(EnquiriesService);
  const videosService = app.get(VideosService);

  // 1. Seed Categories (Non-destructive)
  console.log('Updating categories...');
  const existingCategories = await categoriesService.findAll();
  for (const cat of categoriesSeed) {
    const found = existingCategories.find(c => c.id === cat.id || c.name === cat.name);
    if (!found) {
      await categoriesService.create(cat);
      console.log(`- Seeded new category: ${cat.name}`);
    }
  }

  // 2. Seed Sectors (Non-destructive)
  console.log('Updating sectors...');
  const sectorModel = (sectorsService as any).sectorModel;
  const existingSectors = await sectorsService.findAll();
  if (existingSectors.length === 0) {
    for (const sec of sectorsSeed) {
      await sectorsService.create(sec);
      console.log(`- Seeded sector: ${sec.title}`);
    }
  }

  // 3. Seed Products (Non-destructive: preserve all admin created products!)
  console.log('Updating default products...');
  const existingProducts = await productsService.findAll();
  for (const prod of productsSeed) {
    const found = existingProducts.find(p => p.title === prod.title);
    if (!found) {
      await productsService.create(prod);
      console.log(`- Seeded default product: ${prod.title}`);
    }
  }

  // 4. Seed Enquiries (Non-destructive)
  console.log('Updating default enquiries...');
  const existingEnquiries = await enquiriesService.findAll();
  if (existingEnquiries.length === 0) {
    for (const enq of enquiriesSeed) {
      const model = (enquiriesService as any).enquiryModel;
      const createdEnquiry = new model(enq);
      await createdEnquiry.save();
      console.log(`- Seeded enquiry: ${enq.subject} from ${enq.name}`);
    }
  }

  // 5. Seed Videos (Non-destructive)
  console.log('Updating default videos...');
  const existingVideos = await videosService.findAll();
  for (const vid of videosSeed) {
    const found = existingVideos.find(v => v.id === vid.id || v.url === vid.url);
    if (!found) {
      await videosService.create(vid);
      console.log(`- Seeded default video: ${vid.title}`);
    }
  }

  console.log('Database seeding completed successfully (All user data preserved)!');
  await app.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seeding process failed:', err);
  process.exit(1);
});
