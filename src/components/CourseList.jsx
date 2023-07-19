import CourseCard from "./CourseCard";

const courses = [
  {
    id: 1,
    title: "English Lecture",
    description: "language lessons with the most popular teachers",
    imagUrl: "/img1.jpg",
    rate: "4.5",
    tags: ["langauges"],
    start: "2023-07-01T20:46:30.615Z",
    status: "Completed",
  },
  {
    id: 2,
    title: "Design Strategy",
    description:
      "lesson on planning design concept and proper planning of work",
    imagUrl: "/img2.jpg",
    rate: "4",
    tags: ["UI/UX design", "web design"],
    start: "2023-07-01T20:46:30.615Z",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Business Lecture",
    description:
      "lectures on how to build your buisness safely without fare of new projects",
    imagUrl: "/img3.jpg",
    rate: "3.9",
    tags: ["Marketing", "Finance"],
    start: "2023-07-01T20:46:30.615Z",
    status: "Active",
  },
];

function CourseList() {
  return (
    <div className="course-list">
      {courses.map((course) => {
        return <CourseCard key={course.id} />;
      })}
    </div>
  );
}

export default CourseList;
