/*==================================================
EditStudentView.js

Displays a form for editing an existing student.
================================================== */
import PropTypes from "prop-types";

const EditStudentView = (props) => {
  const {student, formValues, handleChange, handleSubmit } = props;

  if (!student || !student.id) {
    return <div>Loading student...</div>;
  }

  return (
    <div>
      <h1>Edit Student</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstname"
            value={formValues.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>


        <div>
          <label>Image URL: </label>
          <input
            type="text"
            name="imageUrl"
            value={formValues.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>GPA: </label>
          <input
            type="integer"
            name="gpa"
            value={formValues.gpa}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

EditStudentView.propTypes = {
  student: PropTypes.object,
  formValues: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    imageUrl: PropTypes.string,
    gpa: PropTypes.number,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditStudentView;
