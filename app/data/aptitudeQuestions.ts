type Question = {
    id: number;
    question: string;
    answer: string;
};

export const aptitudeQuestions: Record<string, Question[]> = {
    quantitative: [
        {
            id: 1,
            question: "What is 20% of 250?",
            answer: "50"
        },

        {
            id: 2,
            question: "Average of 10,20,30?",
            answer: "20"
        }
    ],

    logical: [
        {
            id: 1,
            question: "Find the odd one out: 2,4,8,16,18",
            answer: "18"
        }
    ],

    verbal: [
        {
            id: 1,
            question: "Choose the synonym of Happy",
            answer: "Joyful"
        }
    ]
};