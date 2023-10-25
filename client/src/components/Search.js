import React, { useEffect, useState } from 'react'
import { InputBase,Box,styled, List, ListItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch,useSelector} from 'react-redux';
import { getProducts } from '../redux/actions/productAction';
import {Link} from 'react-router-dom'

const SearchContainer = styled(Box)`
    background : white;
    border-radius : 2px;
    margin-left : 10px;
    width : 38%;
    display : flex;
`

const InputSearchBase = styled(InputBase)`
    padding-left : 20px;
    width:100%;
    font-size:unset;
`

const BoxWrapper = styled(Box)`
    color:#2874F0;
    padding:5px;
    display:flex;
`
const ListWrapper = styled(List)`
    position:absolute;
    margin-top:36px;
    color:#000f;
    background:#FFFFFF;
`

const Search = () => {

    const dispatch = useDispatch();

    const {products} = useSelector(state=>state.getProducts)

    const [text,setText] = useState()

    useEffect(()=>{
        dispatch(getProducts)
    },[dispatch])
 
    const getText=(value)=>{
        setText(value)
    }

    return (
        <SearchContainer>
            <InputSearchBase onChange={(e)=>getText(e.target.value)} value={text} placeholder='Search for products, brands and more' />
            <BoxWrapper>
                <SearchIcon/>
            </BoxWrapper>
            {
                text && 
                <ListWrapper>
                    {
                        products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                            <ListItem>
                                {
                                    <Link to={`/product/${product.id}`}
                                        onClick={()=>setText('')}
                                        style={{textDecoration:'none', color:'inherit'}}
                                    >
                                        {product.title.longTitle}
                                    </Link>
                                }
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            }
        </SearchContainer>
        
    )
}

export default Search;