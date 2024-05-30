import React, { useEffect, useState } from "react";
import { useAppSelector } from "./store/hook";
import { Divider, Flex, Space, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import "./main.scss";

const Testone = () => {
  const language = useAppSelector((state) => state.lang.lang);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [swap, setSwap] = useState<boolean>(false);
  const [shapeStyle, setShapeStyle] = useState<string[]>([
    "square",
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  function shuffleArray(array: string[]) {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Get a random index
      // Swap elements i and j
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  function arrayRotate(arr: string[], reverse: boolean) {
    if (arr.length === 0) return arr;
    if (reverse) arr.unshift(arr.pop() as string);
    else arr.push(arr.shift() as string);
    return arr;
  }

  return (
    <div>
      <h1 className="title">{t("Layout & Style")}</h1>
      <div className="center-style">
        <div className="bigbox">
          <Space>
            <div
              className="button-style"
              onClick={() => {
                var copy = JSON.parse(JSON.stringify(shapeStyle));
                var shapes = arrayRotate(copy, false);

                setShapeStyle(shapes);
              }}
            >
              <div className="tag">{t("Move shape")}</div>
              <div className="triangle-left"></div>
            </div>
            <div
              className="buttonupdown-style"
              onClick={() => {
                setSwap(!swap);
              }}
            >
              <div className="tag">{t("Move position")}</div>
              <Flex
                justify="space-around"
                align="flex-start"
                className="box-style"
              >
                <div className="triangle-up"></div>
                <div className="triangle-down"></div>
              </Flex>
            </div>
            <div
              className="button-style"
              onClick={() => {
                var copy = JSON.parse(JSON.stringify(shapeStyle));
                var shapes = arrayRotate(copy, true);

                setShapeStyle(shapes);
              }}
            >
              <div className="tag">{t("Move shape")}</div>
              <div className="triangle-right"></div>
            </div>
          </Space>
          <Divider className="divider" />
          <div
            style={{
              display: "flex",
              flexDirection: swap ? "column-reverse" : "column",
            }}
          >
            <Row justify="end">
              <Space>
                {shapeStyle.slice(0, 3).map((shape, index) => (
                  <Col>
                    <div
                      className="box-shape"
                      onClick={() => {
                        const shuffledShapes = shuffleArray(shapeStyle);
                        setShapeStyle(shuffledShapes);
                      }}
                    >
                      <div key={index} className={`shape ${shape}`}></div>
                    </div>
                  </Col>
                ))}
              </Space>
            </Row>
            <Row justify="center">
              <Space>
                {shapeStyle.slice(3, 6).map((shape, index) => (
                  <Col>
                    <div
                      className="box-shape"
                      onClick={() => {
                        const shuffledShapes = shuffleArray(shapeStyle);

                        setShapeStyle(shuffledShapes);
                      }}
                    >
                      <div key={index} className={`shape ${shape}`}></div>
                    </div>
                  </Col>
                ))}
              </Space>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testone;
