/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const DEFAULT_CAMPUS_IMAGE = "https://www.freeiconspng.com/uploads/school-icon-png-20.png";
const DEFAULT_STUDENT_AVATAR = "https://www.freeiconspng.com/uploads/profile-icon-9.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  campusCard: {
    maxWidth: 900,
    margin: 'auto',
    marginBottom: theme.spacing(4),
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  media: {
    height: 350, // Nice large header image
    objectFit: 'cover',
  },
  content: {
    padding: theme.spacing(4),
  },
  title: {
    fontWeight: 'bold',
    color: '#11153e',
    marginBottom: theme.spacing(2),
  },
  info: {
    marginBottom: theme.spacing(2),
    fontSize: '1.1rem',
  },
  buttonsContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    gap: '15px',
  },
  studentsSection: {
    maxWidth: 900,
    margin: 'auto',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#11153e',
    marginBottom: theme.spacing(2),
    borderBottom: '2px solid #11153e',
    paddingBottom: '10px',
  },
  studentLink: {
    textDecoration: 'none',
    color: '#3f51b5',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const CampusView = (props) => {
  const { campus } = props;
  const classes = useStyles();

  // Handle loading state
  if (!campus || !campus.id) {
    return (
      <div className={classes.root}>
        <Typography variant="h4">Loading campus...</Typography>
      </div>
    );
  }

  const students = campus.students || [];

  return (
    <div className={classes.root}>
      
      {/*  Main Campus Info Card */}
      <Card className={classes.campusCard}>
        <CardMedia
          className={classes.media}
          image={campus.imageUrl || DEFAULT_CAMPUS_IMAGE}
          title={campus.name}
        />
        <CardContent className={classes.content}>
          <Typography variant="h3" className={classes.title}>
            {campus.name}
          </Typography>
          
          <Typography variant="subtitle1" color="textSecondary" className={classes.info}>
            <strong>Address:</strong> {campus.address}
          </Typography>
          
          <Typography variant="body1" className={classes.info} paragraph>
            {campus.description}
          </Typography>

          {/* Action Buttons */}
          <div className={classes.buttonsContainer}>
            <Link to={`/edit-campus/${campus.id}`} style={{textDecoration:'none'}}>
              <Button variant="contained" color="primary">Edit Campus</Button>
            </Link>
            
            {/* links to new student form */}
            <Link to={`/newstudent?campusId=${campus.id}`} style={{textDecoration:'none'}}>
              <Button variant="outlined" color="primary">Enroll New Student</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/*  Enrolled Students Section */}
      <div className={classes.studentsSection}>
        
        {/* Bold Header Enrolled Students */}
        <Typography variant="h5" className={classes.sectionTitle}>
          Enrolled Students
        </Typography>

        {students.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No students are currently enrolled at this campus.
          </Typography>
        ) : (
          /* Using a clean List component for students */
          <Card style={{padding: '10px'}}>
            <List>
              {students.map((student, idx) => (
                <div key={student.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={student.firstname} src={student.imageUrl || DEFAULT_STUDENT_AVATAR} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link to={`/student/${student.id}`} className={classes.studentLink}>
                          {student.firstname} {student.lastname}
                        </Link>
                      }
                      secondary={
                         <Typography component="span" variant="body2" color="textPrimary">
                           GPA: {student.gpa ? student.gpa : "N/A"}
                         </Typography>
                      }
                    />
                  </ListItem>
                  {/* Add a divider between students, but not after the last one */}
                  {idx < students.length - 1 && <Divider variant="inset" component="li" />}
                </div>
              ))}
            </List>
          </Card>
        )}
      </div>
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