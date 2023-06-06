import { React, useState, useEffect } from "react";
import { Col, Row, Form, Button, Input } from "antd";
import TodoItem from "./components/TodoItem";
import axios from "axios";
import ControlPanel from "./components/ControlPanel";

const URL = "http://192.168.1.69:8080/todos";

function App() {
  const [form] = Form.useForm();
  const [todoList, setTodoList] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateId, setUpdateId] = useState(0);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleCreate = async (todo) => {
    // Создать новое
    if (!updateFlag) {
      await axios.post(URL, {
        title: inputTitle,
        description: inputDescription,
        isCompleted: false,
      });
    } else {
      // Изменить
      await axios.patch(URL + "/" + updateId, {
        title: inputTitle,
        description: inputDescription,
      });
    }
    onReset();
    setUpdateId(0);
    setUpdateFlag(false);
    getTodos();
  };

  async function getTodos() {
    const response = await axios.get(URL);
    setTodoList(response.data.todoList);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Row>
        <Col span={8}>
          {}
          {todoList.map((todo) => (
            <TodoItem
              todo={todo}
              setUpdateFlag={setUpdateFlag}
              getTodos={getTodos}
              URL={URL}
              form={form}
              setUpdateId={setUpdateId}
              key={todo.id}
            />
          ))}
        </Col>
        <Col span={8}>
          <ControlPanel
            getTodos={getTodos}
            setUpdateFlag={setUpdateFlag}
            onReset={onReset}
            URL={URL}
          />
        </Col>
        <Col span={8}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginTop: 30, marginRight: 70 }}
            initialValues={{ remember: true }}
            onFinish={handleCreate}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Заголовок"
              name="title"
              initialValue={""}
              rules={[
                { required: true, message: "Пожалуйста, введите заголовок" },
              ]}
            >
              <Input
                value={inputTitle}
                onChange={(event) => {
                  setInputTitle(event.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Описание"
              name="description"
              initialValue={""}
              rules={[
                { required: true, message: "Пожалуйста, введите описание" },
              ]}
              style={{ marginTop: 10 }}
            >
              <Input
                value={inputDescription}
                onChange={(event) => {
                  setInputDescription(event.target.value);
                }}
              />
            </Form.Item>

            {!updateFlag && (
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 10, width: 200, background: "orange" }}
                >
                  Создать
                </Button>
              </Form.Item>
            )}
            {updateFlag && (
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 10, width: 200, background: "#e3dd22" }}
                >
                  Сохранить
                </Button>
              </Form.Item>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default App;
