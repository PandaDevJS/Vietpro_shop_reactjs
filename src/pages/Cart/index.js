import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getImageProduct } from "../../shared/ultils"
import { UPDATE_CART, DELETE_ITEM_CART } from "../../shared/constants/action-type";
import { order } from "../../services/Api";
import {useNavigate } from "react-router-dom";
const Cart = () => {
  const [inputs, setInputs] = React.useState([]);
  const carts = useSelector(({ Cart }) => {
    return Cart.items;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onUpdateInput = (e, id) => {
    const qty = parseInt(e.target.value);
    // mchuyen du lieu từ dạng string sang integer 
    if (qty <= 0) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng?");
      return isConfirm
        ? dispatch({
          type: DELETE_ITEM_CART,
          payload: {
            id,
          }
        })
        : dispatch({
          type: UPDATE_CART,
          payload: {
            id,
            qty: 1,
          }
        })
    }
    dispatch({
      type: UPDATE_CART,
      payload: {
        id,
        qty
      }
    });
  };
  const onDeleteInput = (e, id) => {
    dispatch({
      type: DELETE_ITEM_CART,
      payload: {
        id,
      }
    })

  };
  const onChangeInput = (e)=>{
    const {name, value} = e.target;
    // console.log(inputs);
    return setInputs({...inputs, [name]: value});
  }
  const onClickOder = (e)=>{
    e.preventDefault();
    const items = carts.map((item, index)=>({prd_id: item._id, qty: item.qty}));
    return order({
      items,
      ...inputs
    }).then(({data})=>{
      if(data.status === "success"){
        navigate("/Success");
      }
      // console.log(data);
    });
  }
  return (
    <>
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {
            carts?.map((item, index) =>
              <div className="cart-item row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img src={getImageProduct(item.image)} />
                  <h4>{item.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input onChange={(e) => onUpdateInput(e, item._id)} type="number" id="quantity" className="form-control form-blue quantity" value={item.qty} />
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.qty * item.price)}</b>
                  <a onClick={(e) => onDeleteInput(e, item._id)} href="#">Xóa</a>
                </div>
              </div>
            )
          }
          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              {/* <button id="update-cart" className="btn btn-success" type="submit" name="sbm">Cập nhật giỏ hàng</button>	 */}
            </div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(carts?.reduce((total, item) => total + item.qty * item.price, 0))}</b></div>
          </div>
        </form>
      </div>
      {/*	Customer Info	*/}
      <div id="customer">
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
              <input 
              onChange={onChangeInput}
              placeholder="Họ và tên (bắt buộc)" 
              type="text" 
              name="name" 
              className="form-control" 
              required
              value={inputs?.name} />
            </div>
            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
              <input 
              onChange={onChangeInput}
              placeholder="Số điện thoại (bắt buộc)" 
              type="text" 
              name="phone" 
              className="form-control" 
              required
              value={inputs?.phone} />
            </div>
            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
              <input 
              onChange={onChangeInput}
              placeholder="Email (bắt buộc)" 
              type="text" 
              name="email" 
              className="form-control" 
              required
              value={inputs?.email} />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input 
              onChange={onChangeInput}
              placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" 
              type="text" 
              name="address" 
              className="form-control" 
              required
              value={inputs?.address} />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={onClickOder} href="#">
              <b>Mua ngay</b>
              <span>Giao hàng tận nơi siêu tốc</span>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Trả góp Online</b>
              <span>Vui lòng call (+84) 0988 550 553</span>
            </a>
          </div>
        </div>
      </div>
      {/*	End Customer Info	*/}

      {/*	End Cart	*/}

    </>
  )
}
export default Cart