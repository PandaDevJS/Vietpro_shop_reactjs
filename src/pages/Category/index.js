import React, { useEffect } from "react"
import { getProductsCategories, getCategory } from "../../services/Api"
import ProductItem from "../../shared/components/product-item"
import { useParams } from "react-router-dom"
const Category = () => {
  const [category, setCategory] = React.useState(null)
  const [products, setProducts] = React.useState([])
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    // Get Category 
    getCategory(id, {}).then(({data})=>{
      return  setCategory(data.data);
    })
    // Get Producst By Category ID
    getProductsCategories(id, {}).then(({ data }) => {
      // console.log(data)
      return setProducts(data.data.docs)
    })
  }, [id])
  return (
    <>
      <div>
        {/*	List Product	*/}
        <div className="products">
          <h3>{category?.name} (hiện có {products.length} sản phẩm)</h3>
          <div className="product-list card-deck">
            {
              products.map((value, index) =>
                // truyen gia tri item sang file product-item de hien thi 
                <ProductItem item={value} />
              )
            }
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
          </ul>
        </div>
      </div>

    </>
  )
}
export default Category