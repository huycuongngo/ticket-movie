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
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import moment from 'moment'
import './EditFilm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimAction, layThongTinPhimAction, themPhimAction } from '../../../../redux/actions/QuanLyPhimAction';
import { useHistory } from 'react-router-dom';
import { GROUPID } from '../../../../utils/settings/config';
import { useParams } from 'react-router-dom';

const EditFilm = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();


  // // cách 1 dùng useParams
  // const { id } = useParams()
  // console.log("id ma phim", id);

  // useEffect(() => {
  //   dispatch(layThongTinPhimAction(id));
  //   //return();
  // }, []);

  let { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
  console.log("🚀 ~ file: EditFilm.js ~ line 41 ~ EditFilm ~ thongTinPhim", thongTinPhim)

  // cách 2 dùng props truyền từ <Route />
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
    //return();
  }, [])




  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim?.maPhim,
      tenPhim: thongTinPhim?.tenPhim,
      trailer: thongTinPhim?.trailer,
      moTa: thongTinPhim?.moTa,
      ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
      dangChieu: thongTinPhim?.dangChieu,
      sapChieu: thongTinPhim?.sapChieu,
      hot: thongTinPhim?.hot,
      danhGia: thongTinPhim?.danhGia,
      hinhAnh: null,
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
          if(values.hinhAnh !== null)
            formData.append(key, values.hinhAnh, values.hinhAnh.name);
        }
      }

      // Goi API cap nhat phim
      dispatch(capNhatPhimAction(formData));
      history.push("/admin/films");
    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    //return();
  }

  const handleChangeSwitch = (name) => {

    return (value) => {
      formik.setFieldValue(name, value);
      //return();
    }
  }

  const handleChangeFile = async (e) => {
    // lấy file đầu tiên ra từ e
    let firstFile = e.target.files[0];
    console.log("firstFile", firstFile);

    if (firstFile.type === "image/png" || firstFile.type === "image/jpeg" || firstFile.type === "image/jpg" || firstFile.type === "image/gif" || firstFile.type === "image/psd") {
      await formik.setFieldValue("hinhAnh", firstFile);

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
      <h3 className='m-5'>Cập nhật phim</h3>
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
        <Form.Item label="Tên phim">
          <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker name='ngayKhoiChieu' format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked" >
          <div className='switch'>
            <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
          </div>
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <div className='switch'>
            <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
          </div>
        </Form.Item>

        <Form.Item label="Hot" valuePropName="checked">
          <div className="switch">
            <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
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
            }}
            value={formik.values.danhGia}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} />
          <img className='w-24 h-24' src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label='Tác vụ'>
          <button className='bg-blue-500 text-white p-2' type='submit'>Cập nhật phim</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditFilm;