import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import classes from 'pages/NotFound/NotFound.module.scss';
const NotFound: React.FC = () => {
   return (
      <Box className={classes.notFoundContainer}>
         <Typography variant="h1" className={classes.notFoundText}>
            404
         </Typography>
         <Typography variant="h6" style={{ color: 'white' }}>
            The page you’re looking for doesn’t exist.
         </Typography>
         <Link to="/">
            <Button variant="contained">Back Home</Button>
         </Link>
      </Box>
   );
};
export default NotFound;
