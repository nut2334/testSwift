import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hook";
import { useTranslation } from "react-i18next";
import {
  DatePicker,
  Input,
  Radio,
  Button,
  Form,
  Select,
  Space,
  Table,
} from "antd";
import "./main.scss";
import Tabledata from "./table";
import { insertData, DataState } from "./store/formReducer";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Testthree = () => {
  const language = useAppSelector((state) => state.lang.lang);
  const edit = useAppSelector((state) => state.data.current);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  useEffect(() => {
    if (Object.keys(edit).length === 0) return;
    console.log(edit.Birthday);
    console.log(edit.Birthday.split('"'));
    console.log(new Date(edit.Birthday.split('"')[1]));

    form.setFieldsValue({
      ...edit,
      Birthday: dayjs(new Date(edit.Birthday.split('"')[1])),
    });
  }, [edit]);

  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        break;
      default:
    }
  };

  const onFinish = (values: DataState) => {
    var data = {
      ...values,
      Birthday: JSON.stringify(values.Birthday),
      key: edit.key,
    };
    console.log(data);
    dispatch(insertData(data));
    alert("Save Success");
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: "Hello world!", gender: "male" });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }} className="flag" value={edit.prefix}>
        <Option value="+66" className="option">
          <img src="https://purecatamphetamine.github.io/country-flag-icons/3x2/TH.svg" />
          +66
        </Option>
        <Option value="+1" className="option">
          <img src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" />
          +1
        </Option>
        <Option value="+23" className="option">
          <img src="https://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg" />
          +23
        </Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <h1 className="title">{t("Form & Table")}</h1>
      <NavLink to="/" className="nav-link">
        <Button
          style={{
            position: "absolute",
            marginTop: "10px",
            right: "10px",
          }}
        >
          {t("Home")}
        </Button>
      </NavLink>
      <div className="center-style">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="form-style"
          labelAlign="left"
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Form.Item
            name="Title"
            label={t("Title")}
            rules={[
              { required: true, message: t("Please input your") + t("Title") },
            ]}
          >
            <Select
              placeholder={t("Title")}
              onChange={onGenderChange}
              allowClear
            >
              <Option value="Mr.">{t("Mr.")}</Option>
              <Option value="Mrs.">{t("Mrs.")}</Option>
              <Option value="Ms.">{t("Ms.")}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{ sm: 24 }}
            name="Firstname"
            label={t("Firstname")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Firstname"),
              },
            ]}
          >
            <Input style={{ width: "100%" }} value={edit.Firstname} />
          </Form.Item>
          <Form.Item
            name="Lastname"
            label={t("Lastname")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Lastname"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Birthday"
            label={t("Birthday")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Birthday"),
              },
            ]}
          >
            <DatePicker format="MM/DD/YYYY" placeholder={t("mm/dd/yyyy")} />
          </Form.Item>
          <Form.Item
            name="Nationality"
            label={t("Nationality")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Nationality"),
              },
            ]}
          >
            <Select placeholder={t("--Please Select--")} allowClear>
              <Option value="Thai">{t("Thai")}</Option>
              <Option value="French">{t("French")}</Option>
              <Option value="American">{t("American")}</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Citizen ID" label={t("Citizen ID")}>
            <Input />
          </Form.Item>
          <Form.Item
            name="Gender"
            label={t("Gender")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Gender"),
              },
            ]}
          >
            <Radio.Group>
              <Radio value="Male">{t("Male")}</Radio>
              <Radio value="Female">{t("Female")}</Radio>
              <Radio value="Unisex">{t("Unisex")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="Mobile Phone"
            label={t("Mobile Phone")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Mobile Phone"),
              },
            ]}
          >
            <Input addonBefore={prefixSelector} />
          </Form.Item>
          <Form.Item name="Passport No" label={t("Passport No")}>
            <Input />
          </Form.Item>
          <Form.Item
            name="Expected Salary"
            label={t("Expected Salary")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Expected Salary"),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button htmlType="submit">{t("SUBMIT")}</Button>
              <Button htmlType="button" onClick={onReset}>
                {t("RESET")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Tabledata />
    </div>
  );
};

export default Testthree;
