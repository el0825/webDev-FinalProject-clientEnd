/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: '20px',
  },
  greeting: {
    marginBottom: '15px',
    color: '#11153e', 
    fontWeight: 'bold',
  },
  subGreeting: {
    marginBottom: '30px',
    color: '#666',
    fontSize: '18px',
  },
  image: {
    width: '70%',        
    maxWidth: '800px',    
    height: 'auto',       
    borderRadius: '10px', 
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', 
    marginBottom: '20px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', 
  },
}));

const HomePageView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {}
      <Typography variant="h3" className={classes.greeting}>
        Welcome to the Campus Management System
      </Typography>

      <Typography variant="body1" className={classes.subGreeting}>
        Manage your campuses and students efficiently with our easy-to-use dashboard.
      </Typography>

      {}
      <img 
        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
        alt="University Campus" 
        className={classes.image} 
      />

      {}
      <div className={classes.buttonContainer}>
        <Link to="/campuses" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large">
            View All Campuses
          </Button>
        </Link>
        
        <Link to="/students" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large">
            View All Students
          </Button>
        </Link>
      </div>
    </div>
  );    
}

export default HomePageView;