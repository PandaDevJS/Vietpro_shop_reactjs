import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/action-type";

import { createCommentProduct, getProduct } from "../../services/Api"
import { getImageProduct } from "../../shared/ultils"
import { getCommentsProduct } from "../../services/Api"
import { useParams, useNavigate } from "react-router-dom"
import moment from "moment"

const ProductDetails = () => {
  const [product, setProduct] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [data, setData] = React.useState({});
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    return setData({ ...data, [name]: value });
  }
  const clickSubmitComment = (e) => {
    e.preventDefault()
    createCommentProduct(id, data, {}).then(({ data }) => {
      // console.log(data);
      if (data.status === "success") {
        getComments(id);
        return setData({});
      }
    });
  }
  const getComments = (id) => {
    getCommentsProduct(id, {}).then(({ data }) => {
      // console.log(data.data.docs);
      return setComments(data.data.docs)
    });
  }
  const addToCart = (type) => {
    if (product) {
      const { _id, name, image, price } = product;
      dispatch({
        type: ADD_TO_CART,
        payload: {
          _id,
          name,
          image,
          price,
          qty: 1
        },
      });

    }
    if(type === "buy-now"){
      navigate("/cart");
    }
  }
  useEffect(() => {
    //  Getproduct
    getProduct(id, {}).then(({ data }) => {

      return setProduct(data.data);
    });
    getComments(id);

  }, [id])



  return (
    <>
      <div>
        {/*	List Product	*/}
        <div id="product">
          <div id="product-head" className="row">
            <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
              <img src={getImageProduct(product.image)} />
            </div>
            <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
              <h1>{product.name}</h1>
              <ul>
                <li><span>B???o h??nh:</span>{product.warranty}</li>
                <li><span>??i k??m:</span>{product.accessories}</li>
                <li><span>T??nh tr???ng:</span>{product.status}</li>
                <li><span>Khuy???n M???i:</span>{product.promotion}</li>
                <li id="price">Gi?? B??n(ch??a bao g???m VAT)</li>
                <li id="price-number">{product.price}??</li>
                {
                  product?.is_stock
                    ? <li id="status">C??n h??ng</li>
                    : <li className="text-danger" id="status">H???t h??ng</li>
                }
              </ul>

              <div id="add-cart">
                <button onClick={() => addToCart("buy-now")} className="btn btn-warning mr-2">
                  Mua ngay
                </button>
                <button onClick={addToCart} className="btn btn-info">
                  Th??m v??o gi??? h??ng
                </button>
              </div>


            </div>
          </div>
          <div id="product-body" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>????nh gi?? v??? iPhone X 64GB</h3>
              <p>
                M??n h??nh OLED c?? h??? tr??? HDR l?? m???t s??? n??ng c???p m???i c???a Apple thay v?? m??n h??nh LCD v???i IPS ???????c t??m th???y tr??n iPhone 8 v?? iPhone 8 Plus ??em ?????n t??? l??? t????ng ph???n cao h??n ????ng k??? l?? 1.000.000: 1, so v???i 1.300: 1 ( iPhone 8 Plus ) v?? 1.400: 1 ( iPhone 8 ).
              </p>
              <p>
                M??n h??nh OLED m?? Apple ??ang g???i m??n h??nh Super Retina HD c?? th??? hi???n th??? t??ng m??u ??en s??u h??n. ??i???u n??y ???????c th???c hi???n b???ng c??ch t???t c??c ??i???m ???nh ???????c hi???n th??? m??u ??en c??n m??n h??nh LCD th??ng th?????ng, nh???ng ??i???m ???nh ???? ???????c gi??? l???i. Kh??ng nh???ng th???, m??n h??nh OLED c?? th??? ti???t ki???m pin ????ng k???.
              </p>
              <p>
                C??? ba m???u iPhone m???i ?????u c?? camera sau 12MP v?? 7MP cho camera tr?????c, nh??ng ch??? iPhone X v?? iPhone 8 Plus c?? th??m m???t c???m bi???n cho camera sau. Camera k??p tr??n m??y nh?? th?????ng l???: m???t g??c r???ng v?? m???t tele. V???y Apple ???? t??ch h???p nh???ng g?? v??o camera c???a iPhone X?
              </p>
              <p>
                Ch???ng rung quang h???c (OIS) l?? m???t trong nh???ng t??nh n??ng ???????c nhi???u h??ng ??i???n tho???i tr??n th??? gi???i ??p d???ng. ?????i v???i iPhone X, h??ng t??ch h???p ch???ng rung n??y cho c??? hai camera, kh??ng nh?? IPhone 8 Plus ch??? c?? OIS tr??n camera g??c r???ng n??n camera tele v???n rung v?? ch???t l?????ng b???c h??nh kh??ng ?????m b???o.
              </p>
              <p>
                Th??? hai, ???ng k??nh tele c???a iPhone 8 Plus c?? kh???u ????? f / 2.8, trong khi iPhone X c?? ???ng k??nh tele f / 2.2, t???o ra m???t ???????ng cong nh??? v?? c?? th??? ch???p thi???u s??ng t???t h??n v???i ???ng k??nh tele tr??n iPhone X.
              </p>
              <p>
                Portrait Mode l?? t??nh n??ng ch???p ???nh x??a ph??ng tr?????c ????y ch??? c?? v???i camera sau c???a iPhone 7 Plus, hi???n ???????c t??ch h???p tr??n c??? iPhone 8 Plus v?? iPhone X. Tuy nhi??n, nh??? s???c m???nh c???a c???m bi???n tr??n m???t tr?????c c???a iPhone X, Camera TrueDepth c??ng c?? th??? ch???p v???i Potrait mode.
              </p>
            </div>
          </div>
          {/*	Comment	*/}
          <div id="comment" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>B??nh lu???n s???n ph???m</h3>
              <form method="post">
                <div className="form-group">
                  <label>T??n:</label>
                  <input
                    onChange={onChangeInput}
                    value={data.name || ""}
                    name="name"
                    required type="text"
                    className="form-control" />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    onChange={onChangeInput}
                    value={data.email || ""}
                    name="email"
                    required type="email"
                    className="form-control"
                    id="pwd" />
                </div>
                <div className="form-group">
                  <label>N???i dung:</label>
                  <textarea
                    onChange={onChangeInput}
                    value={data.content || ""}
                    name="content"
                    required rows={8}
                    className="form-control"
                    defaultValue={""} />
                </div>
                <button onClick={clickSubmitComment} type="submit" name="sbm" className="btn btn-primary">G???i</button>
              </form>
            </div>
          </div>
          {/*	End Comment	*/}
          {/*	Comments List	*/}
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {
                comments?.map((comment, index) => {
                  const m = moment(comment.createAt);
                  return (
                    <div className="comment-item">
                      <ul>
                        <li><b>{comment.name}</b></li>
                        <li>{m.fromNow()}</li>
                        <li>
                          <p>{comment.content}.</p>
                        </li>
                      </ul>
                    </div>
                  )
                })
              }

            </div>
          </div>
          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}
        <div id="pagination">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Trang tr?????c</a></li>
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
export default ProductDetails