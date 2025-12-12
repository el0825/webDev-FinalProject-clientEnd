/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DEFAULT_CAMPUS_IMAGE =
  "https://via.placeholder.com/300x180?text=Campus+Image";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  // Handle loading state (campus not yet fetched)
  if (!campus || !campus.id) {
    return <div>Loading campus...</div>;
  }

  const students = campus.students || [];
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      {/* Campus Image */}
      <img
        src={campus.imageUrl || DEFAULT_CAMPUS_IMAGE}
        alt={campus.name}
        style={{ width: "300px", height: "auto" }}
      />
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      {/* Edit Campus */}
      <Link to={`/edit-campus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>

     {/* If no students, show a helpful message */}
      {students.length === 0 ? (
        <p>No students are enrolled at this campus.</p>
      ) : (
        students.map((student) => {
          const name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })
    )}
    </div>
  );
};
CampusView.propTypes = {
  campus: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    students: PropTypes.array,
  }),
};
export default CampusView;