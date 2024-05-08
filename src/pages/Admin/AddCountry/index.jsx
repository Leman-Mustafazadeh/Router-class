import React from 'react'
import { useFormik } from "formik";
import { Button, TextField } from '@mui/material';
import { post } from '../../../API';
import { endpoints } from '../../../API/base';
import CountrySchema from '../../../validations/CountrySchema';
import { useOutletContext } from 'react-router';
const AddCountry = () => {
const [country,setCountry,users,setAdminId,setlocalStorageId,localStorageId] = useOutletContext()
  const formik = useFormik({
    initialValues: {
      name: "",
      population: "",
      description: "",
      capital: "",
      flagImg: "",

    },

    onSubmit:async (values) => {
      try {
        console.log("Form submitted:", values);
        await post(endpoints.countries, values);
        setCountry((current) => [...current, values]);
        formik.resetForm(); 
      } catch (error) {
        console.error("Error submitting form:", error);
      } 
    
    },
   
    validationSchema:CountrySchema
  })
  return (
    <form action="" onSubmit={formik.handleSubmit} style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:'100px'}}>
      <TextField id="outlined-basic" label="Name" variant="outlined" name='name'  value={formik.values.name}  onChange={formik.handleChange}/>
      <span style={{ color: "red" }}>{formik.errors.name}</span>
      <TextField id="outlined-basic" label="Description" variant="outlined" name='description' value={formik.values.description} onChange={formik.handleChange}/>
      <span style={{ color: "red" }}>{formik.errors.description}</span>
      <TextField id="outlined-basic" label="flagImg" variant="outlined"  name='flagImg'  value={formik.values.flagImg} onChange={formik.handleChange}/>
      <span style={{ color: "red" }}>{formik.errors.flagImg}</span>
      <TextField id="outlined-basic" label="capital" variant="outlined"  name='capital' value={formik.values.capital} onChange={formik.handleChange} />
      <span style={{ color: "red" }}>{formik.errors.capital}</span>
      <TextField id="outlined-basic" label="Population" variant="outlined"  name='population' value={formik.values.population} onChange={formik.handleChange} />
      <span style={{ color: "red" }}>{formik.errors.population}</span>
      <Button variant="contained" type="submit" color="error" style={{marginTop:"10px"}}>
Add Country
</Button>
    </form>


  )
}
export default AddCountry
