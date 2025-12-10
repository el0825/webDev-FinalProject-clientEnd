/*==================================================
EditCampusView.js

Displays a form for editing an existing campus.
================================================== */
import PropTypes from "prop-types";

const EditCampusView = (props) => {
  const { campus, formValues, handleChange, handleSubmit } = props;

  // While campus is still loading
  if (!campus || !campus.id) {
    return <div>Loading campus...</div>;
  }

  return (
    <div>
      <h1>Edit Campus</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Campus Name: </label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description: </label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
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

        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

EditCampusView.propTypes = {
  campus: PropTypes.object,
  formValues: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditCampusView;
