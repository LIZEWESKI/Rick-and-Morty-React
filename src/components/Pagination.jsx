import React from 'react'
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
const Pagination = ({info}) => {
    const [sp,setSp] = useSearchParams()
    const currentPage = sp.get("page") || 1
    function handlePageClick(e){
        const targetedPage = e.selected;
        window.scrollTo(0,0);
        setSp(prevParam => {
            targetedPage === "" ? prevParam.delete("page") : prevParam.set("page",targetedPage + 1)
            return prevParam
        })
    }
    return (
        <>
            <ReactPaginate 
                nextLabel="NEXT"
                previousLabel="PREV"
                onPageChange={handlePageClick}
                forcePage={(currentPage || 1 ) - 1} 
                pageRangeDisplayed={3}
                pageCount={info.pages}
                breakLabel="..."
                marginPagesDisplayed={1}
                containerClassName="pagination-container"
                previousLinkClassName="prev-link"
                nextLinkClassName="next-link"
                pageLinkClassName="page-link"
                activeLinkClassName="active"
                disabledClassName="disabled"
                renderOnZeroPageCount={null}
                breakAriaLabels
            />
        </>
    )
}

export default Pagination