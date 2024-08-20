import { Form, Input, Radio, DatePicker, Button, Divider, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

const UploadProduct = () => {
  const onFinish = async (values) => {
    try {
      const {
        equipmentCode,
        equipmentName,
        equipmentLocation,
        equipmentClass,
        equipmentSerieNo,
        equipmentCapacity,
        periodicControlCompany,
        remainDay,
        equipmentActive,
        equipmentTMSActive,
        periodicControlLastDate,
        periodicControlFutureDate,
        periodicMaintenanceLastDate,
        periodicMaintenanceFutureDate,
        fault,
      } = values;

      const response = await axios.post(
        "http://localhost:5000/api/equipment/newEquipment",
        {
          equipmentCode,
          equipmentName,
          equipmentLocation,
          equipmentClass,
          equipmentSerieNo,
          equipmentCapacity,
          periodicControlCompany,
          remainDay,
          equipmentActive,
          equipmentTMSActive,
          periodicControlLastDate:
            periodicControlLastDate?.format("YYYY-MM-DD"),
          periodicControlFutureDate:
            periodicControlFutureDate?.format("YYYY-MM-DD"),
          periodicMaintenanceLastDate:
            periodicMaintenanceLastDate?.format("YYYY-MM-DD"),
          periodicMaintenanceFutureDate:
            periodicMaintenanceFutureDate?.format("YYYY-MM-DD"),
          fault: fault,
        }
      );
      console.log(response);
      message.success("Ürün başarıyla kaydedildi!");
    } catch (error) {
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl border border-gray-300">
        <h1 className="text-3xl font-semibold mb-6 text-[#4158A6] border-b-2 border-gray-300 pb-2">
          Ürün Girişi
        </h1>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          onFinish={onFinish}
        >
          {/* Genel Bilgiler */}
          <div className="mb-8 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#179BAE]">
              Genel Bilgiler
            </h2>
            <Form.Item
              label="Ürün Kod"
              name="equipmentCode"
              className="text-gray-700 font-semibold text-lg"
              rules={[{ required: true, message: "Ürün kodu gerekli!" }]}
            >
              <Input placeholder="Ürün kodunu girin" />
            </Form.Item>
            <Form.Item
              label="Ad"
              name="equipmentName"
              className="text-gray-700 font-semibold text-lg"
              rules={[{ required: true, message: "Ürün adı gerekli!" }]}
            >
              <Input placeholder="Ürün adını girin" />
            </Form.Item>
            <Form.Item
              label="Yer"
              name="equipmentLocation"
              className="text-gray-700 font-semibold text-lg"
              rules={[{ required: true, message: "Ürün yeri gerekli!" }]}
            >
              <Input placeholder="Ürün yerini girin" />
            </Form.Item>
            <Form.Item
              label="Sınıf"
              name="equipmentClass"
              className="text-gray-700 font-semibold text-lg"
              rules={[{ required: true, message: "Ürün sınıfı gerekli!" }]}
            >
              <Input placeholder="Ürün sınıfını girin" />
            </Form.Item>
          </div>

          <Divider />

          {/* Teknik Detaylar */}
          <div className="mb-8 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#179BAE]">
              Teknik Detaylar
            </h2>
            <Form.Item
              label="Seri No"
              name="equipmentSerieNo"
              rules={[{ required: true, message: "Seri numarası gerekli!" }]}
              className="text-gray-700 font-semibold text-lg"
            >
              <Input placeholder="Ürün seri numarasını girin" />
            </Form.Item>
            <Form.Item
              label="Kapasite"
              name="equipmentCapacity"
              className="text-gray-700 font-semibold text-lg"
            >
              <Input placeholder="Ürün kapasitesini girin" />
            </Form.Item>
            <Form.Item
              label="Firma"
              name="periodicControlCompany"
              className="text-gray-700 font-semibold text-lg"
            >
              <Input placeholder="Firma adını girin" />
            </Form.Item>
            <Form.Item
              label="Kalan Gün"
              name="remainDay"
              className="text-gray-700 font-semibold text-lg"
            >
              <Input placeholder="Kalan gün sayısını girin" />
            </Form.Item>
          </div>

          <Divider />

          {/* Diğer Bilgiler */}
          <div className="mb-8 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#179BAE]">
              Diğer Bilgiler
            </h2>
            <Form.Item
              label="Faal mi"
              name="equipmentActive"
              className="text-gray-700 font-semibold text-lg"
            >
              <Radio.Group>
                <Radio value="Evet">Evet</Radio>
                <Radio value="Hayır">Hayır</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="TMS Kullanımında mı"
              name="equipmentTMSActive"
              className="text-gray-700 font-semibold text-lg"
            >
              <Radio.Group>
                <Radio value="Evet">Evet</Radio>
                <Radio value="Hayır">Hayır</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Periyodik Kontrol Başlangıç Tarihi"
              name="periodicControlLastDate"
              className="text-gray-700 font-semibold text-lg"
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="Periyodik Kontrol Bitiş Tarihi"
              name="periodicControlFutureDate"
              className="text-gray-700 font-semibold text-lg"
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="Periyodik Bakım Başlangıç Tarihi"
              name="periodicMaintenanceLastDate"
              className="text-gray-700 font-semibold text-lg"
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="Periyodik Bakım Bitiş Tarihi"
              name="periodicMaintenanceFutureDate"
              className="text-gray-700 font-semibold text-lg"
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="Arızalar"
              name="fault"
              className="text-gray-700 font-semibold text-lg"
            >
              <TextArea rows={4} placeholder="Arıza detaylarını girin" />
            </Form.Item>
          </div>
          <Form.Item wrapperCol={{ span: 24 }} className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              className="bg-[#4158A6] text-white hover:bg-[#4158A6]"
            >
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UploadProduct;
