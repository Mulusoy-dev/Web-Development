import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const UploadProduct = () => {
  // const [componentDisabled, setComponentDisabled] = useState(false);

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 4 }}
        layout="horizontal"
        // disabled={componentDisabled}
        style={{ maxWidth: 800, padding: "20px" }}
      >
        <Form.Item label="Ürün Kodu" className="w-screen">
          <Input />
        </Form.Item>
        <Form.Item label="Adı" className="w-screen">
          <Input />
        </Form.Item>
        <Form.Item label="Yeri" className="w-screen">
          <Input />
        </Form.Item>
        <Form.Item label="Seri No" className="w-screen">
          <Input />
        </Form.Item>
        <Form.Item label="Kapasite" className="w-screen">
          <Input />
        </Form.Item>
        <Form.Item label="Firma" className="w-screen">
          <Input />
        </Form.Item>
        <Form.Item label="Kalan Gün" className="w-screen">
          <Input />
        </Form.Item>
        <Form.Item label="Faal mi" className="w-screen">
          <Radio.Group>
            <Radio value="Evet">Evet</Radio>
            <Radio value="Hayır">Hayır</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="TMS Kullanımında mı" className="w-screen">
          <Radio.Group>
            <Radio value="Evet">Evet</Radio>
            <Radio value="Hayır">Hayır</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Periyodik Kontrol" className="w-screen">
          <RangePicker />
        </Form.Item>
        <Form.Item label="Periyodik Bakım" className="w-screen">
          <RangePicker />
        </Form.Item>
        <Form.Item label="Arızalar" className="w-screen">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadProduct;
