import React, { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Divider,
  Empty,
  List,
  Spin,
  Alert,
  message
} from "antd";
import * as apiService from "../services/apiService";

import "./home.scss";

const { Text, Paragraph } = Typography;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const [generateResult, setGenerateResult] = useState({});
  const [showReport, setShowReport] = useState(false);

  /**
   * Handler when generate button click
   */
  const handleGenerate = async () => {
    setGenerateResult({});
    setLoading(true);
    
    /* Send request to generate random file */
    let { status, data } = await apiService.generate();
    
    if (status === "success") {
      setGenerateResult(data);
      setShowReport(false);
    } else {
      message.warning('Sorry. Something went wrong. Please try again later.');
    }
    setLoading(false);
  };

  /**
   * Handler when report button click
   */
  const handleReports = () => {
    setReportLoading(true);
    setTimeout(() => {
      setReportLoading(false);
      setShowReport(true);
    }, 1000);
  };

  return (
    <div className="home">
      <Card
        title="Generator"
        style={{ width: 450, padding: "0 20px" }}
        size="small"
      >
        {generateResult.downloadLink && (
          <Alert
            message={`Generating success. You can re-generate by click the "Generate" Button.`}
            type="success"
            showIcon
            style={{ marginBottom: 10 }}
            closable
          />
        )}
        {/* Generate Section Start */}
        <div className="generate-section">
          <Button
            size="large"
            onClick={handleGenerate}
            loading={loading}
            style={{ width: 150 }}
          >
            Generate
          </Button>
          {generateResult.downloadLink && (
            <a
              href={generateResult.downloadLink}
              className="download-link"
              download="Generate.txt"
            >
              New Objects File Created
            </a>
          )}
        </div>
        {/* Report Section Start */}
        <Divider plain>Reports</Divider>
        <div className="report-section">
          <Button size="large" onClick={handleReports} style={{ width: 150 }}>
            Report
          </Button>
          {showReport && generateResult.preview ? (
            <div className="report-content">
              <Paragraph>
                <pre>{generateResult.preview}</pre>
                <List>
                  <List.Item className="report-data-item">
                    <Text>Alphabetical String: </Text>{" "}
                    <Text strong>{generateResult.alpha}</Text>
                  </List.Item>
                  <List.Item className="report-data-item">
                    <Text>Real Numbers: </Text>{" "}
                    <Text strong>{generateResult.real}</Text>
                  </List.Item>
                  <List.Item className="report-data-item">
                    <Text>Integers: </Text>{" "}
                    <Text strong>{generateResult.integer}</Text>
                  </List.Item>
                  <List.Item className="report-data-item">
                    <Text>Alphanumerics: </Text>{" "}
                    <Text strong>{generateResult.alphanu}</Text>
                  </List.Item>
                </List>
              </Paragraph>
            </div>
          ) : (
            <Spin tip="Loading..." spinning={reportLoading}>
              <Empty />
            </Spin>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Home;
