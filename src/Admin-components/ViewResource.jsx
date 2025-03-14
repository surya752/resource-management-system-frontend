import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import { FcExternal } from "react-icons/fc";
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import { FaEye } from "react-icons/fa";
import { FcEmptyTrash } from "react-icons/fc";
import AdminResourceService from '../Admin-service/AdminResourceService';
const ViewResource = () => {
    const [resources, setResources] = useState([])
    const [selection, setSelection] = useState('Search Text')
    const [text, setText] = useState('')

    useEffect(() => {
        getAllResources();
    }, []);

    const getAllResources = () => {
        AdminResourceService.getAllResources().then((response) => {
            setResources(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const searchResources = () => {
        if (selection == 'Type') {
            AdminResourceService.searchResourceByType(text).then((response) => {
                setResources(response.data)
                if (response.data.length === 0) {
                    alert("No Resoures with Type : " + text)
                }
                else {
                    console.log(response.data);
                }
            }).catch(error => {
                alert('Enter Search Resource Type')
                console.log(error);
            })
        }
        else if (selection == 'Name') {
            AdminResourceService.searchResourceByName(text).then((response) => {
                setResources(response.data)
                if (response.data.length === 0) {
                    alert("No Resource with Title : " + text)
                }
                else {
                    console.log(response.data);
                }
            }).catch(error => {
                alert('Enter Search Title')
                console.log(error);
            })
        }
        else {
            alert('Select Search Type')
        }
    }

    const deleteResource = (id) => {
        AdminResourceService.deleteResource(id).then((response) => {
            alert("Resource Deleted")
            getAllResources()
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div><NavBar />
            <div className='container-fluid row p-5 ' style={{ backgroundColor: 'azure' }}>
                <center>
                    <FormControl>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" className='pe-5'>
                            <FormControlLabel value="type" control={<Radio />} label="Resource Type" onClick={(e) => setSelection('Type')} />
                            <FormControlLabel value="name" control={<Radio />} label="Resource Name" onClick={(e) => setSelection('Name')} />
                        </RadioGroup>
                    </FormControl>
                    <TextField id="search" label={selection} variant="outlined" value={text} onChange={(e) => setText(e.target.value)} className='pe-5'></TextField>
                    <IconButton color="primary" aria-label="add to shopping cart" className='pe-5' onClick={() => searchResources()}>
                        <SearchIcon fontSize='large' />
                    </IconButton>
                    <Button variant='outlined' color='info' onClick={() => getAllResources()}>Display All</Button>
                </center>
            </div>
            <div className='row' style={{ backgroundColor: 'azure' }}>
                {resources.map(resource =>
                    <Card sx={{ minWidth: 275, backgroundColor: 'azure' }} className='col-4 m-5 jcard'>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {resource.resourceName}
                            </Typography>
                            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                                ResourceQuantity : {resource.resourceQuantity}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Type : {resource.type}
                            </Typography>
                            {/* <Typography variant="body2">
                                Availability : {resource.availability}
                            </Typography> */}
                            <Typography variant="body2">
                                Availability : {resource.availability ? 'True' : 'False'}
                            </Typography>

                        </CardContent>
                        <CardActions className='row'>
                            <div className='col-4'>
                                <Link className="btn btn-outline-info ms-2 mt-3" to={`viewAllocations/${resource.resourceName}`} ><FaEye />Allocations</Link>
                                <Link className="btn btn-outline-success ms-2 mt-3" to={`/updateResource/${resource.id}`} ><FcExternal />Resource</Link>
                            </div>
                            <div className='col-2'>
                                <Button size="medium" variant='outlined' color='error' onClick={() => deleteResource(resource.id)} className=' mt-2'><FcEmptyTrash />Delete</Button>
                            </div>
                        </CardActions>
                    </Card>
                )}
            </div>
        </div>
    )
}
export default ViewResource