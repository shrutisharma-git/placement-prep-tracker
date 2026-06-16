import { BarChart3, BookOpen, Brain, Mic } from "lucide-react";


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
    
]