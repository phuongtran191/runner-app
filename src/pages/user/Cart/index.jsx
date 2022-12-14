import { useEffect } from "react";
import { Row, Col, Input, Button, List, notification } from "antd";
import * as Icons from "@ant-design/icons";
import empty from "../../../assets/images/empty_cart.png";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import history from "../../../utils/history";

import {
  minusItemCountAction,
  plusItemCountAction,
  deleteCartItemAction,
} from "../../../redux/actions";

import * as Style from "./styles";
import { Container } from "../../../styles/styles";
import { TITLE } from "../../../constants/title";
import Hero from "../../../components/Hero";

function CartPage() {
  document.title = TITLE.CART;
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  let totalPrice = 0;
  let totalCount = 0;
  const dispatch = useDispatch();

  useEffect(() => {
    const img = new Image();
    img.src = empty;
  }, []);

  function handlePlusCount(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count:
        newCartData[index].count === newCartData[index].quantity
          ? newCartData[index].count
          : newCartData[index].count + 1,
    });
    dispatch(
      plusItemCountAction({
        userId: userInfo.data.id,
        data: { carts: newCartData },
      })
    );
  }

  function handleMinusCount(index) {
    if (cartList.data[index].count === 1) return null;
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count:
        newCartData[index].count === 1
          ? newCartData[index].count
          : newCartData[index].count - 1,
    });
    dispatch(
      minusItemCountAction({
        userId: userInfo.data.id,
        data: { carts: newCartData },
      })
    );
  }

  function handleDeleteItem(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1);
    dispatch(
      deleteCartItemAction({
        userId: userInfo.data.id,
        data: { carts: newCartData },
      })
    );
  }

  function handleCheckout() {
    if (!userInfo.data.id) {
      notification.warn({
        message: "B???n ch??a ????ng nh???p",
      });
    } else {
      history.push("/checkout");
    }
  }
  function renderCartList(params) {
    return cartList?.data?.map((cartItem, cartIndex) => {
      totalCount = cartItem.option.id
        ? totalCount + cartItem.count
        : totalCount + cartItem.count;
      totalPrice = cartItem.option.id
        ? totalPrice + (cartItem.price + cartItem.option.price) * cartItem.count
        : totalPrice + cartItem.price * cartItem.count;
      return (
        <Style.CartItem>
          <div className="cart-image">
            <img src={cartItem.image} alt="" />
          </div>
          <div className="cart-content">
            <div className="cart-content-box">
              <h3>{cartItem.name}</h3>
              <span>
                {(
                  cartItem.price +
                  (cartItem.option.id ? cartItem.option.price : 0)
                ).toLocaleString() + "???"}
              </span>
            </div>
            <div className="cart-info-list">
              <div className="cart-info-item">
                <span className="cart-info-tag">Th????ng hi???u: </span>
                <span className="cart-info-text">{cartItem.category}</span>
              </div>
              <div className="cart-info-item">
                <span className="cart-info-tag">Lo???i gi??y: </span>
                <span className="cart-info-text">{cartItem.type}</span>
              </div>
              {cartItem.option.id && (
                <div className="cart-info-item">
                  <span className="cart-info-tag">Size: </span>
                  <span className="cart-info-text">{cartItem.option.size}</span>
                </div>
              )}
            </div>
            <Input.Group compact className="quantity">
              <Button
                icon={<MinusOutlined />}
                onClick={() => handleMinusCount(cartIndex)}
              />
              <Input
                value={cartItem.count}
                readOnly
                style={{ width: 40, textAlign: "center" }}
              />
              <Button
                icon={<PlusOutlined />}
                onClick={() => handlePlusCount(cartIndex)}
              />
            </Input.Group>
          </div>

          <div className="cart-btn">
            <Button
              onClick={() => handleDeleteItem(cartIndex)}
              icon={<Icons.DeleteOutlined />}
              type="text"
              danger
            />
          </div>
        </Style.CartItem>
      );
    });
  }

  return (
    <Style.CartPage>
      <Hero title="Gi??? h??ng" />
      {cartList.data.length === 0 ? (
        <Style.Empty>
          <div>
            <img src={empty} alt="" />
            <h2>Gi??? h??ng tr???ng</h2>

            <Button
              onClick={() => history.push("/product")}
              type="primary"
              size="large"
            >
              Mua Ngay
            </Button>
          </div>
        </Style.Empty>
      ) : (
        <Container>
          <div className="cart">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <Style.CartList>{renderCartList()}</Style.CartList>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <div className="cart-right">
                  <List
                    bordered
                    header={
                      <strong style={{ fontSize: 16 }}>
                        Th???ng k?? gi??? h??ng
                      </strong>
                    }
                  >
                    <List.Item>
                      <div className="list-item">
                        <span>
                          {cartList.data.length > 0
                            ? totalCount + " s???n ph???m"
                            : 0 + " s???n ph???m"}
                        </span>
                        <span>{totalPrice.toLocaleString() + "???"}</span>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div className="list-item">
                        <span>Ph?? v???n chuy???n</span>
                        <span>Mi???n ph??</span>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div className="list-item">
                        <strong>T???ng ti???n</strong>
                        <strong>{totalPrice.toLocaleString() + "???"}</strong>
                      </div>
                    </List.Item>
                  </List>
                  <Button
                    onClick={() => handleCheckout()}
                    type="primary"
                    block
                    size="large"
                  >
                    Thanh To??n
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </Style.CartPage>
  );
}

export default CartPage;
