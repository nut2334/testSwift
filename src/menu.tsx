import React, { useEffect } from "react";
import { Card, Flex, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "./store/hook";
import "./main.scss";

const Menu = () => {
  const language = useAppSelector((state) => state.lang.lang);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Flex justify="center" align="center" className="box-style">
      <Space>
        <NavLink to={`/Test1`} className="nav-link">
          <Card title={t("Test 1")} bordered={false} className="card">
            <p>{t("Layout & Style")}</p>
          </Card>
        </NavLink>
        <Card title={t("Test 2")} bordered={false} className="card">
          <p>{t("Connect API")}</p>
        </Card>
        <NavLink to={`/Test3`} className="nav-link">
          <Card title={t("Test 3")} bordered={false} className="card">
            <p>{t("Form & Table")}</p>
          </Card>
        </NavLink>
      </Space>
    </Flex>
  );
};

export default Menu;
