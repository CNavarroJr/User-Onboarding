import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const H1 = styled.h1`
margin: 2% auto;
background: lightblue;
width:25%;
padding:1%;
border-radius: 20px;
border:2px solid slategrey;
font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
text-align:center;
`
const UserInput = styled.div`
padding:1%;
background: lightblue;
width:20%;
margin: 0 auto;
border-radius: 20px;
`
const FormEntry = styled.div`
margin:1% 2%;
border-radius: 10px;
`

const Button = styled.button`
  margin: 1% 2%;
`

const H2 = styled.h2`
width:20%;
text-align:center;
margin:2% auto;
border:2px solid slategray;
border-radius: 5px 5px 5px 5px;
font-size:3rem;
padding:5px;
margin-bottom:0px;
background-color: lightblue;
`

const CardGrid = styled.div`
margin:0 auto;
display:flex;
flex-wrap:wrap;
justify-content:flex-start;

`

const UserCard = styled.div`
margin:10px 20px;
font-family: "Times New Roman",Times,serif;
border: solid 1px black;
padding: 10px;
border-radius: 5px;
`

const UserOnboard = ({ values, status, errors, touched }) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		if (status) {
			setUsers([...users, status]);
		}
	}, [status]);

	return (

		<div className="user-form">
			
      <Form>
        <H1>New User Onboarding</H1>
        <UserInput className='user-input'>
          <FormEntry className='form-entry'>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (<p className="error-msg">{errors.name}</p>)}
          </FormEntry>
          <FormEntry className='form-entry'>
            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && (<p className="error-msg">{errors.email}</p>)}
          </FormEntry>
          <FormEntry className='form-entry'>
            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (<p className="error-msg">{errors.password}</p>)}
          </FormEntry>
          <FormEntry className='form-entry'>
            <label>
              <Field type="checkbox" name="terms" checked={values.terms} />
              {touched.terms && errors.terms && (<p className="error-msg">{errors.terms}</p>)}
              Terms of Service - Sure, I read them ... NOT!
            </label>
          </FormEntry>
          <Button type="submit">Submit</Button>
        </UserInput>

        <H2 className='users-title'>Users</H2>
        <CardGrid className='card-grid'>
          {users.map(user => {
          return (
            <UserCard className='user-card' key={user.name}>
              <h2>Name: {user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
            </UserCard>
          )})}
        </CardGrid>
			</Form>
		</div>
	);
};

const FormikUserOnboard = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Must Enter a Name'),
    email: Yup.string().required('Must Enter an Email'),
    password: Yup.string().required('Must Enter a Password'),
    terms: Yup.boolean().oneOf([true], 'You Must Accept')
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(UserOnboard);

export default FormikUserOnboard;