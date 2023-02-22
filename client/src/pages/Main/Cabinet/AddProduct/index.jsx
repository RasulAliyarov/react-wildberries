import React, { useEffect, useRef } from 'react'
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import "../../../Admin/ProductDetail/ProductDetail.scss"
import { Editor } from '@tinymce/tinymce-react';
import { toast } from "react-hot-toast"
import { imageUrlReduce } from "../../../../redux/Slices/wildSlice"
import { useNavigate } from "react-router-dom"
import _api, { API_URL } from '../../../../http';

function AddProduct() {
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()
  const editorRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token") && window.onload) {
      if (admin.userState.roles?.[0] !== "SELLER") {
        navigate("*")
      }
    }
  }, [])

  const AddProductValidation = Yup.object().shape({
    name: Yup.string().required("Required"),
    brand: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    image: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    count: Yup.string().required("Required"),
    color: Yup.string().required("Required"),
    desc: Yup.string().required("Required"),
  })
  const formikAddProduct = useFormik({
    initialValues: {
      name: "",
      brand: "",
      price: "",
      image: "",
      category: "",
      count: "",
      color: "",
      desc: "",
    },
    validateOnBlur: "",
    validationSchema: AddProductValidation,
    onSubmit: (values) => {
      _api.post(`${API_URL}/addProduct`, { ...values }, ).then(() => {
        toast.success('Successfully added!')
        dispatch(imageUrlReduce())
        formikAddProduct.resetForm()
        navigate("/admin/panel/products")
      }).catch(() => {
        toast.error('Failed added!')
      })
    }
  })

  return (
    <div className='productDetail '>
      <form onSubmit={formikAddProduct.handleSubmit} className='productDetail__right' >
        <span className='formFieldWrapper'>
          <span className="productDetailField">
            {formikAddProduct.errors.name && formikAddProduct.touched.name ? (<div className="errorMessage">{formikAddProduct.errors.name}</div>) : null}
            <input defaultValue={admin.oneProductState.name} placeholder="Name" id='name' name="name" type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>
          <span className="productDetailField">
            {formikAddProduct.errors.brand && formikAddProduct.touched.brand ? (<div className="errorMessage">{formikAddProduct.errors.brand}</div>) : null}
            <input defaultValue={admin.oneProductState.brand} placeholder="Brand" id="brand" name="brand" type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>
          <span className="productDetailField">
            {formikAddProduct.errors.count && formikAddProduct.touched.count ? (<div className="errorMessage">{formikAddProduct.errors.count}</div>) : null}
            <input defaultValue={admin.oneProductState.count} placeholder="Count" id="count" name="count" type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>
          <span className="productDetailField">
            {formikAddProduct.errors.price && formikAddProduct.touched.price ? (<div className="errorMessage">{formikAddProduct.errors.price}</div>) : null}
            <input defaultValue={admin.oneProductState.price} placeholder="Price" id="price" name="price" type="number" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>

          <span className="productDetailField">
            {formikAddProduct.errors.color && formikAddProduct.touched.color ? (<div className="errorMessage">{formikAddProduct.errors.color}</div>) : null}
            <input defaultValue={admin.oneProductState.color} placeholder="Color" id="color" name="color" type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>
          <span className="productDetailField">
            {formikAddProduct.errors.category && formikAddProduct.touched.category ? (<div className="errorMessage">{formikAddProduct.errors.category}</div>) : null}
            <input defaultValue={admin.oneProductState.category} placeholder="Category" id="category" name="category" list='categories' type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
            <datalist id="categories">
              <option value="Cloth" />
              <option value="Man" />
              <option value="Woman" />
              <option value="Home" />
            </datalist>
          </span>
        </span>

        <span className="productDetailField">
          {formikAddProduct.errors.image && formikAddProduct.touched.image ? (<div className="errorMessage">{formikAddProduct.errors.image}</div>) : null}
          <input defaultValue={admin.oneProductState.image} placeholder="Image" id="image" name="image" type="file" onChange={event=>{
            let reader  = new FileReader();
            reader.onload = ()=>{
              if(reader.readyState === 2){
                formikAddProduct.setFieldValue("image", reader.result)
                // serPreview(reader.result)
              }
            }
            reader.readAsDataURL(event.target.files[0])
          }} onBlur={formikAddProduct.handleBlur} />
        </span>

        <span className="productDetailField productDetailField--desc">
          {formikAddProduct.errors.desc && formikAddProduct.touched.desc ? (<div className="errorMessage">{formikAddProduct.errors.desc}</div>) : null}
          <Editor
            name="desc"
            id='desc'
            onEditorChange={(e) => {
              formikAddProduct.handleChange({ target: { name: 'desc', value: e } })
            }}
            onBlur={formikAddProduct.handleBlur}
            apiKey='7zeaozk8x4rsjk6496uw2ochhmh7gebusfyvic5e0svr7js3'
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue='<p>Description</p>'
            init={{
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

            }}
          />
        </span>
        <button className="submitBtn" type="submit"><span className='btnName'>Add</span></button>
      </form>
    </div>
  )
}

export default AddProduct