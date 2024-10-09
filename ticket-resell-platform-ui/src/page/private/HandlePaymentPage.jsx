import React, { useEffect, useState } from "react";
import LoadEffect from "../../components/LoadEffect";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../config/API";
import HttpStatus from "../../config/HttpStatus";
import useAxios from "../../utils/useAxios";
import { MANAGE_BUYER_PAGE } from "../../config/Constant";

export default function HandlePaymentPage() {
  const location = useLocation();
  const api = useAxios();
  const [isSuccess, setIsSuccess] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the query parameters from the URL
    const queryParams = new URLSearchParams(location.search);

    // Get specific parameters
    const vnp_Amount = queryParams.get("vnp_Amount");
    const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");
    const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
    const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
    const vnp_PayDate = queryParams.get("vnp_PayDate");
    const vnp_TxnRef = queryParams.get("vnp_TxnRef");
    const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");

    // Log the values (for debugging)
    console.log("Amount:", vnp_Amount);
    console.log("Transaction Status:", vnp_TransactionStatus);
    console.log("Response Code:", vnp_ResponseCode);
    console.log("Order Info:", vnp_OrderInfo);
    console.log("Pay Date:", vnp_PayDate);
    console.log("Txn Ref:", vnp_TxnRef);

    // Fetch data with the parsed parameters
    const fetchData = async () => {
      try {
        const response = await api.post(
          API.Payment.PAGE_BACK_DEPOSITED_API,
          "",
          {
            params: {
              vnp_Amount: vnp_Amount,
              vnp_TransactionStatus: vnp_TransactionStatus,
              vnp_ResponseCode: vnp_ResponseCode,
              vnp_OrderInfo: vnp_OrderInfo,
              vnp_PayDate: vnp_PayDate,
              vnp_TxnRef: vnp_TxnRef,
              vnp_TransactionNo: vnp_TransactionNo,
            },
          }
        );

        if (response.data.httpStatus === HttpStatus.OK) {
          //   console.log(response.data);
          setIsSuccess(response.data);
        }

        // Navigate when isSuccess is set
        if (response.data) {
          navigate(MANAGE_BUYER_PAGE, {
            state: { paymentResponse: response.data },
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchData
    fetchData();
  }, [location.search, api]);

  return (
    <div>
      <LoadEffect />
    </div>
  );
}
