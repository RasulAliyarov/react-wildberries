import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import "./Categories.scss"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { categoriesReduce } from "../../../redux/Slices/categorySlice"
import _api from '../../../http';
import { toast } from "react-hot-toast"
import UserService from '../../../Services/UserService';
import { isLoadingReduce } from "../../../redux/Slices/adminSlice"
import { Images } from '../../../Config/index';

function Categories() {
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const admin = useSelector(state => state.admin)

    async function getCategories() {
        dispatch(isLoadingReduce(true))
        await _api.get("/categories")
            .then((res) => {
                dispatch(categoriesReduce(
                    res.data.filter(p => p.deleteState === false),
                ))
            })
        dispatch(isLoadingReduce(false))
    }

    useEffect(() => {
        getCategories()
    }, [])

    const addCategoryValidation = Yup.object().shape({
        categoryName: Yup.string().required("Required"),
        categoryİmage: Yup.string()
    })
    const updateCategoryValidation = Yup.object().shape({
        categoryName: Yup.string().required("Required"),
        categoryİmage: Yup.string(),
        category: Yup.string().required("required"),
    })
    const deleteCategoryValidation = Yup.object().shape({
        category: Yup.string().required("required"),
    })


    const formikAddCategory = useFormik({
        initialValues: {
            categoryName: "",
            categoryİmage: ""
        },
        validateOnBlur: "",
        validationSchema: addCategoryValidation,
        onSubmit: (values) => {
            _api.post("/addCategory", ({ ...values }))
                .then((value) => {
                    if (!value) {
                        toast.error(`${values.categoryName} added is failed.`, {
                            style: {
                                border: '1px solid #4C1174',
                                padding: '16px',
                                color: '#4C1174',
                            },
                            iconTheme: {
                                primary: '#4C1174',
                                secondary: '#FFFAEE',
                            },
                        });
                        return
                    }

                    toast.success(`${values.categoryName} is added`)
                    getCategories()
                    formikAddCategory.resetForm()
                })
        }
    })

    const formikUpdateCategory = useFormik({
        initialValues: {
            categoryName: "",
            categoryİmage: "",
            category: ""
        },
        validateOnBlur: "",
        validationSchema: updateCategoryValidation,
        onSubmit: (values) => {
            UserService.updateCategory(values.category, values)
                .then(res => {
                    if (!res) {
                        toast.error(`${values.categoryName} edit is failed.`, {
                            style: {
                                border: '1px solid #4C1174',
                                padding: '16px',
                                color: '#4C1174',
                            },
                            iconTheme: {
                                primary: '#4C1174',
                                secondary: '#FFFAEE',
                            },
                        });
                        return
                    }

                    toast.success(`${values.categoryName} is edit`)
                    formikUpdateCategory.resetForm()
                    getCategories()
                })

        }
    })

    const formikDeleteCategory = useFormik({
        initialValues: {
            category: ""
        },
        validateOnBlur: "",
        validationSchema: deleteCategoryValidation,
        onSubmit: (values) => {
            UserService.deleteCategory(values.category).then(res => {
                if (!res) {
                    toast.error(`${values.category} delete is failed.`, {
                        style: {
                            border: '1px solid #4C1174',
                            padding: '16px',
                            color: '#4C1174',
                        },
                        iconTheme: {
                            primary: '#4C1174',
                            secondary: '#FFFAEE',
                        },
                    });
                    return
                }

                toast.success('Category is deleted')
                formikDeleteCategory.resetForm()
                getCategories()
            })
        }
    })

    return (
        <div className='adminPages'>
            <div className="adminPages__category">
                <div className='adminPages__category__content'>
                    <Accordion allowZeroExpanded className='adminPages__category__content__accordion'>
                        <h2 className='tabTtile'>Actions</h2>

                        {/* Добавить */}
                        <AccordionItem  >
                            <AccordionItemHeading className="catAccordionHead">
                                <AccordionItemButton>
                                    <h3>Add category</h3>
                                </AccordionItemButton>
                            </AccordionItemHeading>

                            <AccordionItemPanel className='adminPages__category__content__accordion__panel'>
                                <form onSubmit={formikAddCategory.handleSubmit}>
                                    <span>
                                        {formikAddCategory.errors.categoryName && formikAddCategory.touched.categoryName ? (<div className="errorMessage">{formikAddCategory.errors.categoryName}</div>) : null}
                                        <input value={formikAddCategory.values.categoryName} type="text" name='categoryName' placeholder='Name' onChange={formikAddCategory.handleChange} onBlur={formikAddCategory.handleBlur} />
                                    </span>
                                    <span>
                                        {formikAddCategory.errors.categoryİmage && formikAddCategory.touched.categoryİmage ? (<div className="errorMessage">{formikAddCategory.errors.categoryİmage}</div>) : null}
                                        <input value={formikAddCategory.values.categoryİmage} type="text" name='categoryİmage' placeholder='Image url' onChange={formikAddCategory.handleChange} onBlur={formikAddCategory.handleBlur} />
                                    </span>
                                    <button type="submit">Add</button>
                                </form>
                            </AccordionItemPanel>
                        </AccordionItem>

                        {/* Редактировать */}
                        <AccordionItem  >
                            <AccordionItemHeading className="catAccordionHead">
                                <AccordionItemButton>
                                    <h3>Edit category</h3>
                                </AccordionItemButton>
                            </AccordionItemHeading>

                            <AccordionItemPanel className='adminPages__category__content__accordion__panel'>
                                <form onSubmit={formikUpdateCategory.handleSubmit}>
                                    <span>
                                        {formikUpdateCategory.errors.category && formikUpdateCategory.touched.category ? (<div className="errorMessage">{formikUpdateCategory.errors.category}</div>) : null}
                                        <input value={formikUpdateCategory.values.category} type="text" list='categories' name='category' placeholder='Search category' onChange={formikUpdateCategory.handleChange} onBlur={formikUpdateCategory.handleBlur} />
                                        <datalist id="categories">
                                            {
                                                category.categoriesState.map(c => {
                                                    return (
                                                        <option key={c?._id} value={c?.categoryName} />
                                                    )
                                                })
                                            }
                                        </datalist>
                                    </span>
                                    <span>
                                        {formikUpdateCategory.errors.categoryName && formikUpdateCategory.touched.categoryName ? (<div className="errorMessage">{formikUpdateCategory.errors.categoryName}</div>) : null}
                                        <input value={formikUpdateCategory.values.categoryName} type="text" name='categoryName' placeholder='Name' onChange={formikUpdateCategory.handleChange} onBlur={formikUpdateCategory.handleBlur} />
                                    </span>
                                    <span>
                                        {formikUpdateCategory.errors.categoryİmage && formikUpdateCategory.touched.categoryİmage ? (<div className="errorMessage">{formikUpdateCategory.errors.categoryİmage}</div>) : null}
                                        <input value={formikUpdateCategory.values.categoryİmage} type="text" name='categoryİmage' placeholder='Image url' onChange={formikUpdateCategory.handleChange} onBlur={formikUpdateCategory.handleBlur} />

                                    </span>
                                    <button type="submit">Update</button>
                                </form>
                            </AccordionItemPanel>
                        </AccordionItem>

                        {/* Удалить */}
                        <AccordionItem  >
                            <AccordionItemHeading className="catAccordionHead">
                                <AccordionItemButton>
                                    <h3>Delete category</h3>
                                </AccordionItemButton>
                            </AccordionItemHeading>

                            <AccordionItemPanel className='adminPages__category__content__accordion__panel'>
                                <form onSubmit={formikDeleteCategory.handleSubmit}>
                                    <span>
                                        {formikDeleteCategory.errors.category && formikDeleteCategory.touched.category ? (<div className="errorMessage">{formikDeleteCategory.errors.category}</div>) : null}
                                        <input value={formikDeleteCategory.values.category} type="text" list='categories' name='category' placeholder='Search category' onChange={formikDeleteCategory.handleChange} onBlur={formikDeleteCategory.handleBlur} />
                                        <datalist id="categories">
                                            <option value="Cloth" />
                                            <option value="Man" />
                                            <option value="Woman" />
                                            <option value="Home" />
                                        </datalist>
                                    </span>

                                    <button type="submit">Delete</button>
                                </form>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                    <span>
                        <h2 className='tabTtile catList'>Category list</h2>
                        <ul className='adminPages__category__content__list'>
                            {
                                admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :
                                    category.categoriesState?.map(c => {
                                        return (
                                            <li key={c?._id}>{c?.categoryName}</li>
                                        )
                                    })
                            }
                        </ul>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Categories