// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import { Box, Paper, Grid, Switch, FormControlLabel, Typography, IconButton, Slider, CardMedia, CardContent, Card, Chip, Tab, Tabs, MenuItem, Select, FormControl } from '@mui/material';
// import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
// import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
// import './Dashboard.scss'
// import try1 from '../../assest/try1.jpg'

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

// const FilterContainer = styled('div')`
//    display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const FilterChip = styled(Chip)`
//   margin: 5px;
// `;

// export default function Dashboard() {

//     const [isVisibleFeesFilter, setIsVisibleFeesFilter] = React.useState(false);
//     const [valueFees, setValueFees] = React.useState([0, 100]);
//     const [selectedTabs, setSelectedTabs] = React.useState([]);
//     const [options, setOptions] = React.useState(['Option 1', 'Option 2', 'Option 3']);
//     const [rangeStart, setRangeStart] = React.useState('');
//     const [rangeEnd, setRangeEnd] = React.useState('');

//     const handleChangeStart = (event) => {
//         setRangeStart(event.target.value);
//     };
//     const handleChangeEnd = (event) => {
//         setRangeEnd(event.target.value);
//     };


//     const handleTabChange = (event, newValue) => {
//         const index = selectedTabs.indexOf(newValue);
//         if (index === -1) {
//             setSelectedTabs([...selectedTabs, newValue]);
//             setOptions(options.filter((option) => option !== newValue));
//         }
//     };

//     const handleDelete = (tabToDelete) => {
//         setSelectedTabs(selectedTabs.filter((tab) => tab !== tabToDelete));
//         setOptions([...options, tabToDelete]);
//     };


//     const handleClickFees = () => {
//         setIsVisibleFeesFilter(!isVisibleFeesFilter);
//     };

//     const handleChangeFees = (event, newValue) => {
//         setValueFees(newValue);
//     };

//     function valuetext(valueFees) {
//         return `${valueFees}`;
//     }


//     return (
//         <div id='Dashboard' className='top'>
//             <Box sx={{ flexGrow: 1 }}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={4} >
//                         <Item className='leftSide_Filter'>
//                             <div className='d-flex justify-content-between'>
//                                 <Typography sx={{ lineHeight: 2.5 }}>Hide already seen</Typography>
//                                 <FormControlLabel
//                                     control={<Switch color="primary" />}
//                                 />
//                             </div>
//                             <hr style={{ marginInline: '20px' }} />
//                             <div className='d-flex justify-content-between'>
//                                 <Typography sx={{ lineHeight: 2.5 }}>Verified Hospitals</Typography>
//                                 <FormControlLabel
//                                     control={<Switch color="primary" />}
//                                 />
//                             </div>
//                             <hr style={{ marginInline: '20px' }} />
//                             <div className='d-flex justify-content-between ' onClick={handleClickFees}>
//                                 <Typography sx={{ lineHeight: 2.5 }}>Fees</Typography>
//                                 <IconButton>
//                                     {isVisibleFeesFilter ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownSharpIcon />}
//                                 </IconButton>
//                             </div>
//                             {isVisibleFeesFilter ? <div>
//                                 <Box sx={{ width: "100%", paddingInline: "27px", paddingBlockStart: "43px" }}>
//                                     <Slider
//                                         getAriaLabel={() => 'Range'}
//                                         value={valueFees}
//                                         onChange={handleChangeFees}
//                                         getAriaValueText={valuetext}
//                                         valueLabelDisplay="on"
//                                     />
//                                 </Box>
//                                 <div className='d-flex justify-content-between '>
//                                     <FormControl sx={{ m: 1, minWidth: 120 }}>
//                                         <Select
//                                             value={rangeStart}
//                                             onChange={handleChangeStart}
//                                             displayEmpty
//                                             inputProps={{ 'aria-label': 'start' }}
//                                         >
//                                             <MenuItem value="">
//                                                 <em>start</em>
//                                             </MenuItem>
//                                             <MenuItem value={10}>Ten</MenuItem>
//                                             <MenuItem value={20}>Twenty</MenuItem>
//                                             <MenuItem value={30}>Thirty</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                     <FormControl sx={{ m: 1, minWidth: 120 }}>
//                                         <Select
//                                             value={rangeEnd}
//                                             onChange={handleChangeEnd}
//                                             displayEmpty
//                                             inputProps={{ 'aria-label': 'start' }}
//                                         >
//                                             <MenuItem value="">
//                                                 <em>End</em>
//                                             </MenuItem>
//                                             <MenuItem value={10}>Ten</MenuItem>
//                                             <MenuItem value={20}>Twenty</MenuItem>
//                                             <MenuItem value={30}>Thirty</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </div>
//                             </div> : <div></div>}
//                             <div className='mt-5'>
//                                 <Tabs value={selectedTabs} onChange={handleTabChange} aria-label="Filter Tabs" orientation="vertical" style={{ marginRight: '220px' }}>
//                                     {options.map((option) => (
//                                         <Tab key={option} label={option} value={option} />
//                                     ))}
//                                 </Tabs>
//                                 <FilterContainer>
//                                     {selectedTabs.map((tab) => (
//                                         <FilterChip
//                                             key={tab}
//                                             label={tab}
//                                             onDelete={() => handleDelete(tab)}
//                                         />
//                                     ))}
//                                 </FilterContainer>
//                             </div>
//                         </Item>
//                     </Grid>
//                     <Grid item xs={8} >
//                         <Item className='rightSide_Main border-0 '>
//                             <div className='card-details'>
//                                 <Card sx={{ display: 'flex', borderRadius: '5px' }}>
//                                     <CardMedia
//                                         component="img"
//                                         sx={{ width: '100%', padding: '10px', height: "auto", width: '31rem', borderRadius: '5px' }}
//                                         image={try1}
//                                         alt="Your Image"
//                                     />
//                                     <CardContent>
//                                         <Typography variant="h5" component="div">
//                                             Title
//                                         </Typography>
//                                         <Typography variant="body2">
//                                             Description or details goes here...
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                             <div className='card-details'>
//                                 <Card sx={{ display: 'flex' }}>
//                                     <CardMedia
//                                         component="img"
//                                         sx={{ width: '100%', padding: '10px', height: "auto", width: '31rem' }}
//                                         image={try1}
//                                         alt="Your Image"
//                                     />
//                                     <CardContent>
//                                         <Typography variant="h5" component="div">
//                                             Title
//                                         </Typography>
//                                         <Typography variant="body2">
//                                             Description or details goes here...
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                             <div className='card-details'>
//                                 <Card sx={{ display: 'flex' }}>
//                                     <CardMedia
//                                         component="img"
//                                         sx={{ width: '100%', padding: '10px', height: "auto", width: '31rem' }}
//                                         image={try1}
//                                         alt="Your Image"
//                                     />
//                                     <CardContent>
//                                         <Typography variant="h5" component="div">
//                                             Title
//                                         </Typography>
//                                         <Typography variant="body2">
//                                             Description or details goes here...
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                             <div className='card-details'>
//                                 <Card sx={{ display: 'flex' }}>
//                                     <CardMedia
//                                         component="img"
//                                         sx={{ width: '100%', padding: '10px', height: "auto", width: '31rem' }}
//                                         image={try1}
//                                         alt="Your Image"
//                                     />
//                                     <CardContent>
//                                         <Typography variant="h5" component="div">
//                                             Title
//                                         </Typography>
//                                         <Typography variant="body2">
//                                             Description or details goes here...
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                             <div className='card-details'>
//                                 <Card sx={{ display: 'flex' }}>
//                                     <CardMedia
//                                         component="img"
//                                         sx={{ width: '100%', padding: '10px', height: "auto", width: '31rem' }}
//                                         image={try1}
//                                         alt="Your Image"
//                                     />
//                                     <CardContent>
//                                         <Typography variant="h5" component="div">
//                                             Title
//                                         </Typography>
//                                         <Typography variant="body2">
//                                             Description or details goes here...
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                         </Item>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </div>
//     );
// }
import React from 'react'

const Dashboard = () => {
    return (
        <div>
            hello
        </div>
    )
}

export default Dashboard
