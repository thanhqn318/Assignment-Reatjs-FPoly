import { TextField, Button } from "@material-ui/core";

function Search() {
    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Tìm kiếm....."
                style={{ width: '200px', margin: '10px 10px 10px 0px' }}
                name='id'
                variant="outlined" />
            <Button
                type='submit'
                style={{ marginTop: '20px' }}
                variant='contained'
                color='primary' >
                Submit
            </Button>
        </div>
    )
}

export default Search;