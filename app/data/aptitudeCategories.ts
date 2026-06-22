type Category = {
    id: number;
    name: string;
    questions: number;
    color: string;
  };
  
  export const aptitudeCategories: Category[] = [
    {
      id: 1,
      name: "Quantitative",
      questions: 20,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Logical",
      questions: 15,
      color: "bg-green-500"
    },
    {
      id: 3,
      name: "Verbal",
      questions: 10,
      color: "bg-purple-500"
    }
  ];