// import React from 'react';

const problems = [
  { id: 1, title: "Problem 1", difficulty: "Easy", status: "Solved" },
  { id: 2, title: "Problem 2", difficulty: "Medium", status: "Unsolved" },
  { id: 3, title: "Problem 3", difficulty: "Hard", status: "Solved" },
  { id: 4, title: "Problem 4", difficulty: "Easy", status: "Solved" },
  { id: 5, title: "Problem 5", difficulty: "Medium", status: "Unsolved" },
  { id: 6, title: "Problem 6", difficulty: "Hard", status: "Solved" },
  // Add more problems as needed
];

const ProblemList = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full bg-white text-left">
          <thead>
            <tr className="text-lg">
              <th className="w-[60%] py-2 px-4 bg-gray-300">Title</th>
              <th className="w-[30%] py-2 px-4 bg-gray-300">Difficulty</th>
              <th className="w-[10%] py-2 px-4 bg-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={index}>
                <td className="w-[60%] py-2 px-4 border-b border-gray-200">
                  {problem.title}
                </td>
                <td className="w-[30%] py-2 px-4 border-b border-gray-200">
                  {problem.difficulty}
                </td>
                <td className="w-[10%] py-2 px-4 border-b border-gray-200">
                  {problem.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemList;
