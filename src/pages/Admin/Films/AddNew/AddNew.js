import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik'
import moment from 'moment'
import './AddNew.scss';
import { useDispatch } from 'react-redux';
import { layThongTinPhimAction, themPhimAction } from '../../../../redux/actions/QuanLyPhimAction';
import { useHistory } from 'react-router-dom';
import { GROUPID } from '../../../../utils/settings/config';

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      console.log("value", values);
      values.maNhom = GROUPID;

      // tạo đối tượng formData để đưa data user nhập về backend
      let formData = new FormData();
      console.log("formData", formData);
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append(key, values.hinhAnh, values.hinhAnh.name);
        }
      }
      console.log('formData', formData.get('hinhAnh'));

      // Gọi API them phim
      dispatch(themPhimAction(formData)); 
      // Goi API de load lai phim array
      dispatch(layThongTinPhimAction());
      // chuyen huong ve trang films
      history.push("/admin/films");
    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    //return();
  }

  const handleChangeSwitch = (name) => {

    return (value) => {
      formik.setFieldValue(name, value);
      //return();
    }
  }

  const handleChangeFile = (e) => {
    // lấy file đầu tiên ra từ e
    let firstFile = e.target.files[0];
    console.log("firstFile", firstFile);

    if (firstFile.type === "image/png" || firstFile.type === "image/jpeg" || firstFile.type === "image/jpg" || firstFile.type === "image/gif" || firstFile.type === "image/psd") {
      formik.setFieldValue("hinhAnh", firstFile);

      // tạo đối tượng reader để đọc file
      let reader = new FileReader();
      console.log("reader", reader);

      // "read and return a URL"
      reader.readAsDataURL(firstFile);

      // dùng hàm onload để bắt lấy URL đó
      reader.onload = (e) => {
        console.log(e.target.result)
        setImgSrc(e.target.result);
      }
    }
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <h3 className='m-5'>Thêm phim mới</h3>
      <Form
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        className="ml-5 w-96"
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item label="Tên phim" rules={[
          {
            required: true,
            message: 'Please input TypeJob!',
          },
        ]}>
          <Input name='tenPhim' onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name='trailer' onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name='moTa' onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker name='ngayKhoiChieu' format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked" >
          <div className='switch'>
            <Switch onChange={handleChangeSwitch('dangChieu')} />
          </div>
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <div className='switch'>
            <Switch onChange={handleChangeSwitch('sapChieu')} />
          </div>
        </Form.Item>

        <Form.Item label="Hot" valuePropName="checked">
          <div className="switch">
            <Switch onChange={handleChangeSwitch('hot')} />
          </div>
        </Form.Item>

        <Form.Item label="Số sao">
          <InputNumber
            min={1}
            max={10}
            onChange={(value) => {
              console.log("value", value);
              formik.setFieldValue("danhGia", value)
              //return();
            }} />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} />
          <img className='w-24 h-24' src={imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label='Tác vụ'>
          <button className='bg-blue-500 text-white p-2' type='submit'>Thêm phim</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNew;