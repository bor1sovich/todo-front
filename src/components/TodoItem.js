import React from "react";
import { Card, Button } from "antd";
import axios from "axios";

function TodoItem({ todo, setUpdateFlag, getTodos, URL, form, setUpdateId }) {
  
  const handleUpdate = () => {
    setUpdateFlag(true);
    setUpdateId(todo.id);
    form.setFieldValue("title", todo.title);
    form.setFieldValue("description", todo.description);
  };

  const deleteTodo = async () => {
    await axios.delete(URL + "/" + todo.id);
    getTodos();
  };

  return (
    <Card
      title={todo.title}
      style={{
        width: 300,
        border: "solid black 1px",
        marginBottom: 15,
        marginLeft: 70,
        marginTop: 20,
      }}
      actions={[
        <Button
          style={{ backgroundColor: "yellow" }}
          onClick={() => {
            handleUpdate();
          }}
        >
          {" "}
          Редактировать{" "}
        </Button>,
        <Button
          style={{ backgroundColor: "red", width: 135.1 }}
          onClick={() => {
            deleteTodo();
          }}
        >
          {" "}
          Удалить{" "}
        </Button>,
      ]}
    >
      <p>{todo.description}</p>
    </Card>
  );
}

export default TodoItem;
