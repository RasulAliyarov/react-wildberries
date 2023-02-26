import React, { useEffect, useRef } from 'react'
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import "./EditProduct.scss"
import { oneProductReduce, isLoadingReduce } from "../../../../redux/Slices/adminSlice"
import { categoriesReduce } from "../../../../redux/Slices/categorySlice"
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast"
import { Images } from "../../../../Config"
import UserService from '../../../../Services/UserService';
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet";
import _api from '../../../../http';

function EditProduct() {
    const admin = useSelector(state => state.admin)
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    const editorRef = useRef(null);
    const navigate = useNavigate()

    const { id } = useParams()
    async function getCategories() {
        await _api.get("/categories")
            .then((res) => {
                dispatch(categoriesReduce(
                    res.data.filter(p => p?.deleteState === false),
                ))
            })
    }
    async function getDataById() {
        dispatch(isLoadingReduce(true))
        await axios.get(`http://localhost:8080/api/products/${id}`).then(res => {
            dispatch(oneProductReduce(res.data))
        })
        dispatch(isLoadingReduce(false))
    }
    useEffect(() => {
        getDataById()
        getCategories()
    }, [])

    const ProductDetailValidation = Yup.object().shape({
        name: Yup.string().required("Required"),
        brand: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        image: Yup.string().required("Required"),
        category: Yup.string().required("Required"),
        count: Yup.string().required("Required"),
        color: Yup.string().required("Required"),
        desc: Yup.string().required("Required"),
    })
    const formikProductDetail = useFormik({
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
        validationSchema: ProductDetailValidation,
        onSubmit: (values) => {
            UserService.updateProduct(id, { ...values }).then(() => {
                toast.success('Successfully edited!')
                navigate(`/cabinet/${admin.userState?.id}`)
            }).catch(() => {
                toast.error('Failed edited!')
            })
            console.log(values)
        }
    })

    return (
        <div className='editProduct'>
            {
                admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :
                    <div className='productDetail editProduct'>
                        <span className='productDetail__left'>
                            <div>
                                <img src={admin.oneProductState?.image} alt="" />
                            </div>
                        </span>
                        <form onSubmit={formikProductDetail.handleSubmit} className='productDetail__right' >
                            <span className="productDetailField">
                                {formikProductDetail.errors.name && formikProductDetail.touched.name ? (<div className="errorMessage">{formikProductDetail.errors.name}</div>) : null}
                                <label htmlFor="name">Name</label>
                                <input defaultValue={admin.oneProductState.name} id='name' name="name" type="text" onChange={formikProductDetail.handleChange} onBlur={formikProductDetail.handleBlur} />
                            </span>
                            <span className="productDetailField">
                                {formikProductDetail.errors.brand && formikProductDetail.touched.brand ? (<div className="errorMessage">{formikProductDetail.errors.brand}</div>) : null}
                                <label htmlFor="brand">Brand</label>
                                <input defaultValue={admin.oneProductState.brand} id="brand" name="brand" type="text" onChange={formikProductDetail.handleChange} onBlur={formikProductDetail.handleBlur} />
                            </span>
                            <span className="productDetailField">
                                {formikProductDetail.errors.price && formikProductDetail.touched.price ? (<div className="errorMessage">{formikProductDetail.errors.price}</div>) : null}
                                <label htmlFor="price">Price</label>
                                <input defaultValue={admin.oneProductState.price} id="price" name="price" type="string" onChange={formikProductDetail.handleChange} onBlur={formikProductDetail.handleBlur} />
                            </span>
                            <span className="productDetailField">
                                {formikProductDetail.errors.category && formikProductDetail.touched.category ? (<div className="errorMessage">{formikProductDetail.errors.category}</div>) : null}
                                <label htmlFor="category">Category</label>
                                <input defaultValue={admin.oneProductState.category} id="category" name="category" list='categories' type="text" placeholder="Category" onChange={formikProductDetail.handleChange} onBlur={formikProductDetail.handleBlur} />
                                <datalist id="categories">
                                    {
                                        category.categoriesState?.map(c => {
                                            return (
                                                <option key={c?._id} value={c?.categoryName} />
                                            )
                                        })
                                    }
                                </datalist>
                            </span>
                            <span className="productDetailField">
                                {formikProductDetail.errors.count && formikProductDetail.touched.count ? (<div className="errorMessage">{formikProductDetail.errors.count}</div>) : null}
                                <label htmlFor="count">Count</label>
                                <input defaultValue={admin.oneProductState.count} id="count" name="count" type="text" onChange={formikProductDetail.handleChange} onBlur={formikProductDetail.handleBlur} />
                            </span>
                            <span className="productDetailField">
                                {formikProductDetail.errors.color && formikProductDetail.touched.color ? (<div className="errorMessage">{formikProductDetail.errors.color}</div>) : null}
                                <label htmlFor="color">Color</label>
                                <input defaultValue={admin.oneProductState.color} id="color" name="color" type="text" onChange={formikProductDetail.handleChange} onBlur={formikProductDetail.handleBlur} />
                            </span>
                            <span className="productDetailField productDetailField--modified">
                                {formikProductDetail.errors.image && formikProductDetail.touched.image ? (<div className="errorMessage">{formikProductDetail.errors.image}</div>) : null}
                                <input id="image" multiple name="image" type="file" onChange={event => {
                                    let reader = new FileReader();
                                    reader.onload = () => {
                                        if (reader.readyState === 2) {
                                            formikProductDetail.setFieldValue("image", reader.result)
                                        }
                                    }
                                    reader.readAsDataURL(event.target.files[0])
                                }} onBlur={formikProductDetail.handleBlur} />
                                <div className='productDetailField__img'>
                                    <img src={formikProductDetail.values.image} alt="" />
                                </div>
                            </span>
                            <span className="productDetailField productDetailField--desc">
                                {formikProductDetail.errors.desc && formikProductDetail.touched.desc ? (<div className="errorMessage">{formikProductDetail.errors.desc}</div>) : null}
                                <label htmlFor="desc">Description</label>
                                <Editor
                                    name="desc"
                                    id='desc'
                                    onEditorChange={(e) => {
                                        formikProductDetail.handleChange({ target: { name: 'desc', value: e } })
                                    }}
                                    onBlur={formikProductDetail.handleBlur}
                                    apiKey='7zeaozk8x4rsjk6496uw2ochhmh7gebusfyvic5e0svr7js3'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={`${admin.oneProductState.desc}`}
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
                            <button className="submitBtn" type="submit"><span className='btnName'>Edit</span></button>
                        </form>
                    </div>
            }
            <Helmet>
                <meta charSet="utf-8" />
                <title> {`Edit: ${admin.oneProductState?.name ? ': ' + admin.oneProductState?.name : ''}`}</title>
            </Helmet>
        </div>
    )
}

export default EditProduct