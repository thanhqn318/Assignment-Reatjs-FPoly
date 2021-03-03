import ListCategory from "./ListCategory";
import CreateCategory from "./CreateCategory";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextField } from "@material-ui/core";
import Search from "../Search/Search";

function Category() {

  const formDataInitValue = { id: '', name: '' };

  const [category, setCategory] = useState([]);
  const [click, setClick] = useState(-1);
  const [formData, setFormData] = useState(formDataInitValue);


  const urlParams = new URLSearchParams(window.location.search);
  const pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
  const [page, setPage] = useState(pageInit)
  const limit = 5;
  const url = "https://60122ad75fffd800170894ce.mockapi.io/category?limit=" + limit + '&page=' + page;

  useEffect(() => {
    axios({
      method: 'GET',
      url: url,
    })
      .then((response) => {
        const { data } = response;
        setCategory(data)
        console.log(data)
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [
    /*
        * Khi các phần tử trong mảng thay đổi
        * useEffect  sẽ chạy lại callback
    */
    page
  ]);

  const nextPage = function () {
    setPage(page + 1)
  }

  const previosPage = function () {
    if (page == 1) return;
    setPage(page - 1)
  }

  const [dataSearch, setDataSearch] = useState("");
  const handlerSearch = (e) => {
      setDataSearch(e.target.value)
  }
  const searchaa = (value) => {
      if (dataSearch == "") {
          return value;
      } else if (value.name.toLowerCase().includes(dataSearch.toLowerCase()))
          return value;
  }

  return (
    <div>
      <CreateCategory
        setClick={setClick}
        click={click}
        category={category}
        setCategory={setCategory}
        setFormData={setFormData}
        formData={formData} />
      <hr></hr>
      <Search 
        dataSearch={dataSearch} 
        handlerSearch={handlerSearch} />
      <ListCategory
        setCategory={setCategory}
        data={category}
        setClick={setClick}
        setFormData={setFormData}
        searchaa={searchaa} />

      <ul className="pagination justify-content-center" style={{ marginLeft: '920px' }} >
        <li className="page-item" onClick={previosPage} >
          <a className="page-link">Trang trước</a>
        </li>
        <li className="page-item">
          <a className="page-link">{page}</a>
        </li>
        <li className="page-item" onClick={nextPage}>
          <a className="page-link">Trang sau</a>
        </li>
      </ul>
    </div>
  )
}

export default Category;