import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string;

  stats: {
    dsa: number;
    aptitude: number;
    mockInterview: number;
  };

  activity: string[];
  solvedProblems: string[];
  solvedQuestions: string[];
  solvedInterviewQuestions: string[];

  streak: number;
  lastActiveDate: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    refreshToken: {
      type: String,
    },

    stats: {
      dsa: {
        type: Number,
        default: 0,
      },
      aptitude:{
        type: Number,
        default: 0,
      },
      mockInterview:{
        type: Number,
        default: 0,
      },
    },

    activity: {
      type: [String],
      default: []
    },
    
    solvedProblems: {
      type: [String],
      default: []
    },
    solvedQuestions: {
      type: [String],
      default: []
    },

    solvedInterviewQuestions: {
      type: [String],
      default: []
    },

    streak: {
      type: Number,
      default: 0
    },
    
    lastActiveDate: {
      type: String,
      default: ""
    }

  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         name:{
//             type: String,
//             required: true
//         },

//         email:{
//             type: String,
//             required: true,
//             unique: true
//         },

//         password:{
//             type: String,
//             required: true
//         },

//         role:{
//             type: String,
//             default: "user"
//         },

//         refreshToken:{
//             type: String
//         }
//     },
//     {timestamps: true}
// );

// export default mongoose.models.User || mongoose.model("User", userSchema);