/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
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

const DEFAULT_CAMPUS_IMAGE = "https://www.freeiconspng.com/uploads/school-icon-png-20.png";

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
    textAlign: 'left',
  },
  address: {
    color: 'gray',
    marginBottom: '10px',
    fontSize: '0.9rem',
  },
  description: {
    fontSize: '0.9rem',
  },
  addButtonContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  deleteButton: {
    color: '#f50057', 
  }
}));

const AllCampusesView = (props) => {
  const classes = useStyles();
  const { allCampuses, deleteCampus } = props;

  // --- EMPTY STATE (No Campuses) ---
  if (!allCampuses.length) {
    return (
      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          All Campuses
        </Typography>
        <div className={classes.addButtonContainer}>
          <Typography variant="h6" style={{marginBottom:'20px'}}>
            There are no campuses registered in the system.
          </Typography>
          <Link to={`/add-campus`} style={{textDecoration: 'none'}}>
            <Button variant="contained" color="primary" size="large">
              Add New Campus
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // --- LIST STATE (Campuses Exist) ---
  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        All Campuses
      </Typography>

      {/* Button to Add New Campus at the top */}
      <div className={classes.addButtonContainer}>
        <Link to={`/add-campus`} style={{textDecoration: 'none'}}>
          <Button variant="contained" color="primary" size="large">
            Add New Campus
          </Button>
        </Link>
      </div>

      {/* Grid Container for Cards */}
      <Grid container spacing={4}>
        {allCampuses.map((campus) => (
          <Grid item key={campus.id} xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              
              {/* Clickable Area (Image + Info) */}
              <CardActionArea component={Link} to={`/campus/${campus.id}`}>
                <CardMedia
                  className={classes.media}
                  image={campus.imageUrl || DEFAULT_CAMPUS_IMAGE}
                  title={campus.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" style={{color: '#11153e', fontWeight:'bold'}}>
                    {campus.name}
                  </Typography>
                  <Typography variant="body2" component="p" className={classes.address}>
                    {campus.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                     {/* Truncate long descriptions if needed */}
                     {campus.description && campus.description.length > 100 
                       ? campus.description.substring(0, 100) + "..." 
                       : campus.description}
                  </Typography>
                </CardContent>
              </CardActionArea>

              {/* Actions Area (Delete Button) */}
              <CardActions style={{justifyContent: 'center'}}>
                <Button 
                  size="small" 
                  className={classes.deleteButton} 
                  onClick={() => deleteCampus(campus.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;