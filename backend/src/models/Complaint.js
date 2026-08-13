import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['Reported', 'Assigned', 'In Progress', 'Resolved']
    },
    date: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      default: ''
    }
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: [true, 'Complaint ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Issue title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'Pothole',
          'Potholes',
          'Garbage',
          'Streetlight',
          'Broken Streetlights',
          'Water Leakage',
          'Drainage',
          'Public Infrastructure',
          'Infrastructure',
          'Other'
        ],
        message: '{VALUE} is not a valid civic issue category'
      }
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High', 'Critical', 'Urgent'],
        message: '{VALUE} is not a valid priority level'
      },
      default: 'Medium'
    },
    status: {
      type: String,
      enum: {
        values: ['Reported', 'Assigned', 'In Progress', 'Resolved'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Reported'
    },
    location: {
      type: String,
      required: [true, 'Location address is required'],
      trim: true
    },
    latitude: {
      type: Number,
      required: [true, 'Latitude is required']
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required']
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80'
    },
    department: {
      type: String,
      default: 'Unassigned'
    },
    timeline: [timelineSchema]
  },
  {
    timestamps: true
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
