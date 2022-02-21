import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Alert from '@mui/material/Alert';

// ----------------------------------------------------------------------

export default function AddClientForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [onsubmit,setOnsubmit]= useState(false);
  const [anerroraccu, setOnerroraccu]=useState(false);
  const typeType = ["Particulier","Professionnel","Particulier"]

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    adresse: Yup.string().required('Adresse is required'),
    country:Yup.string().required('Country is required'),
    city:Yup.string().required('City is required'),
    zip_code:Yup.string().required('ZIP/Postal Code is required'),
    phone:Yup.string().required('Phone Code is required'),
    
    
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      adresse: '',
      country:'',
      city:'',
      zip_code:'',
      phone:'',
      site:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log("on entre ici")
     // console.log(values)
     // console.log(type)
      const data = {
        type:  typeType[type],
        name: `${values.firstName} ${values.lastName}`,
        adresse: values.adresse,
        code_postal: values.zip_code,
        city_country: {city:values.city, country:values.country},
        phone:values.phone,
        internet_site:values.site,
        email: values.email,
        portable:'',
        note:'',
        type2:'',
      }
      console.log(data)
      axios.post('http://localhost:3000/api/client', data)
      .then((res)=>{ console.log(res); navigate('/erp_ecm'); })
      .catch((error)=>{console.log(error); setOnsubmit(false); setOnerroraccu(true)});
      
    }
  });
  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const { errors, touched,values, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div style={{width:500, margin: "40px auto"}}>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="adresse"
            label="Adresse"
            {...getFieldProps('adresse')}
            error={Boolean(touched.adresse && errors.adresse)}
            helperText={touched.adresse && errors.adresse}
          />
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Country"
              {...getFieldProps('country')}
              error={Boolean(touched.country && errors.country)}
              helperText={touched.country && errors.country}
            />

            <TextField
              fullWidth
              label="City"
              {...getFieldProps('city')}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />
            <TextField
              fullWidth
              label="ZIP/Postal Code"
              {...getFieldProps('zip_code')}
              error={Boolean(touched.zip_code && errors.zip_code)}
              helperText={touched.zip_code && errors.zip_code}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Phone"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <TextField
              fullWidth
              label="Site"
              {...getFieldProps('site')}
              error={Boolean(touched.site && errors.site)}
              helperText={touched.site && errors.site}
            />
          </Stack>
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={type}
          error={type===""}
          label="Type *"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Particulier</MenuItem>
          <MenuItem value={1}>Professionnel</MenuItem>
          <MenuItem value={2}>Particulier</MenuItem>
        </Select>
       
      </FormControl>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={onsubmit}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
    </div>
  );
}
