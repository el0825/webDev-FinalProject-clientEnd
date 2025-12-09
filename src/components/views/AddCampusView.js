/*==================================================
AddCampusView.js

The Views component is responsible for rendering
the page to add a new campus.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle: {
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const AddCampusView = (props) => {
  const { handleChange, handleSubmit } = props;
  const classes = useStyles();

  return (
    <div>
      <h1>New Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography
              style={{
                fontWeight: 'bold',
                fontFamily: 'Courier, sans-serif',
                fontSize: '20px',
                color: '#11153e'
              }}
            >
              Add a Campus
            </Typography>
          </div>

          <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
            <label style={{ color:'#11153e', fontWeight: 'bold' }}>
              Campus Name:
            </label>
            <input type="text" name="name" onChange={handleChange} />
            <br/><br/>

            <label style={{ color:'#11153e', fontWeight: 'bold' }}>
              Address:
            </label>
            <input type="text" name="address" onChange={handleChange} />
            <br/><br/>

            <label style={{ color:'#11153e', fontWeight: 'bold' }}>
              Description:
            </label>
            <textarea name="description" onChange={handleChange} />
            <br/><br/>

            <label style={{ color:'#11153e', fontWeight: 'bold' }}>
              Image URL:
            </label>
            <input type="text" name="imageUrl" onChange={handleChange} />
            <br/><br/>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>

            <br/><br/>
          </form>
        </div>
      </div>
    </div>
  );
};
AddCampusView.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddCampusView;
