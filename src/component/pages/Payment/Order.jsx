import { TextField } from "@mui/material";
import React from "react";
import { BASE_URL } from "../../../Utils/Constants";

const Order = () => {
    const [orderType, setOrderType] = React.useState("electric");
    const [name, setName] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [orderDescription, setOrderDescription] = React.useState("");
    const submitform = (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}Payment/CreatePaymentUrl`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                OrderType: orderType,
                Name: name,
                Amount: amount,
                OrderDescription: orderDescription,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = data.paymentUrl;
            });
    }

    return (

        <div class="table-responsive">
            <form onSubmit={submitform}>
                <div class="form-group">
                    <label for="ordertype">Loại hàng hóa </label>
                    <select name="OrderType" id="ordertype" class="form-control" onSelect={(e) => setOrderType(e.target.value)}>
                        <option value="electric">Đồ điện tử</option>
                        <option value="fashion">Thời trang</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <br />
                <div class="form-group">
                    <label for="Name">Tên khách hàng</label>
                    <input class="form-control"
                        id="Name"
                        name="Name"
                        type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                    <label for="Amount">Số tiền</label>
                    <input class="form-control"
                        id="Amount"
                        name="Amount"
                        type="text"
                        onChange={(e) => setAmount(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                    <label for="OrderDescription">Nội dung thanh toán</label>
                    <textarea class="form-control"
                        cols="20"
                        id="OrderDescription"
                        name="OrderDescription"
                        rows="2" onChange={(e) => setOrderDescription(e.target.value)} />
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Thanh toán (Checkout)</button>
            </form>
        </div>
    );
}
export default Order;