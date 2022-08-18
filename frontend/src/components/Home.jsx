import React from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
import "../components/Home.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { totalPrice, vatCal } from "../slices/productSlices";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setdata] = useState({
    name: "",
    vat: 0,
    quantity: 0,
    price_gross: 0,
    price_net: 0,
  });
  const dispatch = useDispatch();
  const [tdata, setTdata] = useState([]);
  const [price, setPrice] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleChange = (e) => {
    dispatch(totalPrice(data.price_net));
    dispatch(vatCal(data.vat));
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    console.log(data);
    axios
      .post("http://localhost:4444/api/post", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios.get("http://localhost:4444/api/get").then((res) => {
      setTdata(res.data);
    });
  }, [data, tdata]);

  return (
    <div>
      <h1>Welcome to my Products</h1>
      <Button type="primary" onClick={showModal} id="btn">
        Create Product
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="" method="post">
          <label htmlFor="name">
            Product Name
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label htmlFor="vat">
            Vat
            <input
              type="number"
              name="vat"
              value={data.vat}
              onChange={handleChange}
            />
          </label>
          <br />
          <label htmlFor="quantity">
            Quantity
            <input
              type="number"
              name="quantity"
              value={data.quantity}
              onChange={handleChange}
            />
          </label>
          <br />
          <label htmlFor="price_net">
            Price(net)
            <input
              type="number"
              name="price_net"
              value={data.price_net}
              onChange={handleChange}
            />
          </label>
          <br />
          <label htmlFor="price_gross">
            Price(Gross)
            <input
              type="number"
              name="price_gross"
              value={data.price_net / data.vat + data.price_net}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </label>
        </form>
      </Modal>
      <table style={{ width: "90%", margin: "auto" }}>
        <tr>
          <th>Product Name</th>
          <th>Vat</th>
          <th>Quantity</th>
          <th>Price(net)</th>
          <th>Price(gross)</th>
        </tr>

        {tdata.map((ele) => {
          return (
            <tr>
              <>
                <td>{ele.name}</td>
                <td>{ele.vat}</td>
                <td>{ele.quantity}</td>
                <td>{ele.price_net}</td>
                <td>{ele.price_net + ele.vat}</td>

                <td>
                  <button className="btn btn-info mx-2">Edit</button>
                  <button className="btn btn-danger">Remove</button>
                </td>
              </>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Home;
