import { getImageProduct } from "../ultils"
import { Link } from "react-router-dom"
const ProductItem = ({item}) => {
    return (
        <div className="product-item card text-center">
            <Link to={`/productdetails-${item._id }`}><img src={getImageProduct(item.image)} /></Link>
            <h4><Link to={`/productdetails-${item._id }`}>{item.name}</Link></h4>
            <p>Giá Bán: <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span></p>
        </div>
    )
}
export default ProductItem