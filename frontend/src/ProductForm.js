import { Carousel, Container } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';


const ProductForm = () => {
const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;

  const [isClicked, setIsClicked] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    unit_price: '',
    description: '',
    inventory: '',
    collections: '',
    images: [],
    seller: user && user._id,
    previewImages: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];
    const previewImages = [];
  
    files.forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        imageUrls.push(reader.result);
        previewImages.push(reader.result);
  
        if (imageUrls.length === files.length) {
          const imageBlobs = files.map((file) => new Blob([file]));
          setFormValues((prevValues) => ({
            ...prevValues,
            images: imageBlobs,
            previewImages: previewImages,
          }));
        }
      };
  
      reader.readAsDataURL(file);
    });
  };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      setIsClicked(!isClicked)
      return;
    }
    try {
      // Handle product submission
      const formData = new FormData();
      formData.append('title', formValues.title);
      formData.append('unit_price', formValues.unit_price);
      formData.append('description', formValues.description);
      formData.append('inventory', formValues.inventory);
      formData.append('collections', formValues.collections);
      formData.append('seller', formValues.seller);

      // Append each image file to the form data
      formValues.images.forEach((image, index) => {
        formData.append('images', image, `image_${index + 1}.jpeg`);
      });


      const productResponse = await axios.post('https://sokoni-server.onrender.com/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(`Upload progress: ${progress}%`);
          // You can update a progress state variable here if needed
        },
      });

     

      // Reset form values after successful submission if needed
      setFormValues({
        title: '',
        unit_price: '',
        description: '',
        inventory: '',
        collections: '',
        images: [],
        seller: user && user._id,
        previewImages: [],
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Container>
      <br />
      <br />
      <section>
      <h1 className='text-center'>Please Add a Product</h1>
      <form onSubmit={handleSubmit} className="needs-validation" encType="multipart/form-data" noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please add title of product</div>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="unit_price"
            name="unit_price"
            value={formValues.unit_price}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please add price of product</div>
        </div>
        <div className="mb-3">
          <label htmlFor="total" className="form-label">
            Total
          </label>
          <input
            type="number"
            className="form-control"
            id="inventory"
            name="inventory"
            placeholder='quantity of product'
            value={formValues.inventory}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please add quantity of product</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder='description of product'
            value={formValues.description}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please add a short description of product</div>
        </div>
        <div className="mb-3">
          <label htmlFor="largeDescription" className="form-label">
            Collections
          </label>
          <textarea
            className="form-control"
            id="collections"
            name="collections"
            placeholder='product collection'
            value={formValues.collections}
            onChange={handleChange}
            required
          />
           <div className="invalid-feedback">Please add the collection of product</div>
        </div>
        <div className='mb-3'>
        <label htmlFor='images' className='form-label'>
          Images (minimum 1)
        </label>
        <input
        type='file'
        className='form-control'
        id='images'
        name='images'
        placeholder='product media'
        onChange={handleImageChange}
        multiple
        required
      />
       <div className="invalid-feedback">please upload atleast one product image</div>

  {formValues.previewImages && (
    <div className='image-preview'>
      {formValues.previewImages.map((previewImage, index) => (
        <img
          key={index}
          src={previewImage}
          alt={`Preview ${index + 1}`}
          className='preview-image'
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      ))}
    </div>
  )}
</div>


        <button type="submit" className="btn btn-default" 
        style={{ 
            width: '100%',  
            backgroundColor: isClicked ? 'green' : '#2dace4',
            color: 'white',
            borderRadius: '2rem', }}
            onClick={()=>{setIsClicked(!isClicked)}}
            > 
            
          Submit
        </button>
      </form>
      </section>
      <br/>
    </Container>
  );
};

export default ProductForm;