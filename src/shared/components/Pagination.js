import React from "react";
import { useLocation,useSearchParams, Link} from "react-router-dom"
const Pagination = ({pages}) => {
    const {pathname, search} = useLocation();
    const[searchParams, setSearchParams] = useSearchParams();
    const {total, currentPage, hasNext, hasPrev, next, prev, limit } = pages;
    const totalPages = Math.ceil(total/limit);
    const formatUrl = (page) => {
        return `${pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
    }     
    const renderPagesHTML = (delta=2)=>{
        const pagesHTML = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for(let i = 0; i <= totalPages; i++){
            if(
                i === 1 ||
                i === totalPages ||
                i === currentPage ||
                (i>= left && i <= right)
            ){
                pagesHTML.push(i)
            }
        }
        return pagesHTML;
    }
    return (
    <ul className="pagination">
        {
            hasPrev
            ? <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li> 
            : null
        }
        {
            renderPagesHTML().map((page, index)=>
            <li className={`page-item ${page === currentPage && "active"}`}><Link className="page-link" to={formatUrl(page)}>{page}</Link></li>
            )
        }       
        {
            hasNext
            ? <li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang sau</Link></li> 
            : null
        }
    </ul>
    )
}
export default Pagination;