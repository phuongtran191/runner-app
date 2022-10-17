import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Row, Col, Button, Card } from "antd";
import history from "../../../../../utils/history";
import { TITLE } from "../../../../../constants/title";
import empty from "../../../../../assets/images/empty_cart.png";

import * as Style from "./style";

const { Meta } = Card;

function Wishlist() {
  document.title = TITLE.WISH_LIST;
  const { wishList } = useSelector((state) => state.wishlistReducer);

  useEffect(() => {
    const img = new Image();
    img.src = empty;
  }, []);

  function renderWishList(params) {
    return wishList?.data?.map((wishItem, wishIndex) => {
      return (
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={6}
          key={`${wishItem.name}-${wishIndex}`}
        >
          <Card
            style={{ cursor: "pointer" }}
            size="small"
            cover={<img alt="example" src={wishItem.image} />}
            onClick={() =>
              history.push(`/product/${wishItem.name}-${wishItem.productId}`)
            }
          >
            <Meta title={wishItem.name} description={wishItem.category} />
          </Card>
        </Col>
      );
    });
  }

  return (
    <>
      {wishList.data.length === 0 ? (
        <Style.Empty>
          <h2>Danh sách yêu thích trống</h2>
          <img src={empty} alt="" />
          <div>
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
        <Style.WishPage>
          <h2 style={{ textAlign: "center", marginBottom: 30 }}>
            Danh sách yêu thích
          </h2>
          <Row gutter={[16, 16]}>{renderWishList()}</Row>
        </Style.WishPage>
      )}
    </>
  );
}

export default Wishlist;
