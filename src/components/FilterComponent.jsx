import React, { useState } from 'react'
import {filterOptions} from "../utils/filterOptions"
import { IoFilterOutline } from "react-icons/io5";
import { useSearchParams } from 'react-router-dom';

const FilterComponent = () => {
    const [filterData, setFilterData] = useState({
        name: "",
        status: "",
        gender: "",
        species: ""
    })
    const [sp,setSp] = useSearchParams()
    function handleOnChange(e){
        const {name, value} = e.target;
        setFilterData(prevState => ({...prevState, [name] : value.toLowerCase().trim()}))
    }
    function handleFilter(e){
        e.preventDefault()
        const filterKeyValues = Object.entries(filterData)
        setSp(prevParams => {
            // for Ref
            // filterKeyValues.forEach(filter => {
            //     const key = filter[0];
            //     const value = filter[1];
            //     value === "" ? prevParams.delete(key) : prevParams.set(key,value);
            // })
            // return prevParams
            return filterKeyValues.reduce((params, [key, value]) => {
                params.has("page") && params.delete("page")
                value === "" ? params.delete(key) : params.set(key, value);
                return params;
              }, prevParams);
        })
    }
  return (
    <div className='filter_wrapper'>
        <h2>Filter</h2>
        <p>For best results, use simple and fewer filters.</p>
        <form className="filter--input_wrapper" onSubmit={handleFilter}>
            <input name='name' type="text" placeholder='Jerry Smith' onChange={handleOnChange} />
            {filterOptions.map(filterOption=> (
                <select key={filterOption.id} name={filterOption.value.toLowerCase()} onChange={handleOnChange} >
                    <option value="">{`${filterOption.value}`}</option>
                    {filterOption.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ))}
            <button><IoFilterOutline size={24}/> Filter</button>
        </form>
    </div>
  )
}

export default FilterComponent