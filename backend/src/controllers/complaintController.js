import mongoose from 'mongoose';
import Complaint from '../models/Complaint.js';
import { generateUniqueComplaintId } from '../utils/generateComplaintId.js';

// In-Memory dataset used when MONGODB_URI is offline/not configured
let inMemoryStore = [
  {
    complaintId: "CF-2026-1001",
    title: "Hazardous Pothole on Main Street",
    description: "Deep pothole near the central pedestrian crossing causing severe vehicle damage and traffic slowdowns during peak hours.",
    category: "Potholes",
    priority: "High",
    status: "In Progress",
    location: "Market St & 5th Ave, Downtown",
    latitude: 37.7833,
    longitude: -122.4067,
    createdAt: new Date("2026-08-10T09:30:00Z").toISOString(),
    department: "Roads & Transport",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: new Date("2026-08-10T09:30:00Z"), note: "Complaint registered by citizen." },
      { status: "Assigned", date: new Date("2026-08-11T11:00:00Z"), note: "Assigned to Public Works." },
      { status: "In Progress", date: new Date("2026-08-12T14:15:00Z"), note: "Resurfacing scheduled." }
    ]
  },
  {
    complaintId: "CF-2026-1002",
    title: "Overflowing Garbage Bins near Community Park",
    description: "Public trash receptacles have not been emptied for three days. Trash is spilling onto the sidewalk.",
    category: "Garbage",
    priority: "Medium",
    status: "Assigned",
    location: "Oak Park entrance, 14th Street",
    latitude: 37.7695,
    longitude: -122.4467,
    createdAt: new Date("2026-08-11T14:20:00Z").toISOString(),
    department: "Sanitation & Waste",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: new Date("2026-08-11T14:20:00Z"), note: "Reported with photos." },
      { status: "Assigned", date: new Date("2026-08-12T08:45:00Z"), note: "Assigned to Sanitation Team." }
    ]
  },
  {
    complaintId: "CF-2026-1003",
    title: "Broken Streetlight outside High School",
    description: "Main street lamp unlit for a week, making night crossing unsafe for students.",
    category: "Streetlight",
    priority: "Critical",
    status: "Reported",
    location: "Lincoln High Way & Elm St",
    latitude: 37.7510,
    longitude: -122.4180,
    createdAt: new Date("2026-08-12T18:05:00Z").toISOString(),
    department: "Electrical Works",
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: new Date("2026-08-12T18:05:00Z"), note: "High priority flag created." }
    ]
  },
  {
    complaintId: "CF-2026-1004",
    title: "Burst Water Supply Pipe Under Sidewalk",
    description: "Clean water continuously leaking out onto the road surface.",
    category: "Water Leakage",
    priority: "Critical",
    status: "Resolved",
    location: "742 Evergreen Terrace",
    latitude: 37.7600,
    longitude: -122.4350,
    createdAt: new Date("2026-08-08T07:15:00Z").toISOString(),
    department: "Water & Sewerage",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80",
    timeline: [
      { status: "Reported", date: new Date("2026-08-08T07:15:00Z"), note: "Water leakage reported." },
      { status: "Assigned", date: new Date("2026-08-08T08:00:00Z"), note: "Emergency team dispatched." },
      { status: "In Progress", date: "2026-08-08T09:30:00Z", note: "Main valve shut off." },
      { status: "Resolved", date: "2026-08-08T16:00:00Z", note: "Pavement restored." }
    ]
  }
];

const isMongoActive = () => mongoose.connection.readyState === 1;

/**
 * @desc    Create a new civic complaint
 * @route   POST /api/complaints
 */
export const createComplaint = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      location,
      latitude,
      longitude,
      image,
      department
    } = req.body;

    let complaintId = '';
    const now = new Date();

    if (isMongoActive()) {
      complaintId = await generateUniqueComplaintId();
      const newComplaint = new Complaint({
        complaintId,
        title,
        description,
        category: category || 'Other',
        priority: priority || 'Medium',
        status: 'Reported',
        location,
        latitude: Number(latitude),
        longitude: Number(longitude),
        image: image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
        department: department || 'Unassigned',
        timeline: [{ status: 'Reported', date: now, note: 'Complaint registered by citizen.' }]
      });

      const saved = await newComplaint.save();
      return res.status(201).json({
        success: true,
        message: 'Complaint created successfully',
        data: saved
      });
    }

    // In-memory fallback mode
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    complaintId = `CF-${year}-${randomNum}`;

    const newObj = {
      complaintId,
      title,
      description,
      category: category || 'Other',
      priority: priority || 'Medium',
      status: 'Reported',
      location,
      latitude: Number(latitude),
      longitude: Number(longitude),
      createdAt: now.toISOString(),
      image: image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
      department: department || 'Unassigned',
      timeline: [{ status: 'Reported', date: now, note: 'Complaint registered by citizen.' }]
    };

    inMemoryStore.unshift(newObj);
    return res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      data: newObj
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all complaints with optional query filtering
 * @route   GET /api/complaints
 */
export const getComplaints = async (req, res, next) => {
  try {
    const { status, category, priority, department, q } = req.query;

    if (isMongoActive()) {
      const filter = {};
      if (status && status !== 'All') filter.status = new RegExp(`^${status}$`, 'i');
      if (category && category !== 'All') {
        const catRegex = category.replace(/s$/i, '');
        filter.category = new RegExp(catRegex, 'i');
      }
      if (priority && priority !== 'All') filter.priority = new RegExp(`^${priority}$`, 'i');
      if (department && department !== 'All') filter.department = new RegExp(`^${department}$`, 'i');
      if (q) {
        const searchRegex = new RegExp(q, 'i');
        filter.$or = [
          { title: searchRegex },
          { description: searchRegex },
          { complaintId: searchRegex },
          { location: searchRegex }
        ];
      }

      const dbComplaints = await Complaint.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: dbComplaints.length,
        data: dbComplaints
      });
    }

    // In-memory fallback filtering
    let results = [...inMemoryStore];

    if (status && status !== 'All') {
      results = results.filter((c) => c.status.toLowerCase() === status.toLowerCase());
    }
    if (category && category !== 'All') {
      const catKeyword = category.toLowerCase().replace(/s$/, '');
      results = results.filter((c) => c.category.toLowerCase().includes(catKeyword));
    }
    if (priority && priority !== 'All') {
      results = results.filter((c) => c.priority.toLowerCase() === priority.toLowerCase());
    }
    if (department && department !== 'All') {
      results = results.filter((c) => (c.department || '').toLowerCase() === department.toLowerCase());
    }
    if (q) {
      const term = q.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.complaintId.toLowerCase().includes(term) ||
          c.location.toLowerCase().includes(term)
      );
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single complaint by complaintId
 * @route   GET /api/complaints/:complaintId
 */
export const getComplaintById = async (req, res, next) => {
  try {
    const { complaintId } = req.params;

    if (isMongoActive()) {
      const complaint = await Complaint.findOne({
        complaintId: new RegExp(`^${complaintId.trim()}$`, 'i')
      });
      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: `Complaint not found with ID ${complaintId}`
        });
      }
      return res.status(200).json({
        success: true,
        data: complaint
      });
    }

    // In-memory lookup
    const complaint = inMemoryStore.find(
      (c) => c.complaintId.toLowerCase() === complaintId.trim().toLowerCase()
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: `Complaint not found with ID ${complaintId}`
      });
    }

    return res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update status
 * @route   PATCH /api/complaints/:complaintId/status
 */
export const updateStatus = async (req, res, next) => {
  try {
    const { complaintId } = req.params;
    const { status, note } = req.body;
    const now = new Date();

    if (isMongoActive()) {
      const complaint = await Complaint.findOne({
        complaintId: new RegExp(`^${complaintId.trim()}$`, 'i')
      });

      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: `Complaint not found with ID ${complaintId}`
        });
      }

      complaint.status = status;
      complaint.timeline.push({
        status,
        date: now,
        note: note || `Status updated to ${status}.`
      });

      await complaint.save();
      return res.status(200).json({
        success: true,
        message: 'Status updated successfully',
        data: complaint
      });
    }

    // In-memory update
    const complaintIndex = inMemoryStore.findIndex(
      (c) => c.complaintId.toLowerCase() === complaintId.trim().toLowerCase()
    );

    if (complaintIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Complaint not found with ID ${complaintId}`
      });
    }

    const item = inMemoryStore[complaintIndex];
    item.status = status;
    item.timeline = [
      ...(item.timeline || []),
      { status, date: now, note: note || `Status updated to ${status}.` }
    ];

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Assign department
 * @route   PATCH /api/complaints/:complaintId/department
 */
export const assignDepartment = async (req, res, next) => {
  try {
    const { complaintId } = req.params;
    const { department, note } = req.body;
    const now = new Date();

    if (isMongoActive()) {
      const complaint = await Complaint.findOne({
        complaintId: new RegExp(`^${complaintId.trim()}$`, 'i')
      });

      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: `Complaint not found with ID ${complaintId}`
        });
      }

      complaint.department = department;
      if (complaint.status === 'Reported') {
        complaint.status = 'Assigned';
      }

      complaint.timeline.push({
        status: complaint.status,
        date: now,
        note: note || `Assigned to ${department} department.`
      });

      await complaint.save();
      return res.status(200).json({
        success: true,
        message: 'Department assigned successfully',
        data: complaint
      });
    }

    // In-memory update
    const complaintIndex = inMemoryStore.findIndex(
      (c) => c.complaintId.toLowerCase() === complaintId.trim().toLowerCase()
    );

    if (complaintIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Complaint not found with ID ${complaintId}`
      });
    }

    const item = inMemoryStore[complaintIndex];
    item.department = department;
    if (item.status === 'Reported') {
      item.status = 'Assigned';
    }

    item.timeline = [
      ...(item.timeline || []),
      { status: item.status, date: now, note: note || `Assigned to ${department} department.` }
    ];

    return res.status(200).json({
      success: true,
      message: 'Department assigned successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete complaint by complaintId
 * @route   DELETE /api/complaints/:complaintId
 */
export const deleteComplaint = async (req, res, next) => {
  try {
    const { complaintId } = req.params;

    if (isMongoActive()) {
      const complaint = await Complaint.findOneAndDelete({
        complaintId: new RegExp(`^${complaintId.trim()}$`, 'i')
      });

      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: `Complaint not found with ID ${complaintId}`
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Complaint deleted successfully'
      });
    }

    // In-memory delete
    const initialLen = inMemoryStore.length;
    inMemoryStore = inMemoryStore.filter(
      (c) => c.complaintId.toLowerCase() !== complaintId.trim().toLowerCase()
    );

    if (inMemoryStore.length === initialLen) {
      return res.status(404).json({
        success: false,
        message: `Complaint not found with ID ${complaintId}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload local image file
 * @route   POST /api/complaints/upload
 */
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file uploaded'
    });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    imageUrl: fileUrl,
    filename: req.file.filename
  });
};
