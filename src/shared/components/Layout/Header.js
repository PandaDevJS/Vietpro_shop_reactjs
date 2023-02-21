import React from "react";
import { useSelector } from "react-redux";
import { Link , useNavigate} from "react-router-dom"

const Header = () => {
    const [keyword, setKeyword] = React.useState(null);
    const navigate = useNavigate();
    const onChange =(e)=>{
        return setKeyword(e.target.value);
    }
    const onClick = (e)=>{
        e.preventDefault();
        return navigate(`/search?keyword=${keyword}`)
    }
   const totalCart = useSelector(({Cart})=>{
    return Cart.items.reduce((total, item)=>total +=item.qty, 0 )
   });


    return (
        <div id="header">
            <div className="container">
                <div className="row">
                    <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
                        <h1><Link  to="/"><img className="img-fluid" src="images/logo.png" /></Link></h1>
                    </div>
                    <div id="search" className="col-lg-6 col-md-6 col-sm-12">
                        <form className="form-inline">
                            <input 
                            onChange={onChange} 
                            className="form-control mt-3" 
                            type="search" 
                            placeholder="Tìm kiếm" 
                            aria-label="Search" 
                            value={keyword} />
                            <button 
                            onClick={onClick} 
                            className="btn btn-danger mt-3" 
                            type="submit">Tìm kiếm</button>
                        </form>
                    </div>
                    <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
                        <Link className="mt-4 mr-2" to="/cart">giỏ hàng</Link><span className="mt-3">
                            {totalCart}
                        </span>
                    </div>  
                </div>
            </div>
            <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
                <span className="navbar-toggler-icon" />
            </button>
        </div>
    )
}
export default Header