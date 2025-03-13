import * as React from 'react';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InputFileUpload from './MUI-FileUploadButton';
import MultilineTextFields from './MUI-MultilineText';
import Button from '@mui/material/Button';
import axios from 'axios';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ColorTabs() {
  const [value, setValue] = React.useState(0);
  // const [array, setArray] = useState([]);

  // const fetchAPI = async () => {
  //   const response = await axios.get("http://127.0.0.1:8000/api/form");
  //   console.log(response.data.data);
  //   setArray(response.data.data);
  // }

  // useEffect(() => {
  //   fetchAPI();
  // }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          sx={{ width: "20vw" }}
        >
          <Tab label="File Upload" {...a11yProps(0)} />
          <Tab label="Paste PGN" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InputFileUpload></InputFileUpload>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MultilineTextFields />
      </CustomTabPanel>
    </Box>
  );
}