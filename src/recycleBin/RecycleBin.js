import { Typography } from "@material-ui/core";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Search from "../components/Search/Search";
function RecycleBin() {
  const [status, setStatus] = useState(0);
  const [listCategory, setListCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [danhMucId, setDanhMucId] = useState(-1);
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
          if (data.status == false) {
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

  const onDeleteProduct = (index) => {
    const id = product[index].id;
    const url = 'https://60122ad75fffd800170894ce.mockapi.io/category/'
      + danhMucId + '/products/' + id;
    axios({
      method: 'DELETE',
      url: url,
    }).then((response) => {
      console.log('response', response);
      if (response.status == 200) {
        setProduct((oldState) => {
          const newState = oldState.filter((val, idx) => {
            return idx == index ? false : true;
          });

          return newState;
        });
      }
    }).catch((error) => {
      console.log('error', error, error.response);
    });
  }

  const khoiPhucPr = function (event, index) {
    const confirmResult = window.confirm("Bạn có muốn khôi phục?");

    event.stopPropagation();
    if (confirmResult == true) {
      console.log(index)
      const idd = product[index].id;
      const url = `https://60122ad75fffd800170894ce.mockapi.io/category/${danhMucId}/products/${idd}`;
      axios({
        url: url,
        method: 'PUT',
        data: {
          status: true
        }
      })
        .then((response) => {
          const newPr = product.map(function (val, idx) {
            if (idx == index) {
              return response.data;
            } else return val;
          })

          setProduct(newPr);
          setStatus(status + 1);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }

  const btnDeleteOnClick = (event, index) => {
    const confirmResult = window.confirm("Bạn có muốn Xóa vĩnh viễn?");

    if (confirmResult == true) {
      onDeleteProduct(index);
    }
  }

  return (
    < div >
      <Typography>
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
        <div className='panel panel-primary'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Danh sách sản phẩm</h3>
          </div>
          <div className='panel-body'>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Mã sản phẩm</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Giá sản phẩm</th>
                  <th scope="col">Quản lý</th>
                </tr>
              </thead>
              <tbody>
                {
                  product.filter(searchaa).map((value, index) => {
                    return (
                      <tr
                        key={index}>
                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.price}</td>
                        <td>
                          <Button
                            style={{ marginRight: '15px' }}
                            variant="contained"
                            onClick={
                              event => {
                                btnDeleteOnClick(index)
                              }
                            }
                            color="secondary">
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={
                              event => {
                                khoiPhucPr(event, index)
                              }
                            }>
                            Restore
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
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

    </div >
  )
}
export default RecycleBin;