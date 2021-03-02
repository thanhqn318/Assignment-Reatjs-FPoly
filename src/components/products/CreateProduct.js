import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Box from '@material-ui/core/Box';
function CreateProduct({
  click,
  setClick,
  formData,
  setFormData,
  setProduct,
  product,
  danhMucId,
}) {
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const onCreateProduct = () => {
    const url = 'https://60122ad75fffd800170894ce.mockapi.io/category/'
      + danhMucId + '/products';
    axios({
      url: url,
      method: 'POST',
      data: formData
    })
      .then((response) => {
        const { data } = response;
        setProduct([
          ...product,
          data,
        ]);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const onUpdateProduct = () => {
    const url = `https://60122ad75fffd800170894ce.mockapi.io/category/${danhMucId}/products/${product[click].id}`;
    axios({
      url: url,
      method: 'PUT',
      data: formData
    })
      .then((response) => {
        const { data } = response;

        setProduct((oldState) => {
          return oldState.map((val, idx) => {
            return idx == click ? data : val;
          });
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (click == -1) {
      // Tạo mới
      onCreateProduct();
    } else {
      // Cập nhật
      onUpdateProduct();
    }
  }
  const btnXoaFormOnClick = function (event) {
    setClick(-1);
    setFormData({
      id: '',
      name: '',
      price: ''
    })
  }

  return (
    <Box borderRadius={16}>
      <form
        onSubmit={onSubmitHandler}
        style={{ marginTop: '10px' }}>
        <TextField
          id="outlined-basic"
          label="ID"
          fullWidth
          style={{ marginTop: '20px' }}
          name='id'
          onChange={onChangeHandler}
          disabled
          value={formData.id}
          name="id"
          variant="outlined" />
        <TextField
          id="outlined-basic"
          fullWidth
          onChange={onChangeHandler}
          style={{ marginTop: '20px' }}
          label="Name"
          value={formData.name}
          name="name"
          variant="outlined" />
        <TextField
          id="outlined-basic"
          fullWidth
          onChange={onChangeHandler}
          style={{ marginTop: '20px' }}
          label="Price"
          value={formData.price}
          name="price"
          variant="outlined" />
        <Box textAlign='center'>
          <Button
            type='submit'
            style={{ marginTop: '20px' }}
            variant='contained'
            color='primary' >
            Submit
        </Button>
          <Button
            onClick={btnXoaFormOnClick}
            type='reset'
            style={{ marginTop: '20px', marginLeft: '20px' }}
            color='secondary' >
            Xóa form
        </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CreateProduct;
