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
  setClick,
  setFormData,
  setProduct,
  danhMucId,
}) {
  const onClickHandler = (event, value, index) => {
    setClick(index);
    setFormData(value);
  }

  const onDeleteProduct = (index) => {
    const id = data[index].id;
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

  const btnDeleteOnClick = (event, index) => {
    const confirmResult = window.confirm("Xóa?");

    if (confirmResult == true) {
      onDeleteProduct(index);
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
              data.map((value, index) => {
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
                        onClick={
                          (event) => btnDeleteOnClick(event, index)
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
