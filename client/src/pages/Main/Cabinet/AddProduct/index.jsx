import React, { useEffect, useRef } from 'react'
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import "../../../Admin/ProductDetail/ProductDetail.scss"
import { Editor } from '@tinymce/tinymce-react';
import { toast } from "react-hot-toast"
import { imageUrlReduce, sellerProductsReduce } from "../../../../redux/Slices/wildSlice"
import { categoriesReduce } from "../../../../redux/Slices/categorySlice"
import { useNavigate } from "react-router-dom"
import _api, { API_URL } from '../../../../http';
import { Helmet } from "react-helmet";
import DatalistInput from 'react-datalist-input';

function AddProduct() {
  const admin = useSelector(state => state.admin)
  const category = useSelector(state => state.category)
  const dispatch = useDispatch()
  const editorRef = useRef(null);
  const navigate = useNavigate()

  async function getCategories() {
    await _api.get("/categories")
      .then((res) => {
        dispatch(categoriesReduce(
          res.data.filter(p => p?.deleteState === false),
        ))
      })
  }
  useEffect(() => {
    if (localStorage.getItem("token") && window.onload) {
      if (admin.userState.roles?.[0] !== "SELLER") {
        navigate("*")
      }
    }
    getCategories()
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
      _api.post(`${API_URL}/addProduct`, { ...values },).then(() => {
        toast.success('Successfully added!')
        dispatch(imageUrlReduce())

        _api.get(`${API_URL}/products`).then(r => {
          dispatch(sellerProductsReduce(r.data.filter(p => p.user === admin.userState.id && p.deleteState === false)))
        })

        formikAddProduct.resetForm()
        navigate(`/cabinet/${admin?.userState?.username}`)
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
            <input value={formikAddProduct.values.name} placeholder="Name" id='name' name="name" type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>
          <span className="productDetailField">
            {formikAddProduct.errors.brand && formikAddProduct.touched.brand ? (<div className="errorMessage">{formikAddProduct.errors.brand}</div>) : null}
            <input value={formikAddProduct.values.brand} placeholder="Brand" id="brand" name="brand" type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>
          <span className="productDetailField">
            {formikAddProduct.errors.count && formikAddProduct.touched.count ? (<div className="errorMessage">{formikAddProduct.errors.count}</div>) : null}
            <input value={formikAddProduct.values.count} placeholder="Count" id="count" name="count" type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>
          <span className="productDetailField">
            {formikAddProduct.errors.price && formikAddProduct.touched.price ? (<div className="errorMessage">{formikAddProduct.errors.price}</div>) : null}
            <input value={formikAddProduct.values.price} placeholder="Price" id="price" name="price" type="number" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>

          <span className="productDetailField">
            {formikAddProduct.errors.color && formikAddProduct.touched.color ? (<div className="errorMessage">{formikAddProduct.errors.color}</div>) : null}
            <input value={formikAddProduct.values.color} placeholder="Color" id="color" name="color" type="text" onChange={formikAddProduct.handleChange} onBlur={formikAddProduct.handleBlur} />
          </span>
          <span className="productDetailField">
            {formikAddProduct.errors.category && formikAddProduct.touched.category ? (<div className="errorMessage">{formikAddProduct.errors.category}</div>) : null}
            <DatalistInput
              inputProps={{
                name: 'category',
                onChange: formikAddProduct.handleChange,
                onBlur: formikAddProduct.handleBlur
              }}
              className="dataListPlugin"
              placeholder='Category'
              onSelect={async (item) => {
                await formikAddProduct.setFieldTouched('category');
                await formikAddProduct.setFieldValue('category', item.value);
              }}
              items={
                category.categoriesState?.map(c => {
                  return (
                    { id: `${c?._id}`, value: `${c?.categoryName}` }
                  )
                })
              }
            />
          </span>
        </span>

        <span className="productDetailField productDetailField--modified">
          {formikAddProduct.errors.image && formikAddProduct.touched.image ? (<div className="errorMessage">{formikAddProduct.errors.image}</div>) : null}
          <input multiple placeholder="Image" id="image" name="image" type="file" onChange={event => {
            let reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                formikAddProduct.setFieldValue("image", reader.result)
              }
            }
            reader.readAsDataURL(event.target.files[0])
          }} onBlur={formikAddProduct.handleBlur} />
          <div className='productDetailField__img'>
            <img src={formikAddProduct.values.image} alt="" />
          </div>
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${admin?.userState?.username ? '' + admin?.userState?.username : ''} - Add products`}</title>
      </Helmet>
    </div>
  )
}

export default AddProduct