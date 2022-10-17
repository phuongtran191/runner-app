import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Row,
  Space,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfileAction,
  getUserInfoAction,
} from "../../../../../redux/actions";
import { TITLE } from "../../../../../constants/title";

const { Title } = Typography;

function ChageInfo() {
  document.title = TITLE.CHANGE_INFO;
  const { userInfo } = useSelector((state) => state.userReducer);
  const { responseAction } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (responseAction.edit_user.load) {
      dispatch(getUserInfoAction());
    }
  }, [responseAction.edit_user]);

  useEffect(() => {
    form.resetFields();
  }, [userInfo.data]);

  const handleChangeInfo = (values) => {
    dispatch(
      editUserProfileAction({
        id: userInfo.data.id,
        data: {
          password: values.passwordNew,
        },
      })
    );
  };

  return (
    <div>
      <Title
        level={3}
        style={{ textAlign: "center", padding: "0 0 15px", margin: 0 }}
      >
        Thay đổi mật khẩu
      </Title>
      <div>
        <Form
          form={form}
          name="change-info"
          layout="vertical"
          onFinish={(values) => handleChangeInfo(values)}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="passwordOld"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="passwordNew"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="passwordConfirm"
            rules={[
              { required: true, message: "Vui lòng xác nhận lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("passwordNew") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không đúng!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={responseAction.edit_user.load}
          >
            Thay đổi mật khẩu
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ChageInfo;
