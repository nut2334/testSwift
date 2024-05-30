import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hook";
import { useTranslation } from "react-i18next";
import { DatePicker, Input, Radio, Button, Form, Select } from "antd";
import "./main.scss";
import Tabledata from "./table";
import { insertData, DataState, resetCurrent } from "./store/formReducer";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { useWatch } from "antd/es/form/Form";

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

  const first = useWatch(["Citizen ID", "first"], form);
  const second = useWatch(["Citizen ID", "second"], form);
  const third = useWatch(["Citizen ID", "third"], form);
  const fourth = useWatch(["Citizen ID", "fourth"], form);
  const fifth = useWatch(["Citizen ID", "fifth"], form);

  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  useEffect(() => {
    if (Object.keys(edit).length === 0) return;

    form.setFieldsValue({
      ...edit,
      Birthday: dayjs(new Date(edit.Birthday.split('"')[1])),
    });
  }, [edit]);

  const onFinish = (values: DataState) => {
    var data = {
      ...values,
      Birthday: JSON.stringify(values.Birthday),
      key: edit.key,
    };

    dispatch(insertData(data));
    alert("Save Success");
    onReset();
  };

  const onReset = () => {
    form.resetFields();
    dispatch(resetCurrent());
  };

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
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Form.Item
            style={{ marginRight: "10px", width: "calc(20% - 10px)" }}
            name="Title"
            label={t("Title")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Title"),
              },
            ]}
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
          >
            <Select placeholder={t("Title")} allowClear>
              <Option value="Mr.">{t("Mr.")}</Option>
              <Option value="Mrs.">{t("Mrs.")}</Option>
              <Option value="Ms.">{t("Ms.")}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(40% - 10px)",
              marginRight: "10px",
            }}
            name="Firstname"
            label={t("Firstname")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Firstname"),
              },
            ]}
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
          >
            <Input style={{ width: "100%" }} value={edit.Firstname} />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: "100%" }}
            name="Lastname"
            label={t("Lastname")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Lastname"),
              },
            ]}
            labelCol={{ span: "100%" }}
            style={{ width: "calc(40% - 10px)" }}
          >
            <Input style={{ width: "100%" }} />
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
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{ marginRight: "10px" }}
          >
            <DatePicker format="MM-DD-YYYY" placeholder={t("mm/dd/yyyy")} />
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
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{ width: "calc(50% - 10px)", marginRight: "10px" }}
          >
            <Select placeholder={t("--Please Select--")} allowClear>
              <Option value="Thai">{t("Thai")}</Option>
              <Option value="French">{t("French")}</Option>
              <Option value="American">{t("American")}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Citizen ID")}
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{ width: "100%", marginRight: "10px" }}
          >
            <Form.Item
              name={["Citizen ID", "first"]}
              noStyle
              rules={[
                {
                  required: second || third || fourth || fifth ? true : false,
                  message:
                    t("Please input your") + t("Citizen ID") + " " + t("first"),
                },
              ]}
            >
              <Input
                style={{
                  width: "calc(10% - 10px)",
                  marginRight: "10px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
                maxLength={1}
              />
            </Form.Item>
            -
            <Form.Item
              name={["Citizen ID", "second"]}
              noStyle
              rules={[
                {
                  required: first || third || fourth || fifth ? true : false,
                  message:
                    t("Please input your") +
                    t("Citizen ID") +
                    " " +
                    t("second"),
                },
              ]}
            >
              <Input
                style={{
                  width: "calc(20% - 10px)",
                  marginRight: "10px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
                maxLength={4}
              />
            </Form.Item>
            -
            <Form.Item
              name={["Citizen ID", "third"]}
              noStyle
              rules={[
                {
                  required: first || second || fourth || fifth ? true : false,
                  message:
                    t("Please input your") + t("Citizen ID") + " " + t("third"),
                },
              ]}
            >
              <Input
                style={{
                  width: "calc(20% - 10px)",
                  marginRight: "10px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
                maxLength={5}
              />
            </Form.Item>
            -
            <Form.Item
              name={["Citizen ID", "fourth"]}
              noStyle
              rules={[
                {
                  required: first || second || third || fifth ? true : false,
                  message:
                    t("Please input your") +
                    t("Citizen ID") +
                    " " +
                    t("fourth"),
                },
              ]}
            >
              <Input
                style={{
                  width: "calc(15% - 10px)",
                  marginRight: "10px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
                maxLength={2}
              />
            </Form.Item>
            -
            <Form.Item
              name={["Citizen ID", "fifth"]}
              noStyle
              rules={[
                {
                  required: first || second || third || fourth ? true : false,
                  message:
                    t("Please input your") + t("Citizen ID") + " " + t("fifth"),
                },
              ]}
            >
              <Input
                style={{
                  width: "calc(10% - 10px)",
                  marginRight: "10px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
                maxLength={1}
              />
            </Form.Item>
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
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{ width: "100%", marginRight: "10px" }}
          >
            <Radio.Group>
              <Radio value="Male">{t("Male")}</Radio>
              <Radio value="Female">{t("Female")}</Radio>
              <Radio value="Unisex">{t("Unisex")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="prefix"
            label={t("Mobile Phone")}
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{ width: "30%", marginRight: "10px" }}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Mobile Phone"),
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              className="flag"
              value={edit.prefix}
            >
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
          -
          <Form.Item
            name="Mobile Phone"
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{ width: "35%", paddingLeft: "10px", marginRight: "10px" }}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Mobile Phone"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Passport No"
            label={t("Passport No")}
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{ width: "40%", marginRight: "40%" }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{ width: "40%" }}
            name="Expected Salary"
            label={t("Expected Salary")}
            rules={[
              {
                required: true,
                message: t("Please input your") + t("Expected Salary"),
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
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
          <Form.Item
            {...tailLayout}
            wrapperCol={{ span: "100%" }}
            labelCol={{ span: "100%" }}
            style={{
              width: "60%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-around",

                marginLeft: "25%",
              }}
            >
              <Button htmlType="submit">{t("SUBMIT")}</Button>
              <Button htmlType="button" onClick={onReset}>
                {t("RESET")}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Tabledata />
    </div>
  );
};

export default Testthree;
