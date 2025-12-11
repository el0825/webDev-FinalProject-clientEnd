/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DEFAULT_STUDENT_IMAGE =
  "https://via.placeholder.com/150x150?text=Student";

const StudentView = (props) => {
  const { student } = props;

  // Handle loading / empty state
  if (!student || !student.id) {
    return <div>Loading student...</div>;
  }
const fullName = `${student.firstname} ${student.lastname}`;

  // Render a single Student view 
  return (
    <div>
      <h1>{fullName}</h1>

      {/* Student image */}
      <img
        src={student.imageUrl || DEFAULT_STUDENT_IMAGE}
        alt={fullName}
      />

      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>GPA:</strong> {student.gpa}</p>

      <h2>Campus</h2>
      {student.campus ? (
        <p>
          Enrolled at:{" "}
          <Link to={`/campus/${student.campus.id}`}>
            {student.campus.name}
          </Link>
        </p>
      ) : (
        <p>This student is not enrolled at any campus.</p>
      )}
      {/* Edit Student Button */}
      <Link to={`/student/${student.id}/edit`}>
        <button>Edit Student</button>
      </Link>
    </div>
  );
};

StudentView.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    imageUrl: PropTypes.string,
    gpa: PropTypes.number,
    campus: PropTypes.object,
    name: PropTypes.string,
  }),
};

export default StudentView;