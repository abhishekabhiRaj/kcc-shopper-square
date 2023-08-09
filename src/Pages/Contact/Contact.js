import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import "./Contact.css";
import GooglePayButton from "@google-pay/button-react"
import { getDatabase, ref, set } from "firebase/database";


const time = [
  {
    day: "Monday",
    time: "12-6 PM",
  },
  {
    day: "Tuesday",
    time: "12-6 PM",
  },
  {
    day: "Wednesday",
    time: "12-6 PM",
  },
  {
    day: "Thurusday",
    time: "12-6 PM",
  },
  {
    day: "Friday",
    time: "12-6 PM",
  },
  {
    day: "Saturday",
    time: "12-6 PM",
  },
  {
    day: "Sunday",
    time: "Closed",
  },
];

function Contact() {
  const [data,  setData] = useState({
    fname:'',
    lname: '',
    email: '',
    address: ''
  })
  function writeUserData(e) {
    e.preventDefault();
    const db = getDatabase();
    set(ref(db, 'userOrder/' + new Date()), {
      firstname: data.fname,
      lastname: data.lname,
      email : data.email,
      address: data.address,
      orderNo: "SPQOE859582",
      orderTitle: "Iphone 20"
  });
  window.alert("Order Placed Successfully")
  setData({
    fname:'',
    lname: '',
    email: '',
    address: ''
  })

}
  return (
    <>
      <Container>
        <Row>
          <Col md={8} className="d-grid">
            <h4>Billing Details</h4>
            <hr />
            <Form  style={{display:'unset'}}>
              <Form.Group controlId="firstname">
                <Form.Label>
                  First Name <span style={{ color: "red" }}>*</span>{" "}
                </Form.Label>
                <Form.Control type="text" value={data.fname}  onChange={(e)=>setData({...data, fname:e.target.value})} placeholder="First name" />
              </Form.Group>
              <Form.Group controlId="lastname">
                <Form.Label>
                  Last Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control type="text"  value={data.lname} onChange={(e)=>setData({...data,lname:e.target.value })} placeholder="Last name" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"  value={data.email} onChange={(e)=>setData({...data,email:e.target.value })} placeholder="name@example.com" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea"  value={data.address} onChange={(e)=>setData({...data, address:e.target.value})} rows={3} />
              </Form.Group>
            </Form>
          </Col>
          <Col md={4}>
            <h4>Our Store</h4>
            <hr />
            <p>
              121 King Street,
              <br />
              Melbourne VIC 3000,
              <br />
              Australia
            </p>

            <p id="p2">Hours of Operation</p>
            <Table striped bordered hover size="sm">
              {time.map((val, id) => {
                return (
                  <>
                    <thead key={id}>
                      <tr>
                        <td> {val.day} </td>
                        <td>{val.time}</td>
                      </tr>
                    </thead>
                  </>
                );
              })}
            </Table>
          </Col>
        </Row>
        <Button variant="warning" onClick={writeUserData} className="px-4 mb-3">Proceed To Buy With COD</Button>
        <br/>
        <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
/>
      </Container>
    </>
  );
}

export default Contact;
