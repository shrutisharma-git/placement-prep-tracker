type Problem = {
    id : number;
    name : string;
    difficulty : string;
    platform: string;
    url: string;

}

export const dsaProblems: Record<string,Problem[]> = {
    arrays : [
        {
            id : 1,
            name : "Two Sum",
            difficulty : "Easy",
            platform : "LeetCode",
            url: "https://leetcode.com/problems/two-sum/"
        },

        {
            id : 2,
            name : "Remove Element",
            difficulty : "Easy",
            platform : "Leetcode",
            url : "https://leetcode.com/problems/remove-element"
        },

        {
            id : 3,
            name : "Maximum Subarray",
            difficulty : "Medium",
            platform : "Leetcode",
            url : "https://leetcode.com/problems/maximum-subarray"
        },
    ],

    strings : [],
    trees : [],
    graphs : []
}