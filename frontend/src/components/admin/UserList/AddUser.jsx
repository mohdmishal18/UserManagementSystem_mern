import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/user/FormContainer';
import { toast } from 'react-toastify';
import { useAddNewUsersMutation } from '../../../slices/admin/adminApiSlice.js';
import Loader from '../../user/Loader.jsx';

const AddUser = ({isOPen , onClose}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [addNewUser,{isLoading}] = useAddNewUserMutation();

  const defaultAvatar = '../../../placeeHolderProfile.jpg'

  const handleImageChange = (e) =>
  {
    const file = e.target.files[0];
    if (file)
    {
      setImagePreview(URL.createObjectURL(file));
      setProfileImage(file);
    }
  };

  const uploadImage = async (file) =>
  {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'UserManagementSystem');
    formData.append('cloud_name', 'usermanagement')
    formData.append('folder', 'profilePictures');

    try
    {
      const response = await fetch('https://api.cloudinary.com/v1_1/usermanagement/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      return data.secure_url
    }
    catch (error)
    {
      toast.error('Image upload failed');
      return null;
    }
  };


  const submitHandler = async (e) =>
  {
    e.preventDefault();

    if (password !== confirmPassword)
    {
      toast.error('Passwords do not match');
    }
    else
    {
      try
      {

        if (profileImage)
        {
          imageUrl = await uploadImage(profileImage);
          if (!imageUrl)
          {
            return;
          }
        }

        const res = await addNewUser({
          _id : userInfo._id,
          name , 
          email , 
          password,
          imageUrl,
          publicId
        }).unwrap();
        toast.success('Profile Updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="position-relative">
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <FormContainer>
        {/* <h1 className="text-white text-center">Update Profile</h1> */}
        <div className="text-center mb-3">
          <input
            type="file"
            id="profileImageInput"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="profileImageInput">
            <img
              src={imagePreview || defaultAvatar}
              alt="Profile Preview"
              className="rounded-circle"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          </label>
          <div className="text-white mt-2" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('profileImageInput').click()}>
            Change Profile Picture
          </div>
        </div>
        <Form onSubmit={submitHandler} className="bg-dark text-white rounded">
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary text-white"
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary text-white"
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary text-white"
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-secondary text-white"
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
          <Button className='mt-3' variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AddUser;
