import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import toast, { Toaster } from 'react-hot-toast';
import { FaHome } from 'react-icons/fa';
import inventory_sidebar from '../../assets/inventory_sidebar.svg';
import axios from 'axios';
import { useQuery } from 'react-query';

const Products: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const fetchProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  };
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

  const { data: allProducts, isLoading, error } = useQuery('products', fetchProducts, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: twentyFourHoursInMs,
  });

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  // Filter and sort products
  const filterAndSortProducts = (products: any[]) => {
    let filteredProducts = products;

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Sort products
    if (sortOrder) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    return filteredProducts;
  };

  const filteredProducts = filterAndSortProducts(allProducts);

  // Pagination logic
  const maxPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredProducts.length);
  const currentData = filteredProducts.slice(startIndex, endIndex);

  const handleRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPages));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={<h1 className="ml-[42px]">Products</h1>}
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
      <section className="bg-white mx-[12px] my-[12px] rounded-[12px]">
        <Toaster />

        <div className="mx-auto px-[24px]">
          <div className="bg-white relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4 ">
              <div className="flex gap-[10px]">
                <select
                  className="flex items-center justify-center text-black border bg-white border-slate-300 rounded-[8px] font-[500] text-sm px-3 py-1"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Filter By Category</option>
                  <option value="men's clothing">men's clothing</option>
                  <option value="jewelery">jewelery</option>
                  <option value="electronics">electronics</option>
                  <option value="women's clothing">women's clothing</option>
                </select>
                <select
                  id="sortOrder"
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  className="flex items-center justify-center text-black border bg-white border-slate-300 rounded-[8px] font-[500] text-sm px-3 py-1"
                >
                  <option value="">Sort By Price</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <select
                  id="rowsPerPage"
                  value={rowsPerPage}
                  onChange={handleRowsPerPage}
                  className="bg-gray-50 border border-slate-300 bg-white rounded-[8px] text-black text-sm font-semibold block w-full px-2 py-1"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>

                <div className="w-full">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="simple-search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-50 border border-slate-300 text-gray-900 text-sm outline-none block w-full pl-3 px-2 py-1 rounded-[8px]"
                        placeholder="Search"
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto ">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-[14px] text-black bg-gray-50">
                  <tr className="w-full border-t border-b border-slate-300">
                    <th className="px-4 py-[6px] min-w-[7%] border-r font-[500] border-slate-300 ">#</th>
                    <th className="px-4 py-[6px] border-r font-[500] border-slate-300 ">Image</th>
                    <th className="px-4 py-[6px] border-r font-[500] border-slate-300 min-w-[25%]">Name</th>
                    <th className="px-4 py-[6px] border-r font-[500] border-slate-300 ">Price</th>
                    <th className="px-4 py-[6px] border-r font-[500] border-slate-300 ">Category</th>
                    <th className="px-4 py-[6px] border-r font-[500] border-slate-300 whitespace-nowrap">Average Rating</th>
                    <th className="px-4 py-[6px] font-[500]">Description</th>
                  </tr>
                </thead>

                <tbody className="mt-8 ">
                  {currentData.length === 0 ? (
                    <tr className="border-b border-slate-300">
                      <td colSpan={7} className="px-4 py-[6px] font-[400] text-center text-slate-700">
                        No data available in this table
                      </td>
                    </tr>
                  ) : (
                    currentData.map((product: any, index: number) => (
                      <tr key={index} className="border-t border-b border-slate-300">
                        <td className="px-4 py-[6px] font-medium border-r border-slate-300 text-black">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-4 py-[6px] border-r border-slate-300 font-[500]">
                          <img src={product.image} alt={`Image for ${product.title}`} className="w-10 h-auto" />
                        </td>
                        <td className="px-4 py-[6px] border-r border-slate-300 text-black text-md font-[600]">
                          {product.title}
                        </td>
                        <td className="px-4 py-[6px] border-r border-slate-300 text-black font-[500]">
                          {product.price}
                        </td>
                        <td className="px-4 py-[6px] border-r border-slate-300 text-black font-[500]">
                          {product.category}
                        </td>
                        <td className="px-4 py-[6px] border-r border-slate-300 text-black font-[500]">
                          {product.rating.rate} ⭐
                        </td>
                        <td className="px-4 py-[6px] text-black font-[500]">
                          {product.description}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 py-4" aria-label="Table navigation">
              <span className="text-sm font-normal text-slate-500">
                Showing{' '}
                <span className="font-semibold text-slate-600">
                  {startIndex + 1}-{endIndex}
                </span>
                of{' '}
                <span className="font-semibold text-slate-600">{filteredProducts.length}</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center h-full py-[3px] px-3 ml-0 text-gray-500 bg-white border border-slate-300 "
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
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
                    <svg className="w-5 h-5" aria-hidden="true" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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

export default Products;
