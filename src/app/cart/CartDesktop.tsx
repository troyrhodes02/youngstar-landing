"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Divider,
  Stack,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShoppingCart,
  FaLock,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";

export const CartDesktop = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isShippingOpen, setIsShippingOpen] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const groupedCartItems = React.useMemo(() => {
    const groupedItems: Record<string, any> = {};
    
    cart.forEach(item => {
      const itemName = item.name;
      
      if (!groupedItems[itemName]) {
        groupedItems[itemName] = {
          name: itemName,
          image: item.image,
          basePrice: item.price,
          variants: [],
          totalQuantity: 0,
          totalPrice: 0
        };
      }
      
      groupedItems[itemName].variants.push({
        id: item.id,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      });
      
      groupedItems[itemName].totalQuantity += item.quantity;
      groupedItems[itemName].totalPrice += item.price * item.quantity;
    });
    
    return Object.values(groupedItems);
  }, [cart]);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleProceedToSquareCheckout = async () => {
    if (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || 
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
      setApiError("Please fill in all required shipping address fields.");
      setIsShippingOpen(true);
      window.scrollTo(0, 0);
      return;
    }
    
    setApiLoading(true);
    setApiError(null);
    setCurrentStep(2);
    
    try {
      // Create line items from each variant
      const squareItems = [];
      for (const item of cart) {
        if (!item.variationId) {
          console.warn(`Item ${item.name} (${item.id}) has no variationId`);
          continue;
        }
        
        squareItems.push({
          catalogObjectId: item.variationId,
          quantity: item.quantity.toString()
        });
      }
      
      if (squareItems.length === 0) {
        throw new Error("No valid items to checkout");
      }
        
      // Map country codes to ISO format required by Square
      const mapCountryToISO = (country: string) => {
        const countryMap: Record<string, string> = {
          'USA': 'US',
          'CAN': 'CA',
          'GBR': 'GB', 
          'AUS': 'AU',
          'JPN': 'JP'
        };
        return countryMap[country] || country;
      };

      const customerDetails = {
        givenName: shippingAddress.firstName,
        familyName: shippingAddress.lastName,
        address: {
          addressLine1: shippingAddress.address,
          locality: shippingAddress.city,
          administrativeDistrictLevel1: shippingAddress.state,
          postalCode: shippingAddress.zipCode,
          country: mapCountryToISO(shippingAddress.country),
        },
      };

      console.log("Sending to /api/square-checkout:", { items: squareItems, customer: customerDetails });

      const { data } = await axios.post("/api/square-checkout", { 
        items: squareItems,
        customer: customerDetails
      });

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setApiError(data.error || "Failed to create Square checkout link.");
      }
    } catch (error: any) {
      console.error("Error calling /api/square-checkout:", error);
      setApiError(error.response?.data?.error || error.message || "An error occurred while preparing checkout.");
    } finally {
      setApiLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Stack 
        minHeight="calc(100vh - 100px)" 
        alignItems="center" 
        justifyContent="center" 
        sx={{ bgcolor: 'black', color: 'white', pt: '100px', px: 2 }}
      >
        <FaShoppingCart style={{ fontSize: 50, marginBottom: 24, color: 'red' }} />
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }}>
          Your Cart is Empty
        </Typography>
        <Typography variant="h6" color="grey.500" sx={{ mb: 3 }}>
          Add some items to get started
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          startIcon={<FaArrowLeft />}
          sx={{
            bgcolor: 'red',
            color: 'white',
            '&:hover': { bgcolor: '#c00' },
            px: 3,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Continue Shopping
        </Button>
      </Stack>
    );
  }

  const StepIndicator = ({ step, activeStep }: { step: number; activeStep: number }) => (
    <Box
      sx={{
        height: 48,
        width: 48,
        borderRadius: '50%',
        bgcolor: activeStep >= step ? 'red' : 'grey.700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        mb: 1
      }}
    >
      {step}
    </Box>
  );

  const Connector = () => (
     <Box sx={{ height: 80, width: 2, bgcolor: 'grey.700', mx: 'auto', my: 1 }} />
  );

  return (
    <Box sx={{ minHeight: 'calc(100vh - 130px)', bgcolor: 'black', color: 'white', pb: 5 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: 3, 
            borderBottom: '2px solid red', 
            display: 'inline-block', 
            pb: 1, 
            mb: 6,
            mx: 'auto'
          }}
        >
          Review Your Order
        </Typography>
        
        <Grid container spacing={5}>
          <Grid item xs={12} lg={8}>
            <Stack direction="row" spacing={3}>
              <Stack alignItems="center" sx={{ width: 'auto', flexShrink: 0 }}>
                <StepIndicator step={1} activeStep={currentStep} />
                <Connector />
                <StepIndicator step={2} activeStep={currentStep} />
              </Stack>
              
              <Stack spacing={4} sx={{ flexGrow: 1 }}>
                <Paper sx={{ bgcolor: '#1c1c1c', border: '1px solid #333', borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ p: 2.5, bgcolor: '#2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: 'white' }}>
                      Review Products
                    </Typography>
                  </Box>
                  
                  <Stack divider={<Divider sx={{ bgcolor: '#333' }} />}>
                    {groupedCartItems.map((item) => (
                      <Stack key={item.name} direction="row" alignItems="flex-start" spacing={3} sx={{ p: 2.5, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}>
                        {item.image && (
                          <Box sx={{ width: 112, height: 112, flexShrink: 0, bgcolor: '#2a2a2a', borderRadius: 1, overflow: 'hidden' }}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={112}
                              height={112}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Box>
                        )}
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>{item.name}</Typography>
                          <Typography variant="body1" sx={{ mt: 0.5, color: 'white' }}>${(item.basePrice / 100).toFixed(2)}</Typography>
                          
                          <Box sx={{ mt: 1.5 }}>
                            {item.variants.map((variant: any) => (
                              <Stack key={`${variant.id}-${variant.size}`} direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                                <Box sx={{ 
                                  bgcolor: '#333', 
                                  color: 'white', 
                                  px: 1, 
                                  py: 0.5, 
                                  borderRadius: 1, 
                                  fontSize: '0.8rem', 
                                  fontWeight: 'bold',
                                  minWidth: 40,
                                  textAlign: 'center'
                                }}>
                                  {variant.size}
                                </Box>
                                <Stack direction="row" alignItems="center" sx={{ border: '1px solid #444', borderRadius: 1 }}>
                                  <IconButton 
                                    onClick={() => updateQuantity(variant.id, Math.max(1, variant.quantity - 1))} 
                                    size="small" 
                                    sx={{ color: 'white', '&:hover': { bgcolor: '#444' }, borderRadius: '4px 0 0 4px', p: 1 }}
                                  >
                                    <FaMinus size={10} />
                                  </IconButton>
                                  <Typography sx={{ width: 30, textAlign: 'center', fontSize: '0.8rem', color: 'white' }}>
                                    {variant.quantity}
                                  </Typography>
                                  <IconButton 
                                    onClick={() => updateQuantity(variant.id, variant.quantity + 1)} 
                                    size="small" 
                                    sx={{ color: 'white', '&:hover': { bgcolor: '#444' }, borderRadius: '0 4px 4px 0', p: 1 }}
                                  >
                                    <FaPlus size={10} />
                                  </IconButton>
                                </Stack>
                                <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                                  ${(variant.price * variant.quantity / 100).toFixed(2)}
                                </Typography>
                                <IconButton 
                                  onClick={() => removeFromCart(variant.id)} 
                                  size="small" 
                                  sx={{ color: 'red', p: 0.5 }}
                                >
                                  <FaTrash size={12} />
                                </IconButton>
                              </Stack>
                            ))}
                          </Box>
                        </Box>
                        
                        <Box sx={{ textAlign: 'right', minWidth: 100 }}>
                          <Typography variant="body2" color="grey.400" sx={{ mb: 0.5 }}>
                            Total Qty: {item.totalQuantity}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                            ${(item.totalPrice / 100).toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
                
                <Paper sx={{ bgcolor: '#1c1c1c', border: '1px solid #333', borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ p: 2.5, bgcolor: '#2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setIsShippingOpen(!isShippingOpen)}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: 'white' }}>
                      Shipping Address
                    </Typography>
                    {isShippingOpen ? <FaChevronUp color="white" /> : <FaChevronDown color="white" />}
                  </Box>
                  
                  {isShippingOpen && (
                    <Box sx={{ p: 3 }}>
                      {apiError && (
                        <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>
                      )}
                      <Grid container spacing={3} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>First Name*</Typography>
                          <TextField
                            name="firstName"
                            value={shippingAddress.firstName}
                            onChange={handleAddressChange}
                            fullWidth
                            variant="filled"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ sx: { color: 'white' } }}
                            sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>Last Name*</Typography>
                          <TextField
                            name="lastName"
                            value={shippingAddress.lastName}
                            onChange={handleAddressChange}
                            fullWidth
                            variant="filled"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ sx: { color: 'white' } }}
                            sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>Street Address*</Typography>
                      <TextField
                        name="address"
                        value={shippingAddress.address}
                        onChange={handleAddressChange}
                        fullWidth
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ sx: { color: 'white' } }}
                        sx={{ bgcolor: '#2a2a2a', borderRadius: 1, mb: 3, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }}
                      />
                      
                      <Grid container spacing={3} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>City*</Typography>
                          <TextField
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleAddressChange}
                            fullWidth
                            variant="filled"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ sx: { color: 'white' } }}
                            sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>State/Province*</Typography>
                          <TextField
                            name="state"
                            value={shippingAddress.state}
                            onChange={handleAddressChange}
                            fullWidth
                            variant="filled"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ sx: { color: 'white' } }}
                            sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>ZIP/Postal Code*</Typography>
                          <TextField
                            name="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={handleAddressChange}
                            fullWidth
                            variant="filled"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ sx: { color: 'white' } }}
                            sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>Country*</Typography>
                      <FormControl fullWidth variant="filled" sx={{ bgcolor: '#2a2a2a', borderRadius: 1, mb: 3, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }}>
                         <Select
                           labelId="country-label"
                           id="country"
                           name="country"
                           value={shippingAddress.country}
                           onChange={handleAddressChange as any}
                           sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
                         >
                           <MenuItem value="USA">United States</MenuItem>
                           <MenuItem value="CAN">Canada</MenuItem>
                           <MenuItem value="GBR">United Kingdom</MenuItem>
                           <MenuItem value="AUS">Australia</MenuItem>
                           <MenuItem value="JPN">Japan</MenuItem>
                         </Select>
                      </FormControl>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button 
                          onClick={handleProceedToSquareCheckout}
                          variant="contained"
                          disabled={apiLoading}
                          startIcon={apiLoading ? <CircularProgress size={20} color="inherit" /> : null}
                          sx={{ 
                            bgcolor: 'red', 
                            '&:hover': { bgcolor: '#c00' },
                            px: 4, 
                            py: 1.5, 
                            fontWeight: 'bold', 
                            textTransform: 'uppercase', 
                            letterSpacing: 1,
                            '&.Mui-disabled': {
                                bgcolor: 'grey.700',
                                color: 'grey.500'
                            }
                          }}
                        >
                          {apiLoading ? 'Processing...' : 'Proceed to Checkout'}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Stack>
            </Stack>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Paper sx={{ bgcolor: '#1c1c1c', border: '1px solid #333', borderRadius: 2, overflow: 'hidden', position: 'sticky', top: 154 }}>
              <Box sx={{ p: 2.5, bgcolor: 'red' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: 'white' }}>
                  Order Summary
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Stack sx={{ maxHeight: 380, overflowY: 'auto', mb: 2, pr: 1 }} 
                  divider={<Divider sx={{ bgcolor: '#333', my: 1.5 }} />}
                >
                  {groupedCartItems.map((item) => (
                    <Stack key={item.name} direction="row" spacing={2} sx={{ py: 1.5 }}>
                      {item.image && (
                        <Box sx={{ width: 64, height: 64, flexShrink: 0, bgcolor: '#2a2a2a', borderRadius: 1, overflow: 'hidden' }}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                      )}
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'white' }}>
                          {item.name}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {item.variants.map((variant: any) => (
                            <Typography key={`${variant.id}-${variant.size}`} variant="caption" sx={{ 
                              color: 'white', 
                              bgcolor: 'rgba(255,255,255,0.1)', 
                              px: 0.7, 
                              py: 0.2, 
                              borderRadius: 0.5 
                            }}>
                              {variant.size}: {variant.quantity}
                            </Typography>
                          ))}
                        </Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="grey.300">Total Qty: {item.totalQuantity}</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>${(item.totalPrice / 100).toFixed(2)}</Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
                
                {shippingAddress.firstName && shippingAddress.address && (
                  <Paper sx={{ mb: 2.5, p: 2, bgcolor: '#2a2a2a', borderRadius: 1 }}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <FaMapMarkerAlt style={{ color: 'red', marginTop: 4, flexShrink: 0 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                        <Typography variant="caption" color="grey.300" display="block">{shippingAddress.address}</Typography>
                        <Typography variant="caption" color="grey.300" display="block">
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                )}
                
                <Stack spacing={1.5} sx={{ py: 2, borderTop: '1px solid #333' }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="grey.200">Subtotal</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'white' }}>${(totalPrice / 100).toFixed(2)}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="grey.200">Shipping</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'white' }}>Calculated at payment</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="grey.200">Tax</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'white' }}>Calculated at payment</Typography>
                  </Stack>
                </Stack>
                
                <Stack direction="row" justifyContent="space-between" sx={{ pt: 2, borderTop: '1px solid #333', mt: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'white' }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'red' }}>${(totalPrice / 100).toFixed(2)}</Typography>
                </Stack>
                
                <Typography variant="caption" color="grey.400" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2.5 }}>
                  <FaLock style={{ marginRight: 4, fontSize: '0.8rem' }} />
                  Secure payment via Square Checkout
                </Typography>
                
                <Button 
                  onClick={handleProceedToSquareCheckout}
                  variant="contained"
                  fullWidth
                  disabled={apiLoading}
                  startIcon={apiLoading ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{ 
                    mt: 2.5, 
                    bgcolor: 'red', 
                    '&:hover': { bgcolor: '#c00' },
                    py: 1.5, 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase', 
                    letterSpacing: 1,
                    '&.Mui-disabled': {
                        bgcolor: 'grey.700',
                        color: 'grey.500'
                    }
                  }}
                >
                  {apiLoading ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 