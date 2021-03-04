import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import axios from 'axios';

function ListProduct({
  data,
  product,
  setClick,
  click,
  setFormData,
  formData,
  setProduct,
  danhMucId,
  searchaa,
  setStatus,
  status
}) {
  const onClickHandler = (event, value, index) => {
    console.log(index, product[index])
    setClick(index);
    setFormData(value);
  }

  const xoaTamThoiProduct = function (index) {
    console.log(index)
    const idd = product[index].id;
    const url = `https://60122ad75fffd800170894ce.mockapi.io/category/${danhMucId}/products/${idd}`;
    axios({
      url: url,
      method: 'PUT',
      data: {
        status: false
      }
    })
      .then((response) => {
        const newCategory = product.map(function (val, idx) {
          if (idx == index) {
            return response.data;
          } else return val;
        })

        setProduct(newCategory);
        setStatus(status + 1);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const btnDeleteOnClick = (event, index) => {
    const confirmResult = window.confirm("Xóa?");

    if (confirmResult == true) {
      xoaTamThoiProduct(index);
    }
  }

  return (
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
              data.filter(searchaa).map((value, index) => {
                return (
                  <tr
                    onClick={
                      event => onClickHandler(event, value, index)
                    }
                    key={index}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.price}</td>
                    <td>
                      <Button
                        variant="contained"
                        onClick={
                          event => {
                            btnDeleteOnClick(event, index)
                          }
                        }
                        color="secondary">
                        Delete
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
  );
}

export default ListProduct;
