import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { movieService } from "../../services/movieService";
import "./PurchasePage.css";
import Success from "./Success/Success";
export default function PurchasePage() {
  let { id } = useParams();
  const [dataRow, setDataRow] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    movieService
      .getPurchaseTicker(id)
      .then((res) => {
        console.log(res);
        setDataRow(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  let handleSeat = (seat) => {
    let cloneSeats = [...selectedSeats];

    if (cloneSeats.some((x) => x.tenGhe === seat.tenGhe)) {
      cloneSeats = cloneSeats.filter((x) => x.tenGhe !== seat.tenGhe);
    } else {
      cloneSeats.push(seat);
    }

    setSelectedSeats(cloneSeats);
  };

  let handleSumMoney = () => {
    let sum = 0;

    selectedSeats.forEach((s) => {
      sum += s.giaVe;
    });
    return sum;
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="flex flex-wrap ">
      <div className="seat-list-container basis-2/3 mx-auto pt-10  ">
        <div className="grid-row ">
          {dataRow?.danhSachGhe?.map((item, index) => {
            let className = "ghe";
            if (item.loaiGhe === "Vip") {
              className = "vip";
            }
            if (item.daDat) {
              className = "daDat";
            }

            if (selectedSeats.some((x) => x.tenGhe === item.tenGhe)) {
              className = "gheDangChon";
            }

            return (
              <div
                className={className}
                key={index}
                onClick={() => !item.daDat && handleSeat(item)}
              >
                {item.daDat ? "X" : item.tenGhe}
              </div>
            );
          })}
        </div>
        <div className="flex mx-auto justify-center mt-10 seat-type">
          <div>
            <div className="daDat">X</div>
            <p>???? ?????t</p>
          </div>
          <div className="ml-8 mr-7">
            <div className="ghe "></div>
            <p>Th?????ng</p>
          </div>
          <div>
            <div className="vip"></div>
            <p>Vip</p>
          </div>
        </div>
      </div>
      <div className="basis-1/3 my-8" style={{ boxShadow: "0 0 5px grey" }}>
        <div className=" ticker-infor">
          <div className="text-4xl text-greenlightxh text-center py-7">
            {selectedSeats.length > 0 ? handleSumMoney((x) => x.giaVe) : 0} VND
          </div>
          <hr />
          <div className="flex justify-between py-4 px-5">
            <h2>C???m r???p:</h2>
            <p>{dataRow?.thongTinPhim?.tenCumRap}</p>
          </div>
          <hr />
          <div className="flex justify-between py-4 px-5">
            <h2>?????a ch???</h2>
            <p>{dataRow?.thongTinPhim?.diaChi}</p>
          </div>
          <hr />
          <div className="flex justify-between py-4 px-5">
            <h2>R???p</h2>
            <p>{dataRow?.thongTinPhim?.tenRap}</p>
          </div>
          <hr />
          <div className="flex  justify-between py-4 px-5">
            <h2>Ng??y gi??? chi???u:</h2>
            <p>
              {dataRow?.thongTinPhim?.ngayChieu} -{" "}
              <span className="text-redLight">
                {" "}
                {dataRow?.thongTinPhim?.gioChieu}
              </span>
            </p>
          </div>
          <hr />
          <div className="flex  justify-between py-4 px-5">
            <h2>T??n phim:</h2>
            <p>{dataRow?.thongTinPhim?.tenPhim}</p>
          </div>
          <hr />
          <div className="flex justify-between py-4 px-5">
            <h2>Ch???n</h2>
            <p>
              {selectedSeats.length > 0
                ? selectedSeats.map((x) => "Gh??? " + x.tenGhe).join(", ")
                : ""}
            </p>
          </div>

          <div
            onClick={showModal}
            className="bg-red-500 hover:bg-red-800 py-4 text-white font-medium text-2xl text-center "
          >
            ?????T V??
          </div>
          <Modal
            onCancel={handleCancel}
            visible={isModalVisible}
            onOk={handleOk}
            className="text-center order-modal "
          >
            <div>
              <Success />
            </div>
            <h2 className="text-slate-700 text-3xl font-bold">
              ?????t v?? th??nh c??ng
            </h2>
            <p>Ki???m tra trong l???ch s??? ?????t v??</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}
