import React, { useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

import { FaHome, FaPlus, FaRegEdit } from 'react-icons/fa';
import Utilities_sidebar from '../../../assets/Utilities_sidebar.svg';
import { GiShieldDisabled } from 'react-icons/gi';

const BarcodeUtility: React.FC = () => {
  const [data, setData] = useState<[]>([]);

  //   pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPages = Math.ceil(data.length / rowsPerPage);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPages));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={<h1 className="ml-[42px]">Barcode Utility</h1>}
        icon={
          <img
            src={Utilities_sidebar}
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

      <div className="flex  flex-col md:flex-row px-[12px] py-[20px] m-[12px] rounded-[12px]  gap-[20px] 2xl:gap-[100px] bg-white ">
        <div className="flex flex-col  w-full basis-2/3    md:gap-[40px] ">
          <div className="flex flex-col md:flex-row  gap-[20px] 2xl:gap-[100px] md:gap-[10px] w-full">
            <div>
              <label
                htmlFor="select_brand"
                className="font-[500] text-[15px] text-black leading-[1px]"
              >
                Barcode Generate From
              </label>

              <select
                id="bank"
                // value={paymentMode}
                // onChange={handleChange}
                className="bg-white border border-slate-300 text-gray-900 text-sm rounded-lg  block w-full px-[3px] py-[4px] mt-[6px] sm:mr-[10px] outline-none"
              >
                <option selected>Product</option>
                <option value="Purchase">Purchase</option>
                <option value="STock Transfer">Stock Transfer</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="select_brand"
                className="font-[500] text-[15px] text-black whitespace-nowrap color"
              >
                Category
              </label>

              <select
                id="bank"
                // value={paymentMode}
                // onChange={handleChange}
                className="bg-white border border-slate-300 text-gray-900 text-sm rounded-lg  block w-full px-[4px] py-[4px] mt-[6px] outline-none"
              >
                <option selected>Select..</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="dds">DDS</option>
                <option value="DE">E-Commerce Operator</option>
                <option value="DE">UIN Holders</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="select_brand"
                className="font-[500] text-[15px] text-black "
              >
                Brand
              </label>
              <div className="flex items-center mt-[4px]">
                <select
                  id="bank"
                  // value={paymentMode}
                  // onChange={handleChange}
                  className="bg-white border border-slate-300 text-gray-900 text-sm rounded-lg  block w-full  py-[4px]  outline-none"
                >
                  <option selected>Select..</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="dds">DDS</option>
                  <option value="DE">E-Commerce Operator</option>
                  <option value="DE">UIN Holders</option>
                </select>
                <button
                  type="button"
                  className="items-center justify-center text-black border border-slate-300 rounded-[8px] font-[500] text-sm px-3 py-1  ml-[10px]"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div>
            <input
              defaultChecked
              id="sales_tax_including"
              type="checkbox"
              // checked={salesTaxIncluding}
              // onChange={handleChange}
              defaultValue=""
              className="  border-gray-300 rounded  mt-[20px]"
            />
            <label
              htmlFor="sales_tax_including"
              className="ms-2 text-sm font-medium text-black"
            >
              Clear Form
            </label>

            <input
              type="text"
              id="selling_margin"
              // value={productName}
              // onChange={handleChange}
              className="bg-gray-50 rounded-lg border border-slate-300 text-black text-sm  block  px-[3px]  mt-[6px] py-[4px] w-[320px] outline-none"
              placeholder="Scan Barcode/Enter Product Name"
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-[10px] mt-[2px] basis-1/5">
          <div>
            <label
              htmlFor="select_brand"
              className="font-[500] text-[15px] text-black whitespace-nowrap color"
            >
              Print Type
            </label>

            <select
              id="bank"
              // value={paymentMode}
              // onChange={handleChange}
              className="bg-white border border-slate-300 text-gray-900 text-sm rounded-lg  block w-full px-2 py-[4px] mt-[3px] outline-none"
            >
              <option selected>Select Print Type</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="dds">DDS</option>
              <option value="DE">E-Commerce Operator</option>
              <option value="DE">UIN Holders</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="select_brand"
              className="font-[500] text-[15px] text-black mr-[10px] whitespace-nowrap "
            >
              Date Format
            </label>
            <input
              defaultChecked
              id="sales_tax_including"
              type="checkbox"
              // checked={salesTaxIncluding}
              // onChange={handleChange}
              defaultValue=""
              className="  border-gray-300 rounded "
            />

            <select
              id="bank"
              // value={paymentMode}
              // onChange={handleChange}
              className="bg-white border border-slate-300 text-gray-900 text-sm rounded-lg  block w-full px-2 py-[4px] mt-[6px] outline-none"
            >
              <option selected>Select Date Format</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="dds">DDS</option>
              <option value="DE">E-Commerce Operator</option>
              <option value="DE">UIN Holders</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="select_brand"
              className="font-[500] text-[15px] text-black whitespace-nowrap color"
            >
              Barcode Size
            </label>

            <select
              id="bank"
              // value={paymentMode}
              // onChange={handleChange}
              className="bg-white border border-slate-300 text-gray-900 text-sm rounded-lg  block w-full px-2 py-[4px] mt-[6px] outline-none "
            >
              <option selected>Select barcode Size</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="dds">DDS</option>
              <option value="DE">E-Commerce Operator</option>
              <option value="DE">UIN Holders</option>
            </select>
          </div>
        </div>

        <div className=" flex flex-col justify-center  md:basis-1/12  w-full lg:basis-1/5 ">
          <div className="border  bg-slate-100 py-[60px] px-[60px]">
            Barcode
          </div>

          <button className="max-w-[70%] mx-auto  border px-[6px] py-[2px] mt-[8px] bg-blue-300 rounded-md text-black-2 ">
            Generate Barcode
          </button>
        </div>
      </div>

      {/* Table Part */}

      <div className="overflow-x-auto mx-[12px] rounded-[12px] bg-white px-[32px] py-[32px]">
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <div>
            <select
              id="accounts"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="bg-gray-50 mb-3 border border-slate-300 bg-white rounded-[8px] text-black text-sm font-semibold block w-full px-2 py-1"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-[14px] text-black  bg-gray-50 bottom-[23px]">
            <tr className="w-full border-t border-b border-slate-300">
              <input
                defaultChecked
                id="sales_tax_including"
                type="checkbox"
                // checked={salesTaxIncluding}
                // onChange={handleChange}
                defaultValue=""
                className="  border-gray-300 rounded mt-[10px]"
              />
              <th
                scope="col"
                className="px-2 py-[6px] min-w-[7%] border-r font-[500] border-slate-300 "
              >
                Item Code
              </th>

              <th
                scope="col"
                className="px-4 py-[6px] border-r  font-[500] border-slate-300 "
              >
                Product Name
              </th>
              <th
                scope="col"
                className="px-4 py-[6px]  border-r font-[500] border-slate-300 "
              >
                Qty
              </th>
              <th
                scope="col"
                className="px-4 py-[6px] border-r font-[500] border-slate-300  "
              >
                Batch No.
              </th>
              <th
                scope="col"
                className="px-4 py-[6px] border-r font-[500] border-slate-300  "
              >
                Packing Date
              </th>
              <th
                scope="col"
                className="px-4 py-[6px] border-r font-[500] border-slate-300  "
              >
                MRP
              </th>

              <th
                scope="col"
                className="px-4 py-[6px] font-[500] border-slate-300  "
              >
                Selling Price
              </th>
            </tr>
          </thead>

          <tbody className="mt-8 ">
            {data?.length === 0 ? (
              <tr className="border-b border-slate-300">
                <td
                  colSpan={6}
                  className="px-4 py-[6px] font-[400] text-center text-slate-700"
                >
                  No data available in this table
                </td>
              </tr>
            ) : (
              currentData?.map((material, index) => (
                <tr key={index} className="border-t border-b border-slate-300">
                  <td className="px-4 py-[6px] font-medium  border-r border-slate-300 text-black">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-[6px]  border-r border-slate-300 font-[500] text-sky-500">
                    {material.consumptionNumber}
                  </td>

                  <td className="px-4 py-[6px] border-r border-slate-300 font-[500]">
                    {/* {material?.consumptionDate ? formatDate(material.consumptionDate) : ''} */}
                  </td>
                  <td className="px-4 py-[6px]  border-r border-slate-300 font-[500]">
                    {material?.userName}
                  </td>
                  <td className="px-4 py-[6px]  border-r border-slate-300 font-[500]">
                    {material?.consumptionType}
                  </td>
                  <td className="px-4 py-[6px]  border-r border-slate-300 font-[500]">
                    {material?.location}
                  </td>
                  <td className="px-4 py-[6px]  border-r border-slate-300 font-[500]">
                    {material?.grandTotal}
                  </td>

                  <td className="px-4 py-[6px]  font-[500] flex gap-x-[12px]">
                    <span className="text-[18px] ">
                      <GiShieldDisabled />
                    </span>
                    {/* <button type='button' onClick={() => handleDeleteMaterialCon(material?._id)} className='text-[18px]'><RiDeleteBin6Line /></button> */}
                    <span className="text-[18px] ">
                      <FaRegEdit />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <nav
          className="flex flex-col md:flex-row justify-between items-start px-[32px] md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-600">
              {startIndex + 1}-{endIndex}{' '}
            </span>
            of{' '}
            <span className="font-semibold text-slate-600">{data.length}</span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center h-full py-[3px] px-3 ml-0 text-gray-500 bg-white  border border-slate-300 "
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="black"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            <span className="text-[15px] font-[500] mt-[2px] text-black px-[10px]">
              {currentPage} of {maxPages}
            </span>

            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === maxPages}
                className="flex items-center justify-center h-full py-[3px] px-3 leading-tight text-gray-500 bg-white border border-slate-300"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="black"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* ================================= */}
    </DefaultLayout>
  );
};

export default BarcodeUtility;
