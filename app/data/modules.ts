import { BarChart3, BookOpen, Brain, Mic, Settings, Target, User } from "lucide-react";


type Module = {
    id : number;
    title: string;
    description: string;
    route: string;
    icon: any;
}



export const modules: Module[] = [
    {
        id : 1,
        title: "DSA Preparation",
        description: "Topic-wise coding practice",
        route: "/dashboard/dsa",
        icon: BookOpen
    },
    {
        id : 2,
        title: "Aptitude",
        description: "Quantiative + Logical Reasoning",
        route: "/dashboard/aptitude",
        icon: Brain
    },
    {
        id : 3,
        title: "Interview-prep",
        description: "Technical + HR Questions",
        route: "/dashboard/interview",
        icon: Mic
    },
    {
        id : 4,
        title: "Analytics",
        description: "Graphs and progress tracking",
        route: "/dashboard/analytics",
        icon: BarChart3
    },

    {
        id: 5,
        title: "Daily Goals",
        description: "Track your daily targets",
        route: "/dashboard/goals",
        icon: Target
    },

    {
        id: 6,
        title: "Profile",
        description: "View your profile and progress",
        route: "/dashboard/profile",
        icon: User
    },

    {
        id: 7,
        title: "Settings",
        description: "Customize your preferences",
        route: "/dashboard/settings",
        icon: Settings
    }
    
]