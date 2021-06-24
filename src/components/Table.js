import React, { useState } from 'react'
// import '../styles/table.css'

const Table = ({data}) => {

    const [state, setState] = useState({currentSort: 'default'})
    const [allData, setAllData] = useState({})
    const [zoom, setZoom] = useState(false)
    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a.sell_price - b.sell_price
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b.sell_price - a.sell_price
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };

    const onSortChange = () => {
        let nextSort;

        if (state.currentSort === 'down') nextSort = 'up';
        else if (state.currentSort === 'up') nextSort = 'default';
        else if (state.currentSort === 'default') nextSort = 'down';

        setState({
            currentSort : nextSort
        })
    }

    const onSearch = (e) => {
        let value = e.target.value.toLowerCase();
        let result = [];
        console.log(value)

        result = data.filter((dt) => {
            return dt.name.toLowerCase().search(value) !== -1;
        });

        setAllData(result)

    }

    let arrow = ''
    if(state.currentSort === 'up') {
        arrow = 'triangle-down'
    }
    else if (state.currentSort === 'down') {
        arrow = 'triangle-up'
    }
    
    const onZoom = () => {
        setZoom(!zoom)
    }

    const getZoom = zoom ? 'image-main' : 'image-thumbnail';
    return (
        <>
        <div className="search-section">
            Search: 
            <input className="search-bar" type="text" onChange={onSearch}></input>
        </div>
        <table id="webApi">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th onClick={onSortChange} className='pointer'>
                        Harga<div className={arrow}></div>
                    </th>
                    <th>Berat</th>
                    <th>Foto</th>
                    <th>Toko</th>
                </tr>
            </thead>
            <tbody>
                
            { (allData.length > 0) ? [...allData].sort(sortTypes[state.currentSort].fn).map( (d, index) => {
                return (
                    <tr key={ index }>
                        <td>{ d.id }</td>
                        <td>{ d.name }</td>
                        <td>{ d.sell_price}</td>
                        <td>{ d.unit_measure }</td>
                        <td className={getZoom} onClick={onZoom}>{ d.SpreeProductImages.map(image => {
                            return <img src={zoom ? `https://apis-dev.aspenku.com${image.main_image}` : `https://apis-dev.aspenku.com${image.thumbnail_image}`} alt={image.alternative_text}/>
                        }) }</td>
                        <td>{ d.SpreeStore.store_name }</td>
                    </tr>
                )
            }) :  
            (data.length > 0) ? [...data].sort(sortTypes[state.currentSort].fn).map( (d, index) => {
                return (
                    <tr key={ index }>
                        <td>{ d.id }</td>
                        <td>{ d.name }</td>
                        <td>{ d.sell_price}</td>
                        <td>{ d.unit_measure }</td>
                        <td className={getZoom} onClick={onZoom}>{ d.SpreeProductImages.map(image => {
                            return <img src={zoom ? `https://apis-dev.aspenku.com${image.main_image}` : `https://apis-dev.aspenku.com${image.thumbnail_image}`} alt={image.alternative_text}/>
                        }) }</td>
                        <td>{ d.SpreeStore.store_name }</td>
                    </tr>
                )
                }) : <tr><td colSpan="5">Loading...</td></tr> }
                
            </tbody>
        </table>
        </>
    )
}

export default Table
