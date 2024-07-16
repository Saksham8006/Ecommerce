import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { FaHome } from 'react-icons/fa'
import inventory_sidebar from '../../assets/inventory_sidebar.svg';




const ViewProduct: React.FC = () => {

    const [data, setData] = useState<any>([])

    return (
        <DefaultLayout>
            <Breadcrumb
                pageName={<h1 className="ml-[42px]">View Product</h1>}
                icon={
                    <img
                        src={inventory_sidebar}
                        alt="Settings icon"
                        className="max-w-[50%] ml-2 mb-2"
                    />
                }
                homeIcon={
                    <span className="">
                        <FaHome />
                    </span>
                }
            />
            <section className="bg-white  relative px-[32px] overflow-hidden">


                <Toaster />
                <div className="flex flex-row my-[20px] gap-[20px] justify-start">
                    <div className='max-w-[200px] border px-[40px] py-[35px] text-black '>Image</div>

                    <table className="border border-slate-200 text-left mb-0 w-full">
                        <thead className="text-sm text-black border border-slate-200 bg-slate-50">
                            <tr>
                                <th colSpan={2} className="px-3 py-[15px] w-full">
                                    <span className='text-[18px] md:text-[22px] lg:text-[24px] w-full font-[500]'>
                                        henley Tees testing</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" className=" min-w-[10px] px-[6px] text-[14px] font-[500] text-black">Short Discription </th>
                                <td className="text-black  px-[10px] min-w-[100px] text-[15px] border border-slate-200">This is testing purpose product</td>
                            </tr>
                            <tr>
                                <th scope="row" className=" max-w-[10px]  xsm:min-w-11  px-[6px] text-[14px] font-[500] text-black">Discription</th>
                                <td className="text-black px-[10px] font-semibold min-w-[100px] text-[14px] border border-slate-200 h-[40px]">0.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className=" grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-3">
                    <div>
                        <table className="border border-slate-200  w-full text-left mb-0">
                            <tbody>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Print Name</th>
                                    <td className="text-black  px-[6px] min-w-[100px] text-[14px] border border-slate-200">0.0</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Multiple Batch</th>
                                    <td className="text-black  px-[6px] min-w-[100px] text-[14px] border border-slate-200">0.0</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px]  bg-slate-50 text-[14px] font-medium text-black">Department</th>
                                    <td className="text-black  px-[6px] min-w-[100px] text-[14px] border border-slate-200">0.0</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Category</th>
                                    <td className="text-black px-[6px] min-w-[100px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Sub Category</th>
                                    <td className="text-black px-[6px] min-w-[100px] text-[14px] border border-slate-200">0.0</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Purchase Tax</th>
                                    <td className="text-black px-[6px] min-w-[100px] text-[14px] border border-slate-200">0.0</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px]  leading-4 font-medium text-black">Purchase Tax Including</th>
                                    <td className="text-black  px-[6px] min-w-[100px] text-[14px] border border-slate-200">0.0</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Net Weight</th>
                                    <td className="text-black px-[6px] min-w-[100px] text-[14px] border border-slate-200">0.0</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Stock Limit</th>
                                    <td className="text-black  px-[6px] min-w-[100px] text-[14px] border border-slate-200">0.0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <table className="border border-slate-200 w-full text-left mb-0">
                            <tbody>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Unit of</th>
                                    <td className="text-black px-[6px] min-w-[150px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px]  bg-slate-50 text-[14px] font-medium text-black">Measurement</th>
                                    <td className="text-black px-[6px]  min-w-[150px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px]  bg-slate-50 text-[14px] font-medium text-black">HSN Code</th>
                                    <td className="text-black px-[6px]  min-w-[150px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Brand</th>
                                    <td className="text-black  px-[6px]  min-w-[150px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Sub Brand</th>
                                    <td className="text-black px-[6px]  min-w-[150px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Sales Tax	</th>
                                    <td className="text-black  px-[6px]  min-w-[120px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium  text-black leading-4">Sales Tax Including</th>
                                    <td className="text-black px-[6px]  min-w-[120px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Ingredients	</th>
                                    <td className="text-black px-[6px]  min-w-[120px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Cess	</th>
                                    <td className="text-black px-[6px]  min-w-[120px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">PO Qty</th>
                                    <td className="text-black px-[6px]  min-w-[120px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Created On</th>
                                    <td className="text-black px-[6px]  min-w-[120px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Created By</th>
                                    <td className="text-black px-[6px]  min-w-[120px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className=" min-w-[120px] px-[6px] bg-slate-50 text-[14px] font-medium text-black">Master Qty</th>
                                    <td className="text-black px-[6px]   min-w-[120px] text-[14px] border border-slate-200">{"0.00"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div>
                        <div className='mb-[10px]'>
                            <table className="border border-slate-200 text-left mb-0 w-full">
                                <thead className="text-sm text-black border border-slate-200 font-[100] bg-slate-50">
                                    <tr>
                                        <th className="px-3 py-[4px]">
                                            Nutrition Name
                                        </th>
                                        <th className="px-3 py-[4px]">
                                            Nutrition Value
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr >
                                        <td colSpan={2} className="text-black px-[10px] font-[100] min-w-[100px] text-center text-[14px]  border-slate-200">{" Data Not Available"}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                        <div >
                            <table className="border border-slate-200 text-left mb-0 w-full">
                                <thead className="text-sm text-black border-slate-200 bg-slate-50">
                                    <tr>
                                        <th colSpan={2} className="px-3 py-[4px]">
                                            Total QTY
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>

                                        <td className="text-blue-400 px-[10px] font-semibold min-w-[100px] text-[14px] border  border-slate-200">{"993.00"}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>


                </div>


            </section>
        </DefaultLayout>
    )
}

export default ViewProduct