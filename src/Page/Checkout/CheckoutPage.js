import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { OrderApi, getProductDetails } from "../../Service/ProductService";
import Navbar2 from "../Navbar/Navbar2";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const productId = useSelector((state) => state.cart.product);
  // console.log(productId,"productId")

  const userId = useSelector((state) => state.user.user._id);
  const stateDate = useSelector((state) => state);
  // console.log(userId, stateDate,"555");
  const steps = ["Product summary", "Address", "Payment"];
  const [productDetail, setProductDetail] = React.useState([]);
  // console.log(productDetail, "esdd");

  const formValidation = () => {
    const newErrors = {};
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!country) newErrors.country = "Country is required";
    if (!pincode || !/^\d{6}$/.test(pincode))
      newErrors.pincode = "Valid pincode is required";
    if (!phonenumber || !/^\d{10}$/.test(phonenumber))
      newErrors.phonenumber = "Valid phone number is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetailsFromApi = productId.map((details) => {
        // console.log(details,"orr");
        return getProductDetails(details.id).then((response) => {
          // console.log(response,"pp");
          return { ...response.data.product, quantity: details.quantity };
        });
      });
      const product = Promise.all(productDetailsFromApi).then((response) => {
        // console.log(response,"111");
        setProductDetail(response);
      });
    };
    fetchProductDetails();
  }, [productId]);

  const totalPrice = productDetail.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const shippingCharge = totalPrice > 1000 ? 0 : 100;

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    }
    if (activeStep === 1) {
      if (formValidation()) {
        if (activeStep === steps.length - 1) {
          alert(`Payment Method: ${paymentMethod}`);
          OrderApi({
            shippingInfo: {
              address: address,
              city: city,
              state: state,
              country: country,
              pinCode: pincode,
              phoneNo: phonenumber,
            },
            orderItems: productDetail.map((data) => {
              // console.log(data, "555");
              return {
                name: data.name,
                price: data.price,
                image: "https:www.google.com",
                quantity: data.quantity,
                product: data._id,
              };
            }),
            user: { _id: userId },
            paymentInfo: {
              id: paymentMethod,
              status: "pending",
            },
            itemsPrice: totalPrice,
            taxPrice: 0,
            shippingPrice: shippingCharge,
            totalPrice: totalPrice + shippingCharge,
          })
            .then((response) => {})
            .catch((error) => {});
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };
  const handlePhonenumberChange = (event) => {
    setPhonenumber(event.target.value);
  };
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    // toast.success("order placed successfully")
  };

  return (
    <Box>
      <Navbar2 />
      <Box marginTop={6} sx={{ width: "85%", padding: 3, paddingTop: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ marginTop: 4 }}>
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Product Summary
              </Typography>
              {productDetail.map((product, index) => (
                <Box key={index} borderBottom="1px solid lightgray">
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          {product.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {product.price} x {product.quantity}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          fontWeight="bold"
                        >
                          Rs {product.price * product.quantity}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {product.quantity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: Rs {product.price}
                    </Typography>
                  </CardContent>
                </Box>
              ))}
              <Box
                marginTop={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h6" color="black" fontWeight={500}>
                    Total Amount:
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" color="black" fontWeight={700}>
                    {totalPrice}
                  </Typography>
                </Box>
              </Box>
              <Box
                marginTop={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Shipping Charges
                  </Typography>
                </Box>
                <Box>
                  {totalPrice > 1000 ? (
                    <Typography variant="body2" color="textSecondary">
                      Shipping Free
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontWeight={700}
                    >
                      100
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box
                marginTop={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h6" color="black" fontWeight={500}>
                    Total Payable Amount:
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" color="black" fontWeight={700}>
                    {totalPrice + shippingCharge}
                  </Typography>
                </Box>
              </Box>

              {/* {totalPrice > 1000 ? (
              <Typography variant="body2" color="textSecondary">
                Shipping Free
              </Typography>
            ) : (
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Shipping charge:100
                </Typography>
              </Box>
            )} */}

              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <TextField
                label="Address"
                value={address}
                onChange={handleAddressChange}
                multiline
                fullWidth
                rows={2}
                variant="outlined"
                margin="normal"
                placeholder="Enter your shipping address"
                name="address"
              />
              <TextField
                lable="City"
                value={city}
                onChange={handleCityChange}
                rows={1}
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="city"
                name="city"
                error={!!error.city}
                helperText={error.city}
              />
              <TextField
                lable="State"
                value={state}
                onChange={handleStateChange}
                rows={1}
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="state"
                name="state"
                error={!!error.state}
                helperText={error.state}
              />
              <TextField
                lable="Country"
                value={country}
                onChange={handleCountryChange}
                rows={1}
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="country"
                name="country"
                error={!!error.country}
                helperText={error.country}
              />
              <TextField
                lable="Pincode"
                value={pincode}
                onChange={handlePincodeChange}
                rows={1}
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="pincode"
                name="pincode"
                error={!!error.pincode}
                helperText={error.pincode}
              />
              <TextField
                lable="State"
                value={phonenumber}
                onChange={handlePhonenumberChange}
                rows={1}
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="number"
                name="phonenumber"
                error={!!error.phonenumber}
                helperText={error.phonenumber}
              />
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button onClick={handleBack}>Back</Button>
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Select a payment method
                </FormLabel>
                <RadioGroup
                  aria-label="payment method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <FormControlLabel
                    value="cash_on_delivery"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                  <FormControlLabel
                    value="upi"
                    control={<Radio />}
                    label="UPI Payment"
                  />
                  <FormControlLabel
                    value="credit_card"
                    control={<Radio />}
                    label="Credit Card"
                  />
                </RadioGroup>
              </FormControl>
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button onClick={handleBack}>Back</Button>
                <Button variant="contained" onClick={handleNext}>
                  Place Order
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
