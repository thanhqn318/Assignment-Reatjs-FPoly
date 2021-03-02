
import ListProduct from './ListProduct';
import CreateProduct from './CreateProduct';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [listCategory, setListCategory] = useState([]);
  const [danhMucId, setDanhMucId] = useState(-1);
  const [product, setProduct] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
  });

  const urlParams = new URLSearchParams(window.location.search);
  const pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
  const [page, setPage] = useState(pageInit)
  const limit = 5;
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
    axios({
      url: url,
      method: 'GET',
    })
      .then((response) => {
        const { data } = response;
        setProduct(data);
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  }, [
    danhMucId, page
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
        <div>
          <label>Danh mục</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={danhMucOnChange}
            name="category_id">
            <option>-- Chọn danh mục --</option>
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
        </div>

        <ListProduct
          setProduct={setProduct}
          setFormData={setFormData}
          setClick={setClick}
          danhMucId={danhMucId}
          data={product} />

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

export default App;
