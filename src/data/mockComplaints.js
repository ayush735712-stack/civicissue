export const INITIAL_COMPLAINTS = [
  {
    id: "CF-2026-1001",
    title: "Hazardous Pothole on Main Street",
    description: "Deep pothole near the central pedestrian crossing causing severe vehicle damage and traffic slowdowns during peak hours.",
    category: "Potholes",
    priority: "High",
    status: "In Progress",
    location: "Market St & 5th Ave, Downtown",
    latitude: 37.7833,
    longitude: -122.4067,
    date: "2026-08-10T09:30:00Z",
    department: "Roads & Transport",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: "2026-08-10T09:30:00Z", note: "Complaint registered by citizen via CivicFix mobile web." },
      { status: "Assigned", date: "2026-08-11T11:00:00Z", note: "Assigned to Public Works & Asphalt Maintenance Crew 4." },
      { status: "In Progress", date: "2026-08-12T14:15:00Z", note: "Work order dispatched; resurfacing scheduled." }
    ]
  },
  {
    id: "CF-2026-1002",
    title: "Overflowing Garbage Bins near Community Park",
    description: "Public trash receptacles have not been emptied for three days. Trash is spilling onto the sidewalk causing odor and sanitation concerns.",
    category: "Garbage",
    priority: "Medium",
    status: "Assigned",
    location: "Oak Park entrance, 14th Street",
    latitude: 37.7695,
    longitude: -122.4467,
    date: "2026-08-11T14:20:00Z",
    department: "Sanitation & Waste",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: "2026-08-11T14:20:00Z", note: "Reported with photos by neighborhood council." },
      { status: "Assigned", date: "2026-08-12T08:45:00Z", note: "Assigned to Sanitation Sector 3 Route Team." }
    ]
  },
  {
    id: "CF-2026-1003",
    title: "Broken Streetlight outside High School",
    description: "The main street lamp at the pedestrian intersection has been unlit for a week, making night crossing unsafe for students.",
    category: "Broken Streetlights",
    priority: "Urgent",
    status: "Reported",
    location: "Lincoln High Way & Elm St",
    latitude: 37.7510,
    longitude: -122.4180,
    date: "2026-08-12T18:05:00Z",
    department: "Electrical Works",
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: "2026-08-12T18:05:00Z", note: "High priority flag created due to proximity to school." }
    ]
  },
  {
    id: "CF-2026-1004",
    title: "Burst Water Supply Pipe Under Sidewalk",
    description: "Clean water continuously leaking out onto the road surface. High volume of water waste and erosion under concrete pavement.",
    category: "Water Leakage",
    priority: "Urgent",
    status: "Resolved",
    location: "742 Evergreen Terrace",
    latitude: 37.7600,
    longitude: -122.4350,
    date: "2026-08-08T07:15:00Z",
    department: "Water & Sewerage",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: "2026-08-08T07:15:00Z", note: "Water leakage reported." },
      { status: "Assigned", date: "2026-08-08T08:00:00Z", note: "Emergency team dispatched." },
      { status: "In Progress", date: "2026-08-08T09:30:00Z", note: "Main valve shut off and pipe segment replaced." },
      { status: "Resolved", date: "2026-08-08T16:00:00Z", note: "Pavement restored and water flow resumed safely." }
    ]
  },
  {
    id: "CF-2026-1005",
    title: "Clogged Stormwater Drain & Waterlogging",
    description: "Storm drain choked with leaves and plastic debris causing standing water after recent rains. Pedestrians cannot cross.",
    category: "Drainage",
    priority: "High",
    status: "In Progress",
    location: "Pine St & 8th Ave Junction",
    latitude: 37.7885,
    longitude: -122.4090,
    date: "2026-08-09T12:00:00Z",
    department: "Drainage Maintenance",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: "2026-08-09T12:00:00Z", note: "Waterlogging issue submitted." },
      { status: "Assigned", date: "2026-08-10T10:15:00Z", note: "Drainage desilting truck assigned." },
      { status: "In Progress", date: "2026-08-11T13:00:00Z", note: "Clearing blockage with high-pressure water jet." }
    ]
  },
  {
    id: "CF-2026-1006",
    title: "Damaged Guardrail on River Bridge",
    description: "A 10-foot section of the metal guardrail on the north pedestrian bridge was bent outward following a vehicle bump.",
    category: "Infrastructure",
    priority: "Medium",
    status: "Reported",
    location: "North River Crossing Bridge",
    latitude: 37.7950,
    longitude: -122.3980,
    date: "2026-08-13T08:10:00Z",
    department: "Public Infrastructure",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: "2026-08-13T08:10:00Z", note: "Inspection pending by bridge engineers." }
    ]
  },
  {
    id: "CF-2026-1007",
    title: "Fallen Tree Branch Blocking Alleyway",
    description: "Large oak tree limb collapsed after high wind storm, obstructing emergency access to residential alley.",
    category: "Other",
    priority: "Medium",
    status: "Resolved",
    location: "Post St Alley #4",
    latitude: 37.7870,
    longitude: -122.4150,
    date: "2026-08-05T15:45:00Z",
    department: "Parks & Urban Forestry",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: "2026-08-05T15:45:00Z", note: "Reported by resident." },
      { status: "Assigned", date: "2026-08-05T16:20:00Z", note: "Tree hazard unit alerted." },
      { status: "In Progress", date: "2026-08-06T09:00:00Z", note: "Chainsaw crew clearing path." },
      { status: "Resolved", date: "2026-08-06T11:30:00Z", note: "Limb removed and debris chipped." }
    ]
  }
];

export const CATEGORIES = [
  "All",
  "Potholes",
  "Garbage",
  "Broken Streetlights",
  "Water Leakage",
  "Drainage",
  "Infrastructure",
  "Other"
];

export const STATUSES = [
  "All",
  "Reported",
  "Assigned",
  "In Progress",
  "Resolved"
];

export const PRIORITIES = [
  "All",
  "Low",
  "Medium",
  "High",
  "Urgent"
];

export const DEPARTMENTS = [
  "Unassigned",
  "Roads & Transport",
  "Sanitation & Waste",
  "Electrical Works",
  "Water & Sewerage",
  "Drainage Maintenance",
  "Public Infrastructure",
  "Parks & Urban Forestry"
];
