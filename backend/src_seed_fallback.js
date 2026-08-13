export const INITIAL_COMPLAINTS = [
  {
    complaintId: "CF-2026-1001",
    title: "Hazardous Pothole on Main Street",
    description: "Deep pothole near the central pedestrian crossing causing severe vehicle damage and traffic slowdowns.",
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
      { status: "Reported", date: "2026-08-10T09:30:00Z", note: "Complaint registered by citizen." },
      { status: "Assigned", date: "2026-08-11T11:00:00Z", note: "Assigned to Public Works." },
      { status: "In Progress", date: "2026-08-12T14:15:00Z", note: "Resurfacing scheduled." }
    ]
  }
];
