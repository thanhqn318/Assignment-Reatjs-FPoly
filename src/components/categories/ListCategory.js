import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import CreateCategory from './CreateCategory'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function ListCategory({ data, setClick, setFormData, setCategory, click, category, formData, searchaa }) {

  const onClickHandler = (event, index, value) => {
    setClick(index)
    setFormData(value)
  }

  const btnUpdateOnClick = function () {
    return;
  }

  const btnDeleteOnClick = function (event, value, index) {
    const confirmResult = window.confirm("Xóa?");
    event.stopPropagation();
    if (confirmResult == true) {
      const deleteApiUrl = 'https://60122ad75fffd800170894ce.mockapi.io/category/' + value.id;

      axios.delete(deleteApiUrl)
        .then(function (response) {
          const listNew = data.filter(function (val, idx) {
            if (idx == index) {
              //Loại bỏ phẩn tử
              return false;
            }

            //Giữ nguyên phần tử
            return true;
          });

          setCategory(listNew);
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <div className='panel panel-primary'>
      <div className='panel-heading'>
        <h3 className='panel-title'>Danh sách danh mục</h3>
      </div>
      <div className='panel-body'>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Mã danh mục</th>
              <th scope="col">Tên danh mục</th>
              <th scope="col">Quản lý</th>
            </tr>
          </thead>
          <tbody>
            {
              data.filter(searchaa).map((value, index) => {
                return (
                  <tr key={index} onClick={
                    (event) => {
                      onClickHandler(event, index, value);
                      console.log(value)
                    }
                  } >
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>
                      <Button
                        variant="contained"
                        onClick={
                          (event) => {
                            btnDeleteOnClick(event, value, index);
                          }
                        }
                        color='secondary'>
                        Delete
                       </Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default ListCategory;