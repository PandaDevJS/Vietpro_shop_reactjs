import { getImageProduct } from "../ultils"
const ProductItem = ({item}) => {
    return (
        <div className="product-item card text-center">
            <a href="#"><img src={getImageProduct(item.image)} /></a>
            <h4><a href="#">{item.name}</a></h4>
            <p>Giá Bán: <span>{item.price}đ</span></p>
        </div>
    )
}
export default ProductItem