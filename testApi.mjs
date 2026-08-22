const testApis = async () => {
    try {
        console.log("Fetching topics...");
        const res1 = await fetch("http://localhost:3000/api/dsa/topics");
        const data1 = await res1.json();
        console.log("Topics:", data1.topics ? data1.topics.map(t => `${t.name}: ${t.problems} problems`).join(", ") : data1);

        console.log("Fetching problems for Arrays...");
        const res2 = await fetch("http://localhost:3000/api/dsa/problems?topic=arrays");
        const data2 = await res2.json();
        console.log(`Found ${data2.problems ? data2.problems.length : "ERROR"} problems for Arrays.`);
        if (data2.problems && data2.problems.length > 0) {
            console.log("Sample problem:", data2.problems[0]);
        }
    } catch (err) {
        console.error("Test failed:", err);
    }
};
testApis();
