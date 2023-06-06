import React from "react";
import { Button, Space } from "antd";
import axios from "axios";

function ControlPanel({ getTodos, setUpdateFlag, URL, onReset }) {
  const handleDelete = async () => {
    await axios.delete(URL);
    getTodos();
  };

  const handleCreate = () => {
    setUpdateFlag(false);
    onReset();
  };
  return (
    <Space direction="vertical" style={{ marginTop: 30 }}>
      <Button
        type="primary"
        style={{ width: 200, background: "green" }}
        onClick={() => {
          getTodos();
        }}
      >
        Обновить
      </Button>
      <Button
        type="primary"
        style={{ width: 200, background: "orange" }}
        onClick={() => {
          handleCreate();
        }}
      >
        Создать
      </Button>
      <Button
        type="primary"
        style={{ width: 200, background: "red" }}
        onClick={() => {
          handleDelete();
        }}
      >
        Удалить всё
      </Button>
    </Space>
  );
}

export default ControlPanel;
