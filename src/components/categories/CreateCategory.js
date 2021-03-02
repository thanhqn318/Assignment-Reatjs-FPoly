
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useState } from "react";
import axios from 'axios';

function CreateCategory({
    click, 
    category, 
    setCategory, 
    formData: data, 
    setFormData: setData,
    setClick }){
    
    const themMoi = function(){
       
        const createApiUrl = 'https://60122ad75fffd800170894ce.mockapi.io/category';

        axios.post(createApiUrl, data)
            .then(function(response){
                setCategory([
                ...category,// dấu 3 chấm lấy tất cả các phần tử của product trước đó
                response.data               
                ]);

                setData({
                    id: '',
                    name:''
                })
            })
            .catch(function(error){
                console.log('error');
                console.log(error);
            })
    }

    const capNhat = function(){

        const updateApiUrl = 'https://60122ad75fffd800170894ce.mockapi.io/category/' + data.id;

        axios.put(updateApiUrl, data)
            .then(function(response){

                const newCategory = category.map(function(value, index){
                    if(index == click){
                        return response.data;
                    } else return value;
                })

                setCategory(newCategory);
            })
            .catch(function(error){
                console.log('error');
                console.log(error);
            })

    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(click == -1){
            //Tao moi
            themMoi();
        } else {
            //Cap nhat
            capNhat();
        }
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        //prod[name] = value;
        setData({
            ...data,
            [name]: value
        });
    }

    const onClickHandler = (event) => {
        
    }

    const btnXoaFormOnClick = function(event){
        setClick(-1);
        setData({
            id: '',
            name: ''
        })
    }

    return(
        <div>
            <form onSubmit = { onSubmitHandler } >
                <TextField 
                    id="outlined-basic" 
                    label="ID" 
                    fullWidth 
                    style = { { marginTop: '20px' } } 
                    variant="outlined"
                    name = 'id'
                    value = { data.id } 
                    onChange = { onChangeHandler }
                    disabled /> 
                <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    fullWidth 
                    style = { { marginTop: '20px' } } 
                    variant="outlined"
                    name = 'name'
                    value = { data.name }
                    onChange = { onChangeHandler } />
                <Box textAlign = 'center'>
                    <Button 
                        type = 'submit'
                        style = { { marginTop: '20px' } } 
                        variant = 'contained' 
                        color = 'primary' >
                        Submit
                    </Button>
                    <Button
                        onClick = { btnXoaFormOnClick }
                        type = 'reset'
                        style = { { marginTop: '20px', marginLeft: '20px' } } 
                        color = 'secondary' >
                        Xóa form
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default CreateCategory;