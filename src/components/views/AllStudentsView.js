/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const DEFAULT_STUDENT_IMAGE = "https://www.freeiconspng.com/uploads/profile-icon-9.png"; 

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    color: '#11153e',
    fontWeight: 'bold',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: "transform 0.15s ease-in-out",
    '&:hover': { transform: "scale3d(1.02, 1.02, 1)" },
  },
  media: {
    height: 200,
    objectFit: 'cover',
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'center',
  },
  addButtonContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  deleteButton: {
    color: '#f50057',
  }
}));

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  const classes = useStyles();

  // --- EMPTY STATE ---
  if (!students.length) {
    return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        All Students
      </Typography>
      <div className={classes.addButtonContainer}>
        <Typography variant="h6" style={{marginBottom:'20px'}}>
          There are no students registered in the system.
        </Typography>
        <Link to={`newstudent`} style={{textDecoration: 'none'}}>
          <Button variant="contained" color="primary" size="large">
            Add New Student
          </Button>
        </Link>
      </div>
    </div>
    );
  }
  
  // --- LIST STATE ---
  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        All Students
      </Typography>

      {/* Add Button */}
      <div className={classes.addButtonContainer}>
        <Link to={`/newstudent`} style={{textDecoration: 'none'}}>
          <Button variant="contained" color="primary" size="large">
            Add New Student
          </Button>
        </Link>
      </div>

      {/* Grid of Student Cards */}
      <Grid container spacing={4}>
        {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <Grid item key={student.id} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardActionArea component={Link} to={`/student/${student.id}`}>
                  {/* Image: Uses student.imageUrl or falls back to default icon */}
                  <CardMedia
                    className={classes.media}
                    image={student.imageUrl || DEFAULT_STUDENT_IMAGE}
                    title={name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" style={{color: '#11153e', fontWeight:'bold'}}>
                      {name}
                    </Typography>
                    {/* show email */}
                    <Typography variant="body2" color="textSecondary" component="p">
                       {student.email}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions style={{justifyContent: 'center'}}>
                  <Button 
                    size="small" 
                    className={classes.deleteButton} 
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

AllStudentsView.propTypes = {
  students: PropTypes.array.isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default AllStudentsView;