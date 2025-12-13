/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip'; // For GPA badge

const DEFAULT_STUDENT_IMAGE = "https://www.freeiconspng.com/uploads/profile-icon-9.png";
const DEFAULT_CAMPUS_IMAGE = "https://www.freeiconspng.com/uploads/school-icon-png-20.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  cardContainer: {
    maxWidth: 800,
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(4),
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: '50%', // Circle image
    objectFit: 'cover',
    border: '4px solid #11153e',
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
    color: '#11153e',
    marginBottom: theme.spacing(1),
  },
  infoSection: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  gpaChip: {
    backgroundColor: '#11153e',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: theme.spacing(1),
  },
  campusSection: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(2),
    borderTop: '1px solid #e0e0e0',
  },
  campusCard: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    textDecoration: 'none',
    border: '1px solid #e0e0e0',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#f0f0f5',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  campusImage: {
    width: 80,
    height: 80,
    borderRadius: '8px',
    marginRight: theme.spacing(2),
    objectFit: 'cover',
  },
}));

const StudentView = (props) => {
  const { student } = props;
  const classes = useStyles();

  // Handle loading / empty state
  if (!student || !student.id) {
    return (
      <div className={classes.root}>
        <Typography variant="h4">Loading student...</Typography>
      </div>
    );
  }
  
  const fullName = `${student.firstname} ${student.lastname}`;

  return (
    <div className={classes.root}>
      <Card className={classes.cardContainer}>
        
        {/* Student Profile Image */}
        <img
          src={student.imageUrl || DEFAULT_STUDENT_IMAGE}
          alt={fullName}
          className={classes.profileImage}
        />

        {/* Student Name */}
        <Typography variant="h3" className={classes.title}>
          {fullName}
        </Typography>
        
        {/* Student Details */}
        <div className={classes.infoSection}>
          <Typography variant="h6" color="textSecondary">
            {student.email}
          </Typography>
          
          <div style={{marginTop: '10px'}}>
             <Chip label={`GPA: ${student.gpa}`} className={classes.gpaChip} />
          </div>
        </div>

        {/* Edit Button */}
        <Link to={`/edit-student/${student.id}`} style={{textDecoration: 'none'}}>
          <Button variant="contained" color="primary" size="large">
            Edit Student Profile
          </Button>
        </Link>

        {/* Campus Info Section */}
        <div className={classes.campusSection}>
          <Typography variant="h5" style={{fontWeight: 'bold', color: '#11153e'}}>
            Enrolled Campus
          </Typography>

          {student.campus ? (
            <Link to={`/campus/${student.campus.id}`} style={{textDecoration: 'none'}}>
              <Card className={classes.campusCard} variant="outlined">
                <img 
                  src={student.campus.imageUrl || DEFAULT_CAMPUS_IMAGE}
                  alt={student.campus.name}
                  className={classes.campusImage} 
                />
                <div style={{textAlign: 'left'}}>
                  <Typography variant="h6" color="primary" style={{fontWeight: 'bold'}}>
                    {student.campus.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {student.campus.address}
                  </Typography>
                </div>
              </Card>
            </Link>
          ) : (
            <Typography variant="body1" color="textSecondary" style={{marginTop: '15px'}}>
              This student is not currently enrolled at any campus.
            </Typography>
          )}
        </div>
      </Card>
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
  }),
};

export default StudentView;