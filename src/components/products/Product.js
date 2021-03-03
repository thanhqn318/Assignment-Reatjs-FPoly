
import ListProduct from './ListProduct';
import CreateProduct from './CreateProduct';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from "../Search/Search";

function Product() {
  const [status, setStatus] = useState(0);
  const [danhMucId, setDanhMucId] = useState(-1);
  const [listCategory, setListCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
  });
  const urlParams = new URLSearchParams(window.location.search);
  const pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
  const [page, setPage] = useState(pageInit)
  const limit = 6;
  const [click, setClick] = useState(-1);
  useEffect(() => {
    const url = 'https://60122ad75fffd800170894ce.mockapi.io/category';
    axios({
      url: url,
      method: 'GET',
    })
      .then((response) => {
        const { data } = response;
        setListCategory(data);
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  }, []);

  useEffect(() => {
    const url = 'https://60122ad75fffd800170894ce.mockapi.io/category/' + danhMucId + '/products?limit=' + limit + '&page=' + page;
    axios.get(url)
      .then((response) => {
          const { data } = response;
          const duLieuChuaXoa = data.filter((data) => {
            if (data.status == true) {
              return true;
            }
          })
          setProduct(duLieuChuaXoa);
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  }, [
    danhMucId, page, status
  ]);

  const danhMucOnChange = function (event) {
    const { name, value } = event.target;
    setDanhMucId(value);
  }

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
      <Typography>
        <CreateProduct
          setProduct={setProduct}
          product={product}
          formData={formData}
          setFormData={setFormData}
          danhMucId={danhMucId}
          click={click}
          setClick={setClick} />
        <div style={{ display: 'block' }}>
          <select
            style={{ width: '25%' }}
            className="form-control form-control-lg"
            aria-label="Default select example"
            onChange={danhMucOnChange}
            name="category_id">
            <option>Chọn danh mục</option>
            {
              listCategory.map(function (val, idx) {
                return (
                  <option key={idx} value={val.id}>
                    { val.name}
                  </option>
                );
              })
            }
          </select>
          <Search
            dataSearch={dataSearch}
            handlerSearch={handlerSearch} />
        </div>
        <ListProduct
          setProduct={setProduct}
          setFormData={setFormData}
          setClick={setClick}
          danhMucId={danhMucId}
          data={product}
          formData={formData}
          product={product}
          searchaa={searchaa}
          click={click}
          status={status}
          setStatus={setStatus} />

        <ul className="pagination justify-content-end" style={{ marginLeft: '920px' }}>
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
      </Typography>
    </div>
  );
}

export default Product;
