import { TextField, Button } from "@material-ui/core";

function Search({ handlerSearch, dataSearch }) {
    return (
        <div>
            <TextField
                defaultValue="Small"
                size="small"
                id="outlined-size-small"
                variant="outlined"
                label="Tìm kiếm....."
                style={{ width: '25%', margin: '10px 10px 30px 0px' , height: '20px'}}
                value={dataSearch}
                onChange={handlerSearch} />
        </div>
    )
}

export default Search;