import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import inventory_sidebar from '../../../assets/inventory_sidebar.svg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { accountBackendUrl } from '../../../Configmain';

interface Data {
  documentName: string;
  size: string;
  remarks: string;

  _id: string;
}

const CompanyDrive: React.FC = () => {
  const [isCompanyDriveBox, setIsCompanyDriveBox] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [documentName, setDocumentName] = useState<string>('');
  const [documentLink, setDocumentLink] = useState<File | null>(null);
  const [remarks, setRemarks] = useState<string>('');
  const token = localStorage.getItem('authorization');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const handleCompanyDriveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'document_name') {
      setDocumentName(value);
    } else if (id === 'remarks') {
      setRemarks(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentLink(e.target.files[0]);
    }
  };

  const handleDeleteCompanyDrive = async (_id: string) => {
    try {
      const response = await axios.delete(
        `${accountBackendUrl}/api/drive/${_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success('Drive Deleted Successfully');
        setData((prevData) => prevData.filter((item) => item._id !== _id));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const fetchingCompanyDrive = async () => {
      try {
        const response = await axios.get(
          `${accountBackendUrl}/api/drive?documentName=${encodeURIComponent(
            searchQuery.toLowerCase(),
          )}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );

        if (response.status === 200) {
          // console.log("response from comapny drive ", response.data.data)
          setData(response.data.data);
        }
      } catch (error) {}
    };
    fetchingCompanyDrive();
  }, [searchQuery]);

  const handleSubmit = async () => {
    try {
      if (documentLink) {
        // Create FormData object to send file data
        const formData = new FormData();

        formData.append('documentName', documentName);
        formData.append('remarks', remarks);
        formData.append('file', documentLink);
        console.log('formData', formData);
        const response = await axios.post(
          `${accountBackendUrl}/api/drive`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `${token}`,
            },
          },
        );

        if (response.status === 201) {
          console.log(response.data);
          toast.success('Drive Created Successfully');
          setDocumentLink(null);
          setDocumentName('');
          setRemarks('');
          setIsCompanyDriveBox(false);
          setData((prevData) => [...prevData, response.data.data]);
        }
      } else {
        console.error('No file selected.');
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={<h1 className="ml-[42px]">Company Drive</h1>}
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
      {isCompanyDriveBox === true && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50"
        >
          <div className="relative w-full max-w-[330px]">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex px-[12px] py-[10px]">
                <p className="text-black font-medium">New Document</p>
                <button
                  type="button"
                  onClick={() => setIsCompanyDriveBox(false)}
                  className="absolute top-2 right-2 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <hr className="h-px my-1 bg-slate-300 border-0 "></hr>
              <div className="p-4 md:p-5 text-center">
                <form className="max-w-sm mx-auto">
                  <div>
                    <label
                      htmlFor="document_name"
                      className="block mt-3 mb-1 text-[14px] text-start  font-medium text-black"
                    >
                      Document Name
                    </label>
                    <input
                      type="text"
                      id="document_name"
                      value={documentName}
                      onChange={handleCompanyDriveChange}
                      className="bg-gray-50 rounded-lg border border-slate-300 text-black text-sm  block w-full px-2 py-[5px] outline-none"
                      placeholder="Document Name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="file_input"
                      className="block mt-3 mb-1 text-[14px] text-start  font-medium text-black"
                    >
                      Document File
                    </label>
                    <input
                      className="bg-gray-50 rounded-lg border border-slate-300 text-black text-sm  block w-full px-2 py-[5px] outline-none"
                      id="file_input"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <span className="text-red-500 text-[13px] pr-[15%]">
                      Accepted formats: JPG,JPEG,PNG,PDF
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="remarks"
                      className="block mt-3 mb-1 text-[14px] text-start  font-medium text-black"
                    >
                      Remarks
                    </label>
                    <input
                      type="text"
                      id="remarks"
                      value={remarks}
                      onChange={handleCompanyDriveChange}
                      className="bg-gray-50 rounded-lg border border-slate-300 text-black text-sm  block w-full px-2 py-[5px] outline-none"
                      placeholder="Enter Category Code"
                      required
                    />
                  </div>
                </form>

                <div className="flex gap-[5px] items-end justify-end px-[12px]">
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => setIsCompanyDriveBox(false)}
                    className="py-[3px] mt-[12px] text-red-500 border border-red-500 px-5 ms-3 text-sm font-medium text-gray-900 outline-none bg-white rounded-lg "
                  >
                    Cancel
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={handleSubmit}
                    className="py-[3px] mt-[12px] text-green-500 border border-green-500 px-4 text-sm font-medium text-gray-900 outline-none bg-white rounded-lg "
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="bg-white">
        <Toaster />
        <div className="mx-auto px-[24px]">
          {/* Start coding here */}
          <div className="bg-white  relative  overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 px-[32px]">
              <div className="">
                <button
                  type="button"
                  onClick={() => setIsCompanyDriveBox(!isCompanyDriveBox)}
                  className="flex items-center justify-center text-black border border-slate-300 rounded-[8px] font-[500] text-sm px-3 py-1 "
                >
                  <span className="mr-1 mt-[2px] text-sm">
                    <FaPlus />
                  </span>
                  Create New
                </button>
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <div>
                    <select
                      id="drive"
                      value={rowsPerPage}
                      onChange={handleRowsPerPageChange}
                      className="bg-gray-50 border border-slate-300 bg-white rounded-[8px] text-black text-sm font-semibold block w-full px-1 py-1"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                    </select>
                  </div>

                  <div className="w-full ">
                    <form className="flex items-center">
                      <label htmlFor="simple-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          id="simple-search"
                          className="bg-gray-50 border border-slate-300 text-gray-900 text-sm outline-none block w-full pl-10 px-2 py-1 rounded-[8px] "
                          placeholder="Search"
                          required
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Part */}

            <div className="overflow-x-auto px-[32px] ">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-[14px] text-black  bg-gray-50 bottom-[23px]">
                  <tr className="w-full border-t border-b border-slate-300">
                    <th
                      scope="col"
                      className="px-4 py-[6px] min-w-[7%] border-r font-[500] border-slate-300 "
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[6px] border-r  font-[500] border-slate-300 "
                    >
                      Document Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-[6px]  border-r font-[500] border-slate-300 "
                    >
                      Document Size
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-[6px] border-r font-[500] border-slate-300  "
                    >
                      Remarks
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-[6px] font-[500] border-slate-300  "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="mt-8 ">
                  {data?.length === 0 ? (
                    <tr className="border-b border-slate-300">
                      <td
                        colSpan={5}
                        className="px-4 py-[6px] font-[400] text-center text-slate-700"
                      >
                        No data available in this table
                      </td>
                    </tr>
                  ) : (
                    currentData?.map((drive, index) => (
                      <tr
                        key={index}
                        className="border-t border-b border-slate-300"
                      >
                        <td className="px-4 py-[6px] font-medium  border-r border-slate-300 text-black">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-4 py-[6px]  border-r border-slate-300 font-[500] text-sky-500">
                          {drive.documentName}
                        </td>
                        <td className="px-4 py-[6px]  border-r border-slate-300 font-[500]">
                          {drive?.size}
                        </td>
                        <td className="px-4 py-[6px]  border-r border-slate-300 font-[500]">
                          {drive?.remarks}
                        </td>

                        <td className="px-4 py-[6px]  font-[500] flex gap-x-[12px]">
                          <button
                            type="button"
                            onClick={() => handleDeleteCompanyDrive(drive?._id)}
                            className="text-[15px]"
                          >
                            <RiDeleteBin6Line />
                          </button>
                          <span className="text-[15px] ">
                            <FaRegEdit />
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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
                <span className="font-semibold text-slate-600">
                  {data.length}
                </span>
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
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CompanyDrive;
